var app = angular.module("TheMuseSearch", []);

app.controller("SearchController", function($scope, $document) {
    "use strict";
    
    $scope.request = {
        url: "",
        page: 0,
        q: "",
        categories: ["jobs", "companies", "posts", "resources"]
    };
    $scope.response = {};
    
    $scope.input = "";
    $scope.results = [];
    
    $scope.submit = function() {
        
    }
    
});