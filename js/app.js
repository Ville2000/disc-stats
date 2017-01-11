(function () {
    var app = angular.module('myApp', ['ionic', 'ngResource', 'ui.router']);

    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "components/home/home.html",
                controller: "homeCtrl"
            })

        .state('courses', {
            url: "/courses",
            templateUrl: "components/courses/courses.html",
            controller: "coursesCtrl"
        })

        .state('newGame', {
            url: "/newGame",
            templateUrl: "components/newGame/newGame.html",
            controller: "newGameCtrl"
        })

        .state('playerList', {
            url: "/playerList",
            templateUrl: "components/playerList/playerList.html",
            controller: "playerListCtrl"
        })

        .state('newPlayer', {
            url: "/newPlayer",
            templateUrl: "components/newPlayer/newPlayer.html",
            controller: "newPlayerCtrl"
        })

        .state('newCourse', {
            url: "/newCourse",
            templateUrl: "components/newCourse/newCourse.html",
            controller: "newCourseCtrl"
        })

        .state('setHoles', {
            url: "/setHoles",
            templateUrl: "components/newCourse/setHoles.html",
            controller: "newCourseCtrl"
        })
        
        .state('selectCourse', {
            url: "/selectCourse",
            templateUrl: "components/selectCourse/selectCourse.html",
            controller: "selectCourseCtrl"
        })
        
        .state('selectPlayers', {
            url: "/selectPlayers",
            templateUrl: "components/selectPlayers/selectPlayers.html",
            controller: "selectPlayersCtrl"
        })
        
        .state('playerInfo', {
            url: "/playerInfo",
            templateUrl: "components/playerInfo/playerInfo.html",
            controller: "playerInfoCtrl"
        })

        .state('currentGame', {
            url: "/currentGame",
            templateUrl: "components/currentGame/currentGame.html",
            controller: "currentGameCtrl"
        });
        $urlRouterProvider.otherwise('/home');
    });
}());