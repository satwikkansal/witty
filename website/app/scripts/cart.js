/*1. User Clicks on Add to cart btn
2. Product gets pushed into db.
3. Cart count updated.
4. User views the cart....A state for cart view and checkout.
*/
'use strict'
var cart = angular.module('Cart', []);

cart.factory('cartProducts', ['$firebaseObject', function($firebaseObject){
	var cartRef = new Firebase("https://bargainhawk.firebaseio.com/Carts/");
	return {
		all:$firebaseObject(cartRef),
		getProductRef:function(pid){
			return cartRef.child(pid);
		},
		ref:cartRef,
		totalItems:function(){
			var cartCountRef = new Firebase("https://bargainhawk.firebaseio.com/userData/counts/cartCount");
			return $firebaseObject(cartCountRef);
		},
		getTotalCost:function(){
            	var ref = new Firebase("https://bargainhawk.firebaseio.com/userData/cost");
            	return $firebaseObject(ref);
            },
        updateCost: function(diff){
        	var ref = new Firebase("https://bargainhawk.firebaseio.com/userData/cost");
        	ref.transaction(function (current_value) {
                     return ((current_value || 0)+parseInt(diff));
                 });  
        },
        updateCount: function(diff){
            var ref = new Firebase("https://bargainhawk.firebaseio.com/userData/counts/cartCount");
            ref.transaction(function(current_value){
                return (current_value||0)+parseInt(diff);
            })
        }
       
	};
}])

cart.controller('CartCtrl', ['$scope', 'cartProducts', function ($scope,cartProducts) {
	$scope.cartProducts = cartProducts.all;

     $scope.badges = {        
        'earlyBird':1,
        'Mr. Bill Gates':1
    };
	$scope.addItem = function (id, name, price, quantity,imageUrl) {
        quantity = 1;
        console.log("ID:"+cartProducts.totalItems());
       
        var cartItemRef = new Firebase("https://bargainhawk.firebaseio.com/Carts/"+id);
        var productInCartRef = new Firebase("https://bargainhawk.firebaseio.com/sellerProducts/singleSeller/"+id+"/inCart");
        cartItemRef.set({
            'id':id,
            'name':name,
            'price':price,
            'image':imageUrl,
            'quantity':quantity
        });
         productInCartRef.transaction(function (current_value) {
                            return (current_value || 0) + 1;
                      }); 
         
         cartProducts.updateCount(1);

        console.log("Item added to database");
        };
        $scope.totalItems = cartProducts.totalItems();
        $scope.removeItem = function(pid,price){
        	var ref =cartProducts.getProductRef(pid);
        	var productInCartRef = new Firebase("https://bargainhawk.firebaseio.com/sellerProducts/singleSeller/"+pid+"/inCart");
            var onComplete = function(error) {
                      if (error) {
                        console.log('Synchronization failed');
                    } else {
                        
                        productInCartRef.transaction(function (current_value) {
                            return 0;
                      });  
                        $scope.total.Value -=price;
                        cartProducts.updateCount(-1);
                        console.log('Synchronization succeeded'); 
                    }
                };
                ref.remove(onComplete);
                console.log('deleted');
            };
            $scope.totalCost = 0;
            $scope.total = {
                Value:0
            }                
          
            $scope.updateQty = function(pid,price,diff){
                var ref = cartProducts.getProductRef(pid);
                var qtyRef = ref.child('quantity');
                qtyRef.transaction(function(current_value){
                    return (current_value || 0) + diff;
                } );
               $scope.total.Value +=price;
            }
       }
])

