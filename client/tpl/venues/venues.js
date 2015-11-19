/* Get the venues list:
 * {param} string - what exactly to return
**/
function getVenues(param){
	if(subsQueriesCol.ready()){
		var queryId = Session.get('queryId'),
			qFind = queryId ? {_id: queryId} : {},
			venues = QueriesCol.findOne(qFind, {
				'places': 1,
				'query': 1,
				'region': 1
			});

		if(!venues){
			return;
		}

		// Memorize the _id of the chosen doc in the session
		if(!Session.get('queryId') && venues._id){
			Session.set('queryId', venues._id);
		}

		switch(param){
			case 'hdText':
				return venues.places.length + ' venues for "' + venues.query + '"';

			case 'places':
				return venues.places;

			case 'region':
				return venues.region;
		}
	}
}

Template.Venues.helpers({
	btnText: function(){
		return Functions.getTplInterface('btnText');
	},
	colNames: function(){
		return Functions.getTplInterface('venuesColNames');
	},
	hdText: function(){
		return getVenues('hdText');
	},
	isTextRight: function(i){
		return i > 2;
	},
	noSuchVenues: function(){
		return Session.equals('noSuchVenues', true);
	},
	region: function(){
		return Functions.getTplInterface('region');
	},
	userQuery: function(){
		return Session.get('userQuery');
	},
	venues: function(){
		return getVenues('places');
	}
});