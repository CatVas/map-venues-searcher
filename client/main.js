/*--- Session reset ---*/
if( Session.get('noSuchVenues') ){
	Session.set('noSuchVenues', undefined);
}
if( Session.get('activeMarkerLatLng') ){
	Session.set('activeMarkerLatLng', undefined);
}

/*--- Subscriptions ---*/
subsQueriesCol = Meteor.subscribe('queriesCol');
subsTplInterface = Meteor.subscribe('tplInterface');

/*--- Accounts config ---*/
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});