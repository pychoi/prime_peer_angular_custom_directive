var myApp = angular.module("myApp", []);
myApp.controller('WelcomeController', ['$scope', '$http', '$filter', function($scope, $http, $filter){
    $scope.peopleArray = [];
    var orderBy = $filter('orderBy');

    $scope.getPeople = function(){
        $http.get('/data').then(function(response){
            $scope.peopleArray = response.data;
        });
    };

    $scope.getPeople();

    $scope.order = function(predicate, reverse){
        $scope.peopleArray = orderBy($scope.peopleArray, predicate, reverse);
    };

}]);