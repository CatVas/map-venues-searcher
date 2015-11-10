Template.Footer.helpers({
	footerText: function(){
		return TplInterface.findOne({}, {
			fields: {
				footerText: 1
			}
		}).footerText;
	}
});