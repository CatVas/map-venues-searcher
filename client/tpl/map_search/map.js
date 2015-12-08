/*
MapInit = {
	placeName: 'Tokyo',
	lng: 139.7513889,
	lat: 35.685,
	zoom: 11
};
MapInit = {
	placeName: 'Selkirk',
	lng: -2.838524,
	lat: 55.550658,
	zoom: 12
};
*/
MapInit = null;

Template.Map.onRendered(function(){
	// Load the Google Maps API
	GoogleMaps.load();
});

Template.Map.helpers({
	gMapOptions: function(){
		if( GoogleMaps.loaded() && subsTplInterface.ready() ){
			MapInit = TplInterface.findOne().mapInit;

			return {
				center: new google.maps.LatLng(MapInit.lat, MapInit.lng),
				zoom: MapInit.zoom
			};
		}
	}
});

// Where to handle map events and reactive updates.
Template.Map.onCreated(function(){
	
	// Use the "ready" callback to interact with the map API once the map is ready.
	GoogleMaps.ready('gMap', function(map){

		/*--- Draw the markers ---*/
		//var markers = [];
		var markers = {};
		var computObj = Tracker.autorun(function(){
			var queryId = Session.get('queryId'); // reactive DS
			var userId = Meteor.userId(); // reactive DS
			var places = Functions.getVenues('places', queryId); // NOT a reactive DS?

			// Clear the previous markers
			for(var mark in markers){
				markers[mark].setMap(null);
				markers[mark] = null;
				delete markers[mark];
			}
			markers = {};
			/*
			markers.forEach(function(marker, i, arr){
				marker.setMap(null);
				marker = null;
			});
			markers.length = 0;
			*/

			//console.log('places:'); console.dir(places);
			/*console.log('userId: ' + userId);
			console.log('queryId: ' + queryId);
			console.log('markers (before):'); console.dir(markers);
			*/

			// Set new markers and memorize them into an array
			if(userId && queryId && places && places.length){
				places.forEach(function(item, i, arr){
					var marker = new google.maps.Marker({
						map: map.instance,
						position: new google.maps.LatLng(+item.latitude, +item.longtitude)
					});
					var markerKey = item.latitude + ',' + item.longtitude;

					//marker.setAnimation(google.maps.Animation.BOUNCE);
					//markers.push(marker);
					markers[markerKey] = marker;
				});
			}
			//console.log('markers (after):'); console.dir(markers);
		});
		/*--- /Draw the markers ---*/

		/*--- Activate a marker ---*/
		if( Meteor.userId() ){
			var activeMarker = null;

			Tracker.autorun(function(){
				var activeMarkerLatLng = Session.get('activeMarkerLatLng');

				// Stop the previous marker animation
				if(activeMarker){
					activeMarker.setAnimation(null);
				}

				// Animate the new marker
				if(activeMarkerLatLng){
					activeMarker = markers[activeMarkerLatLng];
				}
				if(activeMarker){
					activeMarker.setAnimation(google.maps.Animation.BOUNCE);
				}
			});
		}
		/*--- /Activate a marker ---*/
		
	});
});
