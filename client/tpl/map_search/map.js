MapInit = {
	placeName: 'Tokyo',
	lng: 139.7513889,
	lat: 35.685,
	zoom: 11
}

/*
MapInit = TplInterface.findOne({}, {
	fields: {
		mapInit: 1
	}
});
*/

Template.Map.helpers({
	gMapOptions: function(){
		if( GoogleMaps.loaded() ){
			return {
				center: new google.maps.LatLng(MapInit.lat, MapInit.lng),
				zoom: MapInit.zoom
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