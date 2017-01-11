(function () {
    "use strict";
    var app = angular.module('myApp');
    app.controller('playerInfoCtrl', Ctrl);

    function Ctrl($scope, $state, gameService) {
        $scope.currentPlayer = gameService.getCurrentPlayer();
        
        if ($scope.currentPlayer.previousGames.length == 0) {
            $scope.previousGames = false;
        } else {
            $scope.previousGames = true;
        }
        
        $scope.toPlayerList = function () {
            $state.go('playerList');
        };
    }
}());