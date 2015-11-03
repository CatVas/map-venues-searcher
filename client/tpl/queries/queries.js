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
		queries.forEach(function(item, i, arr){
			var d = item.date;
		});

		return queries;
	}
});