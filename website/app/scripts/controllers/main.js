'use strict';

angular.module('displayApp').controller('ProductCtrl', function($scope,ProductDisplay,$stateParams) {
	
	$scope.products = ProductDisplay;
	$scope.catVisiblity = $stateParams.catVisiblity;	
	$stateParams.tab = 'All';
	
	$scope.isSet = function(checkTab) {
		return $stateParams.tab === checkTab;
	};

	$scope.setTab = function(activeTab) {
		$stateParams.tab = activeTab;
	};
}
);

angular.module('displayApp').controller('ChatCtrl',function($scope,$firebaseArray,$stateParams){
	var chatRef = new Firebase('https://bargainhawk.firebaseio.com/chats/'+$stateParams.pid);
	$scope.messages = $firebaseArray(chatRef);

	$scope.addMessage = function(){
		$scope.messages.$add({
			'author':$stateParams.author,
			'message':$scope.msgText,
			'timestamp':Firebase.ServerValue.TIMESTAMP				  
		});
		console.log('message added successfuly!');
	};	

}
);
angular.module('displayApp').controller('CountCtrl', ["$scope","$firebaseObject",function($scope,$firebaseObject){
	var countRef = new Firebase("https://bargainhawk.firebaseio.com/userData/counts");
	$scope.counts = $firebaseObject(countRef);
}])
angular.module('displayApp').controller('ProductDescriptionCtrl',function($scope, $firebaseObject,ProductDisplay,$stateParams){
	var pid = $stateParams.pid;
	var ref = new Firebase('https://bargainhawk.firebaseio.com/productDisplay/'+pid);
	$scope.product =$firebaseObject(ref);

});

angular.module('displayApp').controller('DemandCtrl',function($firebaseObject,$scope){
	$scope.successTooltip =0;
	$scope.formTooltip = "Processing...";
	$scope.demand= function(name,category,brand,price,image,comment){
		var demandRef = new Firebase('https://bargainhawk.firebaseio.com/demands');
		var price = parseInt(price);
		image = image ||"http://vignette3.wikia.nocookie.net/canadians-vs-vampires/images/a/a4/Not_available_icon.jpg/revision/latest?cb=20130403054528";
		price = price ||0;
		brand = brand ||"";	
		comment = comment||"No Comments";
		var product = {
		"name": name,
		"category": category,
		"price": price,
		"brand": brand,
		"image": image,
		"comment":comment
	};
		var newProductRef = demandRef.push();
		product.id = newProductRef.key();
		newProductRef.set(product);
		console.log('product added to display');
		$scope.formTooltip = "We Raised Your Voice!"
		/*var sellerId = 'singleSeller';
		var sellerProductRef = new Firebase('https://bargainhawk.firebaseio.com/sellerProducts/singleSeller/'+product.id);
		sellerProductRef.set({
			'id':product.id,
			'name':product.name,
			'inCart':0,
			'numBids':0
		});
	*/	console.log('Created Demand');

	};});


angular.module('sellerApp').controller('ChatCtrl',function($scope,$firebaseArray,$stateParams){
	var chatRef = new Firebase('https://bargainhawk.firebaseio.com/chats/'+$stateParams.pid);
	$scope.messages = $firebaseArray(chatRef); 	

	$scope.addMessage = function(){
		$scope.messages.$add({
			'author':$stateParams.author,
			'message':$scope.msgText,
			'timestamp':Firebase.ServerValue.TIMESTAMP				  
		});
		console.log('message added successfuly!');
	};	

}
);



angular.module('sellerApp').controller('SellerProductsCtrl',function($firebaseObject,$scope,$firebaseArray){
	var sellerId = 'singleSeller';
	var firebaseRef = new Firebase('https://bargainhawk.firebaseio.com/sellerProducts/'+sellerId);
	$scope.products = $firebaseObject(firebaseRef);			
});
angular.module('sellerApp').controller('AddProductCtrl',function($firebaseObject,$scope,$stateParams){
	$scope.name = $stateParams.name ;
	$scope.image = $stateParams.image ;
	$scope.category = $stateParams.category;
	$scope.price = $stateParams.price ;
	$scope.addProduct= function(name,category,msp,image,description,seller){
		var displayRef = new Firebase('https://bargainhawk.firebaseio.com/productDisplay');
		var price = parseInt(msp);
		var product = {
		"name": name,
		"category": category,
		"price": price,
		"image": image,
		"description": description,
		"seller": seller
	};
		var newDisplayRef = displayRef.push();
		product.id = newDisplayRef.key();
		newDisplayRef.set(product);
		console.log('product added to display');
		var sellerId = 'singleSeller';
		var sellerProductRef = new Firebase('https://bargainhawk.firebaseio.com/sellerProducts/singleSeller/'+product.id);
		sellerProductRef.set({
			'id':product.id,
			'name':product.name,
			'inCart':0,
			'numBids':0
		});
		console.log('product added to your stock');

	};});

angular.module('sellerApp').controller('SellerBidsCtrl',function ($firebaseObject,SellerBidsData,$scope,$stateParams) {
	
	$scope.offerDisplay = 0;
	$scope.sellerProductBids = SellerBidsData;
	$scope.flag1 = $stateParams.flag1;
	$scope.flag2 = $stateParams.flag2;
	console.log($scope.flag1);
	$scope.selectedName = '';
	$scope.selectedProductID = '';
	$scope.selectedBidID = '';
	$scope.selectedAdditionals = '';	

	$scope.openOffer = function(name,bidID,pid){		
		
			$scope.selectedName = name;
			$scope.selectedBidID = bidID;
			$scope.selectedProductID = pid;			
		
			$scope.offerDisplay = 1;		
	};

	$scope.setStatus = function(bidID,status){
		var ref = new Firebase('https://bargainhawk.firebaseio.com/BargainCarts/'+bidID+'/status');
		ref.set(status);
	};
	$scope.addProduct = function(product){
		var cartRef = new Firebase('https://bargainhawk.firebaseio.com/Carts/'+product.id);
		var productInCartRef = new Firebase('https://bargainhawk.firebaseio.com/sellerProducts/singleSeller/'+product.id+'/inCart');
		
		cartRef.set({
			'id':product.id,
			'name':product.name,
			'price':product.bidValue,
			'image':product.image,
			'seller':product.seller,			
			'quantity':1
		});
		productInCartRef.transaction(function (currentValue) {
			return (currentValue || 0) + 1;
		});  
		var countRef = new Firebase("https://bargainhawk.firebaseio.com/userData/counts/cartCount");
            countRef.transaction(function(current_value){
                return (current_value||0)+1;
            })
		console.log('Item added to database');
	};
	$scope.offerUser = function(bidID,price,additionals){
		
		var bidRef = new Firebase('https://bargainhawk.firebaseio.com/BargainCarts/'+bidID);
		bidRef.child('finalprice').set(price);
		bidRef.child('additionals').set(additionals);
		bidRef.child('status').set(2);
		console.log('Updated the bid and offered the user successfuly');
		};
	


	$scope.chat = function(productid){
		$state.go('sellerChat',{pid:productid});
	};
});

angular.module('sellerApp').controller('SellerDemandsCtrl', ['$scope','$firebaseObject', function ($scope,$firebaseObject) {
	var demandRef = new Firebase('https://bargainhawk.firebaseio.com/demands');
	$scope.userDemands = $firebaseObject(demandRef);

}])