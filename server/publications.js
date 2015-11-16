Meteor.publish('queriesCol', function(){
	return QueriesCol.find();
});

Meteor.publish('tplInterface', function(){
	return TplInterface.find();
});