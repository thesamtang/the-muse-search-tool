var app = angular.module("TheMuseSearch", []);

app.controller("SearchController", function($scope, $document) {
    "use strict";
    
    $scope.input = "";
    $scope.request = {
        url: "https://www.themuse.com/api/v1/suggest?",
        data: "",
        page: 0,
        q: "",
        categories: ["jobs", "companies", "posts", "resources"]
    };
    
    $scope.response = {
        resultsReceived: false,
        resultsPresent: false,
        posts: [],
        jobs: [],
        companies: [],
        resources: []
    };
    
    
    $scope.submit = function() {
        $scope.request.q = $scope.input.trim().toLowerCase().replace(" ", "%20");
        if ($scope.request.q.length > 0) {
            _buildRequestUrl();

            $.ajax({
                url: $scope.request.url,
                data: $scope.request.data,
                type: "GET",
                dataType: "JSON",
                success: function(data) {
                    _processResponse(data);
                }
            });
        }
    };
    
    var _processResponse = function(data) {
        console.log(data);
        if (data.error) {
            
        } else {
            console.log("results received");
            if (data.results.length > 0) {
                _filterResults(data.results);
                console.log($scope.response.companies);
                console.log($scope.response.jobs);
                console.log($scope.response.posts);
                console.log($scope.response.resources);
                
            } else {
                
            }
        }
        
    };
    
    var _filterResults = function(results) {
        $scope.$apply(function() {
            $scope.response.resultsReceived = true;
            
            $scope.response.companies = results.filter(function(result) {
                return result.model_type === "companies";
            });
            $scope.response.posts = results.filter(function(result) {
                return result.model_type === "posts";
            });
            $scope.response.jobs = results.filter(function(result) {
                return result.model_type === "jobs";
            });
            $scope.response.resources = results.filter(function(result) {
                return result.model_type === "resources";
            });
        });
        
    };
    
    var _buildRequestUrl = function() {
        var categoryString = "";
        for (var i = 0; i < $scope.request.categories.length; i++) {
            categoryString = categoryString.concat("&category%5B%5D=").concat($scope.request.categories[i]);
        }
        $scope.request.data = "q=".concat($scope.request.q)
            .concat("&page=").concat($scope.request.page)
            .concat(categoryString);
        console.log($scope.request.url);
    };
    
});