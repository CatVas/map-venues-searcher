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
	},

	'click .venues-hd .btn': function(ev, tpl){
		var queryId = Session.get('queryId');
		var userId = Meteor.userId();
		var fileName = (new Date().toString()) + '-export.csv';
		//console.log('queryId: ' + queryId + '; userId: ' + userId + '; fileName: ' + fileName);

		Meteor.call('downloadVenuesCSV', queryId, userId, function(err, fileContent){
			if(fileContent){
				var blob = new Blob([fileContent], {type: 'text/plain;charset=utf-8'});
				saveAs(blob, fileName);
			}
		});
	}
});

Template.Venues.onRendered(function(){
	var tpl = this;

	/*--- Toggle the active table rows ---*/
	var queryId = null;

	if( Meteor.userId() ){
		tpl.autorun(function(){
			var trActive = tpl.$('.t-1 tr.active');

			if( queryId != Session.get('queryId') && trActive.length > 0){
				trActive.removeClass('active');
				queryId = Session.get('queryId');
			}
		});
	}
	/*--- /Toggle the active table rows ---*/

});