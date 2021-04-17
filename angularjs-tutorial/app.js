var app = angular.module("tutorialApp", []);

// $scope übertragt Daten vom Controller an den View bzw. auch andersrum
app.controller("tutorialController", function($scope, $timeout) {
    $scope.counter = 0;

    $scope.incrementCounter = function() {
        $timeout(function() {
            $scope.counter = $scope.counter + 1;
            console.log($scope);
        }, 1000);
        // check for scope changes
    };
});