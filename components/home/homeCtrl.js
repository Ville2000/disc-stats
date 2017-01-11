(function () {
    "use strict";
    
    angular.module('myApp')
        .controller('homeCtrl', Ctrl);

    function Ctrl($scope, $state, $resource) {
        $scope.toNewGame = function () {
            $state.go('newGame');
        };
        
        $scope.toCourses = function () {
            $state.go('courses');
        };
        
        $scope.toPlayerList = function () {
            $state.go('playerList');
        };
    }
}());