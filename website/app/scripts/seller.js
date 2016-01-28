'use strict';
var sellerApp = angular.module('sellerApp', ['firebase','ui.router','ngCart']);

sellerApp.value('DB_URL', 'https://bargainhawk.firebaseio.com/seller/');

sellerApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('sellerBids',
	{
		url:'/',
		templateUrl: '../views/seller/sellerBids.html',
		params:{
			flag1:0,
			flag2:2
		},
		controller: 'SellerBidsCtrl'
	})
	.state('addProduct',
	{
		url:'/addProduct',
		templateUrl:'../views/seller/addProduct.html',
		controller:'AddProductCtrl'	
	})
	.state('sellerMessages',{
		url:'/messages',
		templateUrl:'../views/seller/sellerMessages.html',
		controller: 'SellerProductsCtrl'
	})
	.state('sellerChat',{
		url:'/{pid}/chat',
		templateUrl:'../views/seller/sellerChatWindow.html',
		params : {
			author:'seller'
		},
		controller: 'ChatCtrl'
	})

	.state('sellerProducts',{
		url:'/viewProducts',
		templateUrl:'../views/seller/sellerProducts.html',
		controller: 'SellerProductsCtrl'
	})
	.state('sellerHistory',{
		url:'/history',
		templateUrl: '../views/seller/sellerBids.html',
		params:{
			flag1:-1,
			flag2:1
		},
		controller: 'SellerBidsCtrl'
	}
	)}
	])
