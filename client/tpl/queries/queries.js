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

var queries = [
	{
		query: 'Query 1',
		latitude: 12.345678,
		longtitude: 123.456789,
		radius: '5 km',
		date: new Date('2015-09-23')
	},
	{
		query: 'Query 2',
		latitude: 12.345678,
		longtitude: 123.456789,
		radius: '6 km',
		date: new Date('2015-09-24')
	},
	{
		query: 'Query 3',
		latitude: 12.345678,
		longtitude: 123.456789,
		radius: '7 km',
		date: new Date('2015-09-25')
	}
];

Template.Queries.helpers({
	query: function(){
		var res = [];

		queries.forEach(function(item, i, arr){
			res.push({
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