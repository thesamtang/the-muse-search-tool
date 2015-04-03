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
        results: [],
        posts: [],
        jobs: [],
        companies: [],
        resources: [],
        resultsReceived: false,
        resultsPresent: true
    };
    
    
    $scope.submit = function() {
        $scope.request.q = $scope.input.trim().toLowerCase().replace(" ", "%20");
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
    };
    
    var _processResponse = function(data) {
        console.log(data);
        if (data.error) {
            
        } else {
            console.log("results received");
            $scope.response.results = data.results;
            $scope.response.resultsReceived = true;
            if (data.results.length > 0) {
                _filterResults();
                console.log($scope.response.companies);
                console.log($scope.response.jobs);
                console.log($scope.response.posts);
                console.log($scope.response.resources);
                
            } else {
                
            }
        }
        
    };
    
    var _filterResults = function(obj) {
        $scope.response.companies = $scope.response.results.filter(function(result) {
            return result.model_type === "companies";
        });
        $scope.response.posts = $scope.response.results.filter(function(result) {
            return result.model_type === "posts";
        });
        $scope.response.jobs = $scope.response.results.filter(function(result) {
            return result.model_type === "jobs";
        });
        $scope.response.resources = $scope.response.results.filter(function(result) {
            return result.model_type === "resources";
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