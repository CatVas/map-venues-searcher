Template.Header.helpers({
	hd: function(){
		return TplInterface.findOne({}, {
			fields: {
				hd: 1
			}
		}).hd;
	}
});