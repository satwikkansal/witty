'use strict';

var box = angular.module('ngBox', ["firebase",'ui.router']);


box.factory('boxData', ['$firebaseArray', function($firebaseArray){
	var boxRef = new Firebase("https://bargainhawk.firebaseio.com/BargainCarts");
	return $firebaseArray(boxRef);
}])


box.controller('boxCountCtrl', ["$scope","$firebaseObject",function($scope,$firebaseObject){
	var countRef = new Firebase("https://bargainhawk.firebaseio.com/userData/counts");
	$scope.counts = $firebaseObject(countRef);
}])

box.controller('boxViewCtrl', ['$scope','$firebaseObject','boxData', function($scope,$firebaseObject,boxData) {
	$scope.bidData = boxData;
	$scope.offerDisplay = 0;
	$scope.addProduct = function(product){
		var cartRef = new Firebase("https://bargainhawk.firebaseio.com/Carts/"+product.id);
		var productInCartRef = new Firebase("https://bargainhawk.firebaseio.com/sellerProducts/singleSeller/"+product.id+"/inCart");
		cartRef.set({
			'id':product.id,
			'name':product.name,
			'price':product.finalprice,
			'image':product.image,
			'seller':product.seller,			
			'quantity':1
		});
		productInCartRef.transaction(function (current_value) {
			return (current_value || 0) + 1;
		}); 
		var countRef = new Firebase("https://bargainhawk.firebaseio.com/userData/counts/cartCount");
            countRef.transaction(function(current_value){
                return (current_value||0)+1;
            })
		console.log("Item added to database");
	};	
	$scope.showOffer = function(bidID){
		var bidRef = new Firebase("https://bargainhawk.firebaseio.com/BargainCarts/"+bidID);
		$scope.offerData = $firebaseObject(bidRef);
		$scope.offerDisplay = 1;
		
	}
	$scope.acceptOffer = function(bidID){
		var ref = new Firebase("https://bargainhawk.firebaseio.com/BargainCarts/"+bidID+"/status");
		ref.set(3);
		$scope.offerDisplay = 0;
	}
	$scope.denyOffer = function(bidID){
		var ref = new Firebase("https://bargainhawk.firebaseio.com/BargainCarts/"+bidID+"/status");
		ref.set(4);
		$scope.offerDisplay = 0;
	}
	$scope.predicate ="timestamp";
	$scope.reverse = true;

	$scope.order = function(predicate) {
		
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};

}])

box.controller('boxPushCtrl', ['$scope', '$firebaseObject',function ($scope,$firebaseObject) {
	var boxRef = new Firebase("https://bargainhawk.firebaseio.com/BargainCarts");
	
	
	
	$scope.addBid = function(product,setPrice){
		var bidObject = {
		"bidValue":parseInt(setPrice,10),
		"id":product.id,	
		"name":product.name,
		"image":product.image,
		"additionals":"",		
		"price":product.price,
		"seller":product.seller,
		"status":0,
		"timestamp":Firebase.ServerValue.TIMESTAMP
	}
		boxRef.push(bidObject);
		console.log("bid pushed successfuly");
		var sellerBidsRef = new Firebase("https://bargainhawk.firebaseio.com/sellerProducts/singleSeller/"+product.id+"/numBids");
		sellerBidsRef.transaction(function (current_value) {
			return (current_value || 0) + 1;  
		});
		var userBidsRef = new  Firebase("https://bargainhawk.firebaseio.com/userData/counts/boxCount");
		userBidsRef.transaction(function (current_value) {
			return (current_value || 0) + 1;  
		});  

	}	 
}])