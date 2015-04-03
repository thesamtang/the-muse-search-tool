var app = angular.module("TheMuseSearch", []);

app.controller("SearchController", function($scope) {
    "use strict";
    
    // Model declarations
    $scope.greeting = true;
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
        resultsPresent: true,
        posts: [],
        jobs: [],
        companies: [],
        resources: []
    };
    
    // Controller logic
    $scope.submit = function() {
        $scope.request.q = $scope.input.trim().toLowerCase().replace(" ", "%20");
        if ($scope.request.q.length > 0) {
            
            $scope.greeting = false;
            $scope.request.data = _buildRequestUrlData();

            $.ajax({
                url: $scope.request.url,
                data: $scope.request.data,
                type: "GET",
                dataType: "JSON",
                timeout: 2000,
                success: function(data) {
                    _processResponse(data);
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                }
            });
        }
    };
    
    var _processResponse = function(data) {
        if (data.error) {
            alert(data.code + ": " + data.error);
        } else {
            if (data.results.length > 0) {
                _filterResults(data.results);
            } else {
                _clearResults();
            }
        }
    };
    
    var _filterResults = function(results) {
        $scope.$apply(function() {
            $scope.response.resultsPresent = true;
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
    
    var _clearResults = function() {
        $scope.$apply(function() {
            $scope.response.resultsPresent = false;
            $scope.response.resultsReceived = false;
            
            $scope.response.companies = [];
            $scope.response.posts = [];
            $scope.response.jobs = [];
            $scope.response.resources = [];
        });
    };
    
    var _buildRequestUrlData = function() {
        var categoryString = "";
        
        for (var i = 0; i < $scope.request.categories.length; i++) {
            categoryString = categoryString.concat("&category%5B%5D=").concat($scope.request.categories[i]);
        }
        
        return "q=".concat($scope.request.q)
            .concat("&page=").concat($scope.request.page)
            .concat(categoryString);
    };
});