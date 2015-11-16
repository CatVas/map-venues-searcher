Template.SearchForm.events({
	'submit .f-1': function(ev, tpl){
		ev.preventDefault();

		var input = $(ev.target).find('[name="search"]'),
			userQuery = input.val() + '';

		// Clear the form field after the form sending
		input.val('');

		Foursquare.find({
				ll: MapInit.lat + ',' + MapInit.lng,
				query: userQuery
			}, function(err, res){
				if(err){
					throw 'Bad venues. Error: ' + err;
				}

				var venues = res.response.venues,
					insertDoc,
					isDocPresent = 0,
					queryId;
				//console.dir(venues);

				venues.forEach(function(item, i, arr){
					insertDoc = {
						query: userQuery,									// by user
						region: MapInit.placeName,							// by user from the map?
						name: item.name,									// Foursquare
						address: item.location.address,						// Foursquare
						latitude: item.location.lat,						// Foursquare
						longtitude: item.location.lng,						// Foursquare
						radius: (item.location.distance / 1000) + ' km',	// by user or from Foursquare?
						date: new Date(),									// counted
						userId: 123											// number userId
					};
					isDocPresent = QueriesCol.find({
						query: insertDoc.query,
						region: insertDoc.region,
						latitude: insertDoc.latitude,
						longtitude: insertDoc.longtitude,
						radius: {
							$gte: insertDoc.radius
						}
					}).count();
					//console.log(isDocPresent);

					// If the user asked the similar query
					if(isDocPresent){
						console.log('Already similar docs: ' + isDocPresent++);
						return false;
					}

					// Handling unique queries
					queryId = QueriesCol.insert(insertDoc, function(err, res){
						if(err){
							throw err;
						}

						console.log('The user query inserted. _id = ' + queryId);
					});
				});
		});

		return false;
	}
});

Template.SearchForm.helpers({
	searchPlaceholder: function(){
		return TplInterface.findOne({}, {
			fields: {
				searchPlaceholder: 1
			}
		}).searchPlaceholder;
	}
});