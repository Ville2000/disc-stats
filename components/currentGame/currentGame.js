(function () {
    "use strict";
    var app = angular.module('myApp');
    app.controller('currentGameCtrl', Ctrl);
    
    var currentCourseScores = [];

    function Ctrl($scope, $state, gameService) {
        $scope.currentPlayers = gameService.getCurrentPlayers();
        console.log("Current players: " + $scope.currentPlayers);
        $scope.currentCourse = gameService.getCurrentCourse();
        $scope.currentHole = 1;
        $scope.currentCourseScores = [];
        console.log($scope.currentCourse);
        $scope.gameEnd = false;
        $scope.gameGoing = true;
        
        if (currentCourseScores[0] == null) {
            for (var i = 0; i < $scope.currentPlayers.length; i++) {
                for (var j = 0; j < $scope.currentCourse.holeAmount; j++) {
                    if (currentCourseScores[i] == null) {
                        currentCourseScores[i] = [];
                        currentCourseScores[i].push(parseInt(i + j));
                    } else {
                        currentCourseScores[i].push(parseInt(i + j));
                    }
                }
                
                $scope.currentPlayers[i].currentCourseScores = currentCourseScores[i];
                $scope.currentPlayers[i].currentHoleScore = parseInt(3);
            }
        }
        
        $scope.scorePlusOne = function(player) {
            player.currentHoleScore += 1;
        };
        
        $scope.scoreMinusOne = function(player) {
            if (player.currentHoleScore> 0) {
                player.currentHoleScore -= 1;
            }
        };
        
        $scope.moveToNextHole = function() {
            for(var i = 0; i < $scope.currentPlayers.length; i++) {
                $scope.currentPlayers[i].currentCourseScores[$scope.currentHole - 1] =
                    $scope.currentPlayers[i].currentHoleScore;
                $scope.currentPlayers[i].currentHoleScore = parseInt(3);
            }
            
            $scope.currentHole += 1;
            
            if ($scope.currentHole == $scope.currentCourse.holeAmount) {
                $scope.gameGoing = false;
                $scope.gameEnd = true;
            }
        };
        
        $scope.endGame = function() {
            for(var i = 0; i < $scope.currentPlayers.length; i++) {
                $scope.currentPlayers[i].currentCourseScores[$scope.currentHole - 1] =
                    $scope.currentPlayers[i].currentHoleScore;
                $scope.currentPlayers[i].currentHoleScore = parseInt(3);
            }
            
            for(var i = 0; i < $scope.currentPlayers.length; i++) {
                gameService.saveCurrentGameStats($scope.currentPlayers[i], currentCourseScores[i]);
            }
            
            gameService.updateCourses($scope.currentCourse);
            
            currentCourseScores = [];
            $state.go('home');
        };

        $scope.toHome = function() {
            currentCourseScores = [];
            $state.go('home');
        };
    }
}());