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