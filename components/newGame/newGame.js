(function () {
    "use strict";
    var app = angular.module('myApp');
    app.controller('newGameCtrl', Ctrl);

    function Ctrl($scope, $state, gameService) {
        $scope.currentPlayers = gameService.getCurrentPlayers();
        $scope.currentCourse = gameService.getCurrentCourse();
        var allCourses = gameService.getCourses();
        var allPlayers = gameService.getPlayers();
        
        if ($scope.currentPlayers.length == 0) {
            $scope.currentPlayersSelected = false;
            $scope.noPlayersSelected = true;
        } else {
            $scope.currentPlayersSelected = true;
            $scope.noPlayersSelected = false;
        }
        
        if ($scope.currentCourse == null) {
            $scope.currentCourseSelected = false;
        } else {
            var courseSelected = false;
            for (var i = 0; i < allCourses.length; i++) {
                if ($scope.currentCourse.name == allCourses[i].name) {
                    courseSelected = true;
                }
            }
            
            if (courseSelected == false) {
                $scope.currentCourseSelected = false;
            } else {
                $scope.currentCourseSelected = true;
            }
        }
        
        $scope.toSelectPlayers = function () {
            $state.go('selectPlayers');
        };

        $scope.toHome = function () {
            $state.go('home');
        };
            
        $scope.toSelectCourse = function () {
            $state.go('selectCourse');
        };
        
        $scope.startGame = function () {
            $state.go('currentGame');
        };
        
        // if ($scope.currentCourse != null && $scope.currentPlayers.length > 0) {
        if ($scope.noPlayersSelected == false && $scope.currentCourseSelected == true) {
            $scope.allSelected = true;
        } else {
            $scope.allSelected = false;
        }
        
        $scope.removePlayer = function (player) {
            gameService.removePlayerFromCurrentGame(player);
            $scope.currentPlayers = gameService.getCurrentPlayers();
            
            if ($scope.currentPlayers.length == 0) {
                $scope.currentPlayersSelected = false;
                $scope.noPlayersSelected = true;
                $scope.allSelected = false;
            }
        };
        
        $scope.clearCurrentCourse = function () {
            gameService.clearCurrentCourse();
        };
    }
}());