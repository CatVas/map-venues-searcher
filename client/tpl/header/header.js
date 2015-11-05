var tplInterfaceCursor = TplInterface.find({});

Template.Header.helpers({
	hd: function(){
		//return 'Venues Searcher';
		return tplInterfaceCursor.fetch()[0]['hd'];
	}
});