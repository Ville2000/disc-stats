(function () {
    "use strict";
    var app = angular.module('myApp');
    app.controller('newPlayerCtrl', Ctrl);

    var newPlayer = {};
    newPlayer.name = "";
    newPlayer.playedGames = 0;
    newPlayer.previousGames = [];

    function Ctrl($scope, $state, gameService, $ionicPopup) {
        $scope.addPlayer = function (p) {
            if (p != undefined) {
                newPlayer.name = p;
                gameService.newPlayer(newPlayer);
                $state.go('playerList');
            } else {
                (function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'An error has occurred',
                        template: 'Give a name for the player.'
                    });
                }());
            }
        };
        
        $scope.toPlayerList = function () {
            $state.go('playerList');
        };
    }
}());