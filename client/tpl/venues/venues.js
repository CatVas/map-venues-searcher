Template.Venues.helpers({
	btnText: function(){
		return Functions.getTplInterface('btnText');
	},
	colNames: function(){
		return Functions.getTplInterface('venuesColNames');
	},
	hdText: function(){
		return Functions.getVenues('hdText', Session.get('queryId'));
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
		return Functions.getVenues('places', Session.get('queryId'));
	}
});

Template.Venues.events({
	'click .t-1 tr:not(:first-child) td': function(ev, tpl){
		//console.log('Lat = ' + this.latitude + '. Lng = ' + this.longtitude);
		$(ev.target).parents('tr:first').addClass('active').siblings('.active').removeClass('active');

		Session.set('activeMarkerLatLng', this.latitude + ',' + this.longtitude);
	}
});

Template.Venues.onRendered(function(){
	var tpl = this;

	/*--- Toggle the active table rows ---*/
	var queryId = null;

	if( Meteor.userId() ){
		Tracker.autorun(function(){
			var trActive = tpl.$('.t-1 tr.active');

			if( queryId != Session.get('queryId') && trActive.length){
				trActive.removeClass('active');
				queryId = Session.get('queryId');
				//console.log(trActive.length);
			}
		});
	}
	/*--- /Toggle the active table rows ---*/
	
});