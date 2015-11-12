var melbourne = {
		lng: 144.9631,
		lat: -37.8136
	},
	tokyo = {
		lng: 139.7513889,
		lat: 35.685
	};

var lng = tokyo.lng,
	lat = tokyo.lat,
	mapZoom = 11;

Template.Map.helpers({
	gMapOptions: function(){
		if( GoogleMaps.loaded() ){
			return {
				center: new google.maps.LatLng(lat, lng),
				zoom: mapZoom
			};
		}
	}
});

Template.Map.onRendered(function(){
	// Load the Google Maps API
	GoogleMaps.load();
});

// Where to handle map events and reactive updates.
Template.Map.onCreated(function(){
	// Use the "ready" callback to interact with the map API once the map is ready.
	GoogleMaps.ready('gMap', function(map){
		/*var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});*/
	});
});