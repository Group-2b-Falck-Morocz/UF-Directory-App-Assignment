angular.module('listings').controller('ListingsController', ['$scope', 'Listings', '$timeout',
  function($scope, Listings, $timeout) {
    $scope.listings = Listings;
    $scope.searchText = '';
    $scope.detailedInfo = undefined;
    $scope.showNewListingForm = false;
    $scope.newListing = {
          'code': '', 
            'name': '', 
            'coordinates': {
                'latitude': 0, 
                'longitude': 0
            }, 
            'address': ''
    };
    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      $scope.listings.unshift($scope.newListing);
      $scope.newListing = {
        'code': '', 
            'name': '', 
            'coordinates': {
                'latitude': 0, 
                'longitude': 0
            }, 
            'address': ''
      }
      $scope.showNewListingForm=false;
      $scope.colorRows();
    };

    $scope.colorRows = function(index) {
    	$timeout(function() {
			var row = document.getElementById('listingRow-' + index);
			var rowChildren = document.getElementById('listingRow-' + index).childNodes;
			var rowType = index % 2;
			if (rowType === 0) {
				row.setAttribute('style', 'background-color: #8ebebc');
			} else {
				row.setAttribute('style', 'background-color: #de9554');  			
    		}
    	}, 0);
    };

    $scope.getBuildingNumber = function(buildingCode) {
    	for (var index in $scope.listings) {
    		if ($scope.listings[index].code === buildingCode) {
    			return parseInt(index) + 1;
    		}
    	}
    };

    $scope.deleteListing = function(buildingCode) {
    	for (var index in $scope.listings) {
    		if ($scope.listings[index].code === buildingCode) {
    			$scope.listings.splice(index, 1);
    			return;
    		}
    	}
    };
    $scope.showDetails = function(buildingCode) {
    	for (var index in $scope.listings) {
			if ($scope.listings[index].code === buildingCode) {
				$scope.detailedInfo = $scope.listings[index];
				return;
			}
		}
    };
  }
]);