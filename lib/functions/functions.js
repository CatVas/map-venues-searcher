// Functions library
Functions = function(){
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		res = {
			firstCapLetter: function(str){
				return str[0].toUpperCase() + str.slice(1).toLowerCase();
			},

			getTplInterface: function(param){
				if(subsTplInterface.ready()){
					var tplInt = TplInterface.findOne({});

					switch(param){
						case 'btnText':
							return tplInt.exportBtnText;

						case 'footerText':
							return tplInt.footerText;

						case 'hd':
							return tplInt.hd;

						case 'region':
							return tplInt.mapInit.placeName;

						case 'searchPlaceholder':
							return tplInt.searchPlaceholder;

						case 'venuesColNames':
							return tplInt.venuesColNames;
					}
				}
			},

			getVenues: function(param, queryId){
			/* Get the venues list:
			 * {param} string - what exactly to return
			**/
				if(subsQueriesCol.ready()){
					var queryId = queryId || Session.get('queryId');
					var qFind = queryId ? {_id: queryId, userId: Meteor.userId()} : {userId: Meteor.userId()};
					var venues = QueriesCol.findOne(qFind, {
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

						default:
							return venues;
					}
				}
			},

			hhmm: function(date){
				var hh = date.getHours(),
					mm = date.getMinutes();

				if(hh < 10){
					hh = '0' + hh;
				}
				if(mm < 10){
					mm = '0' + mm;
				}

				return hh + ':' + mm;
			},

			mmdd: function(date){
				return res.monthToStr(date) + ' ' + date.getDate();
			},

			monthToStr: function(date){
				return months[date.getMonth()];
			}
		};

	return res;
}();