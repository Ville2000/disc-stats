(function() {
    "use strict";
    var app = angular.module('myApp');
    app.controller('playerListCtrl', Ctrl);

    function Ctrl($scope, $state, gameService) {
        $scope.playersArray = gameService.getPlayers();
        
        if ($scope.playersArray.length == 0) {
            $scope.noPlayers = true;
        } else {
            $scope.noPlayers = false;
        }
        
        $scope.toNewPlayer = function () {
            $state.go('newPlayer');
        };
        
        $scope.toHome = function () {
            $state.go('home');
        };
        
        $scope.test = function (player) {
            gameService.setCurrentPlayer(player);
            $state.go('playerInfo');
        };
        
        $scope.removePlayer = function (player) {
            gameService.removePlayer(player);
            $scope.playersArray = gameService.getPlayers();
            
            if ($scope.playersArray == 0) {
                $scope.noPlayers = true;
            }
        };
    }
}());
