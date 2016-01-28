'use strict';
var displayApp= angular.module('displayApp', ['ui.bootstrap','firebase','ui.router','Cart','ngBox']);

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
				controller:'ProductCtrl'
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
		templateUrl:'../views/user/cartTest.html',
		controller:'CartCtrl'
	})
	.state('boxDetails',{
		url:'/box',
		templateUrl:'../views/user/boxDetails.html',
		controller:'boxViewCtrl'
	})
	.state('userDemand',{
		url:'/demand',
		templateUrl:'../views/user/userDemand.html',
		controller:'DemandCtrl'
	});
}])

var sellerApp = angular.module('sellerApp', ['ui.bootstrap','firebase','ui.router']);

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
		params:{
			name:'',
			price:0,
			image:"",
			category:""
		},
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
	.state('sellerDemands',{
		url:'/userDemands',
		templateUrl:'../views/seller/sellerDemands.html',

		controller:'SellerDemandsCtrl'
	})
	.state('sellerHistory',{
		url:'/history',
		templateUrl: '../views/seller/sellerHistory.html',
		params:{
			flag1:-1,
			flag2:1
		},
		controller: 'SellerBidsCtrl'
	}
	)}
	])
