Meteor.methods({
	insertQuery: function(doc){
		check(doc, {
			query: String,
			region: String,
			date: Date,
			userId: String,
			places: [{
				name: String,
				address: Match.Any,
				latitude: String,
				longtitude: String,
				radius: String
			}]
		});

		var queryId = QueriesCol.insert(doc, function(err, res){
			if(err){
				throw err;
			}

			//console.log('Method: the query is inserted. _id = ' + queryId);
			//return queryId;
		});

		return queryId;
	},

	removeQuery: function(_id){
		check(_id, String);

		var res;

		QueriesCol.remove(_id, function(err, removed){
			if(err){
				console.log('Server: Bad query removing (_id: "' + _id + '")');
				throw err;
			}

			console.log('Server: Removed ' + removed + ' queries: _id: "' + _id + '"');
			res = removed;
		});

		return res;
	},

	downloadVenuesCSV: function(queryId, userId){
		if(!queryId){
			throw 'Cannot export collection into CSV without queryId';
		}
		if(!userId){
			throw 'Cannot export collection into CSV without userId';
		}

		check(queryId, String);
		check(userId, String);

		var collection = QueriesCol.findOne({
			'_id': queryId,
			'userId': userId
		}, {
			fields: {
				'_id': 0,
				'places': 1
			}
		});
		var heading = true;
		var delimiter = ';';

		return exportcsv.exportToCSV(collection.places, heading, delimiter);
	}
});