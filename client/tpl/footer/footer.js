//var footerText = 'Copyright &copy; 2015. All rights reserved.<br/>Made by Catvas';

Template.Footer.helpers({
	footerText: function(){
		var txt = 'Footer';

		TplInterface.find({}, {}, function(err, doc){
			if(err){
				throw 'Error! Bad footer text';
			}

			txt = doc.footerText;
		});

		//return TplInterface.find({}).fetch()[0]['footerText'];

		return txt;
	}
});