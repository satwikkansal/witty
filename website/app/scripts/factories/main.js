


angular.module('displayApp').factory("ProductDisplay", ["$firebaseArray","DB_URL",
	function ($firebaseArray,DB_URL) {
		var ref = new Firebase(DB_URL);
		return $firebaseArray(ref);	
	}])



angular.module('sellerApp').factory('SellerBidsData', ["$firebaseObject",'DB_URL',
	function ($firebaseObject,DB_URL) {
		var sellerID = "singleSeller";
		var ref = new Firebase("https://bargainhawk.firebaseio.com/BargainCarts");
		var obj  = $firebaseObject(ref);	
		console.log(obj);
		return obj;
	}])

angular.module('displayApp').factory('Messages',['$firebaseArray','DB_URL',
	function ($firebaseArray,DB_URL){
    var chatRef = new Firebase("https://bargainhawk.firebaseio.com/chat");
    return {
      forProduct: function(pid){
        return $firebaseArray(chatRef.child(pid));
      }
    };
  }]);