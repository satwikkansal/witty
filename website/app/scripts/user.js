'use strict';
var displayApp= angular.module('displayApp', ['firebase','ui.router','ngCart','ngBox']);

displayApp.value('DB_URL','https://bargainhawk.firebaseio.com/productDisplay');

displayApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home',
	{
		url:'/',
		params: {
			catVisiblity:1,
			tab:'All'
		},
		views:{
			grid:{
				templateUrl:'../views/user/product-grid.html',
				controller:'ProductCtrl as collection'
			},
			
			categoriesBar:{
					templateUrl:'../views/user/categories.html',
					controller:'ProductCtrl'
				}
			}
		})
	
	.state('description',{
		url:'/product/{pid}',
		templateUrl:'../views/user/description.html',
		resolve: {
			function($stateParams){
				return $stateParams.pid;
			}
		},
		controller: 'ProductDescriptionCtrl'

	})	
	.state('description.chat',{
		url:'/chat',
		templateUrl:'../views/user/chatWindow.html',
		params: {
			author:'user'
		},
		controller: 'ChatCtrl'
	})
	.state('cartDetails',{
		url:'/cart',
		templateUrl:'../views/user/cartDetails.html'
	})
	.state('boxDetails',{
		url:'/box',
		templateUrl:'../views/user/boxDetails.html',
		controller:'boxViewCtrl'
	});
}])

