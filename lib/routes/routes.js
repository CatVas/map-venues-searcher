Router.configure({
	layoutTemplate: 'layoutMain'
});

/*--- Welcome page ---*/
Router.route('/', function(){
	var userId = Meteor.userId();
	
	if(!userId){
		this.render('layoutWelcome');
		Session.set('queryId', undefined);
	}
	else{
		this.redirect('users', {
			userId: userId
		});
	}
}, {
	name: 'welcome'
});

/*--- When the user is registered ---*/
Router.route('/users/:userId', function(){
	if(Meteor.userId() === this.params.userId){
		this.render('layoutPage');
	}
	else{
		this.redirect('welcome');
	}
}, {
	name: 'users'
});

/*--- Error routes ---*/
Router.route('/users/', function(){
	if( Meteor.userId() ){
		this.redirect('users');
	}
	else{
		this.redirect('welcome');
	}
})