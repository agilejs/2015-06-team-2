(function() {
    'use strict';

    var app = angular.module('MovieDatabase');

    app.controller('AppController', function($scope) {
        $scope.title = 'The Movie Database';
    });

    app.controller('WelcomeController',
        function($scope, $location, movieList) {
    });

    app.controller('MoviesListController',
        function($scope, $location, movieList) {

        $scope.movies = movieList.data;
        for(var i=0;i<$scope.movies.length;i++){
            if(!$scope.movies[i].releaseYear){
                $scope.movies[i].releaseYear='undefined';
            }
        }
        $scope.add = function () {
            $location.path('/movies/new');
        };
        $scope.order=false;
        $scope.column='title';
        $scope.orderTitle = function(){
            $scope.column='title';
            if ($scope.order){
                $scope.order=false;
            }else{
                $scope.order=true;
            }
        };
        $scope.orderReleaseYear = function(){
            $scope.column='releaseYear';
            if ($scope.order){
                $scope.order=false;
            }else{
                $scope.order=true;
            }
        };
    });

    app.controller('MoviesAddController',
        function($scope, $http, $location) {
        $scope.movie = {};
        $scope.save = function (movie) {
            $http.post('/movies', movie)
            .success(function(res) {
                $location.path('/movies/' + res.id);
            });
        };
    });

    app.controller('MovieDetailController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.delete = function () {
            $http.delete('/movies/' + $scope.movie.id).success(function (res) {
                $location.path('/movies');
            });
        };
    });

    app.controller('MovieEditController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.save = function () {
            $http.put('/movies/' + $scope.movie.id, $scope.movie)
            .success(function (res) {
                $location.path('/movies/' + $scope.movie.id);
            });
        };
    });

    function ProblemController($scope, $location) {
        $scope.culprit = $location.search().culprit || 'unknown beast';
    }

    app.controller('NotFoundController', ProblemController);
    app.controller('ErrorController', ProblemController);
})();
