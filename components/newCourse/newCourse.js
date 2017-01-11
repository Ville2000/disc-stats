(function () {
    "use strict";

    var app = angular.module('myApp');
    app.controller('newCourseCtrl', Ctrl);

    var newCourse = {};
    newCourse.name = "";
    newCourse.holes = [];
    newCourse.holeAmount = 0;
    newCourse.par = 0;
    newCourse.rating = 0;
    newCourse.gamesPlayed = 0;

    function Ctrl($scope, $state, $ionicPopup, gameService) {
        $scope.currentPar = 3;
        $scope.currentHole = 1;
        $scope.currentHolePar;
        $scope.holeAmount = 3;

        $scope.addCourse = function (name) {
            newCourse.name = name;
            if (newCourse.name != undefined) {
                gameService.newCourse(newCourse);
                resetNewCourse();
                $state.go('courses');
            } else {
                (function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'An error has occurred',
                        template: 'Give a name for the course'
                    });
                }());
            }
        };

        $scope.setPars = function (name, holes) {
            if (holes > 0) {
                newCourse.name = name;
                newCourse.holeAmount = holes;
                $state.go('setHoles');
            } else {
                (function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'An error has occurred',
                        template: 'An error has occurred in the amount of holes.'
                    });
                }());
            }
        };

        $scope.setPar = function () {
            if ($scope.currentPar > 0) {
                newCourse.holes[$scope.currentHole] = $scope.currentPar;
                newCourse.par += parseInt($scope.currentPar);
                $scope.currentHole++;

                if ($scope.currentHole == parseInt(parseInt(newCourse.holeAmount) + parseInt(1))) {
                    newCourse.holes.shift();
                    $state.go('newCourse');
                }
            } else {
                (function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'An error has occurred',
                        template: 'An error in the par number.'
                    });
                }());
            }
            
            $scope.currentPar = 3;

        };

        $scope.backToCourses = function () {
            resetNewCourse();
            $state.go('courses');
        };
        
        $scope.toNewCourse = function () {
            $state.go('newCourse');
        };
        
        $scope.increasePar = function () {
            $scope.currentPar++;
        };
        
        $scope.decreasePar = function () {
            if ($scope.currentPar > 1) {
                $scope.currentPar--;
            }
        };
        
        $scope.increaseHoles = function () {
            $scope.holeAmount++;
        };
        
        $scope.decreaseHoles = function () {
            if ($scope.holeAmount > 1) {
                $scope.holeAmount--;
            }
        };
        
        function resetNewCourse() {
            console.log("Reseting");
            newCourse = {};
            newCourse.name = "";
            newCourse.holes = [];
            newCourse.holeAmount = 0;
            newCourse.par = 0;
            newCourse.rating = 0;
            newCourse.gamesPlayed = 0;
        }
    }
}());