Template.SearchForm.events({
	'submit .f-1': function(ev, tpl){
		ev.preventDefault();

		if( Session.get('noSuchVenues') ){
			Session.set('noSuchVenues', undefined);
		}

		var input = $(ev.target).find('[name="search"]'),
			userQuery = Functions.firstCapLetter(input.val() + '');

		// Clear the form field after the form sending
		input.val('');

		// Memorize the user query
		Session.set('userQuery', userQuery);

		Foursquare.find({
				ll: MapInit.lat + ',' + MapInit.lng,
				query: userQuery
			},
			function(err, res){
				if(err){
					throw 'Bad venues. Error: ' + err;
				}

				var venues = res.response.venues,
					insertDoc = {
						query: userQuery,			// by user
						region: MapInit.placeName,	// by user from the map?
						date: new Date(),			// counted
						userId: Meteor.userId(),	// number userId
						places: []
					};

				// If there're no such venues in this region: []
				if(!venues.length){
					console.log('There are no such venues in this region');
					Session.set('noSuchVenues', true);
					return false;
				}

				var isDocPresent = QueriesCol.find({
						userId: Meteor.userId(),
						query: insertDoc.query,
						region: insertDoc.region
					}).count(),
					queryId;

				// If the user asked the similar query
				if(isDocPresent){
					console.log('Already similar docs: ' + isDocPresent++);
					return false;
				}

				// Take the venues
				venues.forEach(function(item, i, arr){
					insertDoc.places.push({
						name: item.name || '',												// Foursquare
						address: item.location.address || '',								// Foursquare
						latitude: item.location.lat.toFixed(3) || '',						// Foursquare
						longtitude: item.location.lng.toFixed(3) || '',						// Foursquare
						radius: (item.location.distance / 1000).toFixed(2) + ' km' || ''	// by user or from Foursquare?
					});
				});

				// Handling unique queries
				Meteor.call('insertQuery', insertDoc, function(err, res){
					if(err){
						throw err;
					}

					if(!Session.get('queryId')){
						Session.set('queryId', res);
					}
					//console.log('Client: The query is inserted. _id = ' + res);
				});
			}
		);

		return false;
	}
});

Template.SearchForm.helpers({
	searchPlaceholder: function(){
		return Functions.getTplInterface('searchPlaceholder');
	}
});