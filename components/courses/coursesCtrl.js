(function () {
    "use strict";
    
    angular.module('myApp')
        .controller('coursesCtrl', Ctrl);
    
    function Ctrl($scope, $state, gameService) {
        $scope.toNewCourse = function () {
            $state.go('newCourse');
        };
        
        $scope.courseArray = gameService.getCourses();
        
        if ($scope.courseArray.length == 0) {
            $scope.noCourses = true;
        } else {
            $scope.noCourses = false;
        }
        
        $scope.toHome = function () {
            $state.go('home');
        };
        
        $scope.deleteLast = function () {
            gameService.deleteLast();
        };
        
        $scope.removeCourse = function (course) {
            gameService.removeCourse(course);
            $scope.courseArray = gameService.getCourses();
        };
        
        $scope.clearCourses = function () {
            gameService.clearCourses();
        };
    }
}());