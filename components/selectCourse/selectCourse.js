(function () {
    "use strict";
    var app = angular.module('myApp');
    app.controller('selectCourseCtrl', Ctrl);

    function Ctrl($scope, $state, gameService) {
        $scope.coursesArray = gameService.getCourses();
        
        if ($scope.coursesArray.length == 0) {
            $scope.noCourses = true;
        } else {
            $scope.noCourses = false;
        }
        
        $scope.toNewGame = function () {
            $state.go('newGame');
        };
        
        $scope.setCurrentCourse = function (course) {
            gameService.setCurrentCourse(course);
            $state.go('newGame');
        };
    }
}());
