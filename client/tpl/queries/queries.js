function monthToStr(date){
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	return months[date.getMonth()];
}
function mmdd(date){
	return monthToStr(date) + ' ' + date.getDate();
}
function hhmm(date){
	var hh = date.getHours(),
		mm = date.getMinutes();

	if(hh < 10){
		hh = '0' + hh;
	}
	if(mm < 10){
		mm = '0' + mm;
	}

	return hh + ':' + mm;
}

Template.Queries.events({
	'click .t-1-out': function(ev, tpl){
		//var _id = ev.target.getAttribute('data-query-id');
		var _id = this.queryId;

		QueriesCol.remove(_id, function(err, removed){
			if(err){
				console.log('Bad query removing (_id: "' + _id + '")');
			}

			console.log('Removed ' + removed + ' queries: _id: "' + _id + '"');
		});
	}
});

Template.Queries.helpers({
	query: function(){
		var res = [];

		QueriesCol.find().forEach(function(item, i, arr){
			res.push({
				queryId: item._id,
				query: item.query,
				latitude: item.latitude,
				longtitude: item.longtitude,
				radius: item.radius,
				mmdd: mmdd(item.date),
				hhmm: hhmm(item.date)
			});
		});

		return res;
	}
});