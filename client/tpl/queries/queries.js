Template.Queries.events({
	'click .t-1-out': function(ev, tpl){
		ev.stopPropagation();
		//var _id = ev.target.getAttribute('data-query-id');
		var _id = this.queryId,
			isActiveRow = Session.equals('queryId', _id),
			trPar = $(ev.target).parents('tr:first'),
			trNext = trPar.next(),
			trPrev = trPar.prev(),
			removingError;

		Meteor.call('removeQuery', _id, function(err, res){
			if(err){
				removingError = err;
				console.log('Client: Bad query removing (_id: "' + _id + '")');
			}

			console.log('Client: Removed ' + res + ' queries: _id: "' + _id + '"');
		});
		/*
		QueriesCol.remove(_id, function(err, removed){
			if(err){
				removingError = err;
				console.log('Bad query removing (_id: "' + _id + '")');
			}

			console.log('Removed ' + removed + ' queries: _id: "' + _id + '"');
		});
		*/

		// Hide the "no such venues in the region" message
		Session.set('noSuchVenues', undefined);

		// Choose another list of queries (next or previous) to show
		if(isActiveRow && !removingError){
			if(trNext.length){
				Session.set('queryId', trNext.find('.t-1-out').attr('data-query-id'));
			}
			else if(trPrev.length){
				Session.set('queryId', trPrev.find('.t-1-out').attr('data-query-id'));
			}
			else{
				Session.set('queryId', undefined);
			}
		}
	},

	'click .t-1 tr': function(ev, tpl){
		var _id = this.queryId;
		// Send this _id into the "venues" tpl. Call the venues from DB.
		Session.set('queryId', _id);

		// Hide the "no such venues" message
		if(Session.equals('noSuchVenues', true)){
			Session.set('noSuchVenues', false);
		}
	}
});

Template.Queries.helpers({
	query: function(){
		var res = [];

		QueriesCol.find({userId: Meteor.userId()}).forEach(function(item, i, arr){
			res.push({
				queryId: item._id,
				query: item.query,
				latitude: (+item.places[0].latitude).toFixed(3),
				longtitude: (+item.places[0].longtitude).toFixed(3),
				radius: item.places[0].radius,
				mmdd: Functions.mmdd(item.date),
				hhmm: Functions.hhmm(item.date)
			});
		});

		return res;
	},

	trActive: function(){
		return Session.equals('queryId', this.queryId);
	}
});