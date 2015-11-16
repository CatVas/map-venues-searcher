if(TplInterface.find().count() === 0){
	TplInterface.insert({
		footerText: 'Copyright &copy; 2015. All rights reserved<br/>Created by Catvas',
		hd: 'Venues Searcher',
		searchPlaceholder: 'Type a venue name here',
		exportBtnText: 'Export CSV',
		venuesColNames: ['Name', 'City', 'Street Address', 'Latitude', 'Longtitude'],
		mapInit: {
			placeName: 'Tokyo',
			lng: 139.7513889,
			lat: 35.685,
			zoom: 11
		}
	});
}