var venues = [
	{
		name: 'Venue 1',
		city: 'Tokyo',
		address: 'Street Address 1',
		latitude: 12.3456789,
		longtitude: 123.456789
	},
	{
		name: 'Venue 2',
		city: 'Tokyo',
		address: 'Street Address 2',
		latitude: 12.3456789,
		longtitude: 123.456789
	},
	{
		name: 'Venue 3',
		city: 'Tokyo',
		address: 'Street Address 3',
		latitude: 12.3456789,
		longtitude: 123.456789
	},
	{
		name: 'Venue 4',
		city: 'Tokyo',
		address: 'Street Address 4',
		latitude: 12.3456789,
		longtitude: 123.456789
	}
];

var fromInterface = TplInterface.findOne({}, {
		fields: {
			exportBtnText: 1,
			venuesColNames: 1
		}
	});

Template.Venues.helpers({
	btnText: function(){
		return fromInterface.exportBtnText;
	},
	hdText: function(){
		return venues.length + ' venues';
	},
	colNames: function(){
		return fromInterface.venuesColNames;
	},
	isTextRight: function(i){
		return i > 2;
	},
	venues: function(){
		return venues;
	}
});