var app = angular.module("tutorialApp", []);

// $scope übertragt Daten vom Controller an den View bzw. andersrum
app.controller("tutorialController", function($scope) {
    $scope.title = "Welt";
});