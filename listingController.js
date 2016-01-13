angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
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
    };
    $scope.deleteListing = function(index) {
      $scope.listings.splice(index, 1);
    };
    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);