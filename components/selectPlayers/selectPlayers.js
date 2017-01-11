(function() {
    "use strict";
    var app = angular.module('myApp');
    app.controller('selectPlayersCtrl', Ctrl);

    function Ctrl($scope, $state, gameService) {
        $scope.playersArray = gameService.getPlayers();
        
        $scope.toNewPlayer = function () {
            $state.go('newPlayer');
        };
        
        $scope.toNewGame = function () {
            $state.go('newGame');
        };
        
        $scope.playerSelected = function (player) {
            var playerSelected = false;
            var currentPlayers = gameService.getCurrentPlayers();
            
            for (var i = 0; i < currentPlayers.length; i++) {
                if (player.name == currentPlayers[i].name) {
                    playerSelected = true;
                }
            }
            
            return playerSelected;
        };
        
        $scope.addToCurrentPlayers = function(player) {
            gameService.addToCurrentPlayers(player);
        };
        
        $scope.removeFromCurrentPlayers = function(player) {
            gameService.removeFromCurrentPlayers(player);
        };
        
        $scope.clearCurrentPlayers = function() {
            gameService.clearCurrentPlayers();
        };
    }
}());
