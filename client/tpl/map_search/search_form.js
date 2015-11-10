Template.SearchForm.events({
	'submit .f-1': function(ev, tpl){
		ev.preventDefault();

		var input = $(ev.target).find('[name="search"]'),
			insertDoc = {
				query: input.val(),
				region: 'Tokyo',			// by user from the map?
				latitude: 12.345678,		// counted by Map
				longtitude: 123.456789,		// counted by Map
				radius: '5 km',				// by user from the map?
				date: new Date(),			// counted
				userId: 123					// number userId
			},
			isDocPresent = QueriesCol.find({
				query: insertDoc.query,
				region: insertDoc.region,
				latitude: insertDoc.latitude,
				longtitude: insertDoc.longtitude,
				radius: {
					$gte: insertDoc.radius
				}
			}).count();

		// Clear the form field after the form sending
		input.val('');

		// Whether the user asked the question with similar parameters
		if(isDocPresent){
			console.log('Already similar docs: ' + isDocPresent);
			return false;
		}

		var queryId = QueriesCol.insert(insertDoc, function(err, res){
			if(err){
				throw err;
			}

			console.log('The user query inserted. _id = ' + queryId);
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