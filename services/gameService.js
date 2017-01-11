angular.module('myApp').service('gameService', function () {
    
    return {
        getCourses: function () {
            if (window.localStorage.getItem('courses')) {
                var courses = JSON.parse(window.localStorage.getItem('courses'));
                
                return courses;
            } else {
                var courses = [];
                window.localStorage.setItem('courses', JSON.stringify(courses));
                
                return courses;
            }
        },
        
        newCourse: function (course) {
            if (window.localStorage.getItem('courses')) {
                var courses = [];
                courses = JSON.parse(window.localStorage.getItem('courses'));
                courses.push(course);
                window.localStorage.setItem('courses', JSON.stringify(courses));
            } else {
                window.localStorage.setItem('courses', JSON.stringify(course));
            }
        },
        
        clearCourses: function () {
            var courses = [];
            window.localStorage.setItem('courses', JSON.stringify(courses));
        },
        
        deleteLast: function () {
            var courses = [];
            courses.push(JSON.parse(window.localStorage.getItem('courses')));
            courses.pop();
            window.localStorage.setItem('courses', JSON.stringify(courses));
        },
        
        getPlayers: function () {
            if (window.localStorage.getItem('players')) {
                var players = JSON.parse(window.localStorage.getItem('players'));
                
                return players;
            } else {
                var players = [];
                window.localStorage.setItem('players', JSON.stringify(players));
                
                return players;
            }
        },
        
        newPlayer: function (player) {
            if (window.localStorage.getItem('players')) {
                var players = [];
                players = JSON.parse(window.localStorage.getItem('players'));
                players.push(player);
                window.localStorage.setItem('players', JSON.stringify(players));
            } else {
                var players = [];
                players.push(player);
                window.localStorage.setItem('players', JSON.stringify(players));
            }
        },
        
        removePlayer: function (player) {
            var players = JSON.parse(window.localStorage.getItem('players'));
            for (var i = 0; i < players.length; i++) {
                if (player.name == players[i].name) {
                    players.splice(i, 1);
                }
            }
            
            window.localStorage.setItem('players', JSON.stringify(players));
        },
        
        addToCurrentPlayers: function(player) {
            if (window.localStorage.getItem('currentPlayers')) {
                var currentPlayers = [];
                currentPlayers = JSON.parse(window.localStorage.getItem('currentPlayers'));
                currentPlayers.push(player);
                window.localStorage.setItem('currentPlayers', JSON.stringify(currentPlayers));
            } else {
                var currentPlayers = [];
                currentPlayers.push(player);
                window.localStorage.setItem('currentPlayers', JSON.stringify(currentPlayers));
            }
        },
        
        getCurrentPlayers: function() {
            if (window.localStorage.getItem('currentPlayers')) {
                var currentPlayers = JSON.parse(window.localStorage.getItem('currentPlayers'));
                
                return currentPlayers;
            } else {
                var currentPlayers = [];
                return currentPlayers;
            }
        },
        
        removeFromCurrentPlayers: function(player) {
            var currentPlayers = JSON.parse(window.localStorage.getItem('currentPlayers'));
            
            for (var i = 0; i < currentPlayers.length; i++) {
                if (player.name == currentPlayers[i].name) {
                    currentPlayers.splice(i, 1);
                }
            }
            
            window.localStorage.setItem('currentPlayers', JSON.stringify(currentPlayers));           
        },
        
        clearCurrentPlayers: function() {
            var currentPlayers = []
            window.localStorage.setItem('currentPlayers', JSON.stringify(currentPlayers));
        },
        
        setCurrentCourse: function(course) {
            window.localStorage.setItem("currentCourse", JSON.stringify(course));
        },
        
        getCurrentCourse: function() {
            if (window.localStorage.getItem('currentCourse')) {
                var currentCourse = JSON.parse(window.localStorage.getItem('currentCourse'));
                
                return currentCourse;
            } else {
                return null;
            }
        },
        
        clearCurrentCourse: function() {
            var course = null;
            window.localStorage.setItem("currentCourse", JSON.stringify(course));
        },
        
        removePlayerFromCurrentGame: function(player) {
            var currentPlayers = JSON.parse(window.localStorage.getItem('currentPlayers'));
            for(var i = 0; i < currentPlayers.length; i++) {
                if (player.name == currentPlayers[i].name) {
                    console.log("True");
                    currentPlayers.splice(i, 1);
                    window.localStorage.setItem('currentPlayers', JSON.stringify(currentPlayers));
                } else {
                    console.log("False");
                }
            }
        },
        
        setCurrentPlayer: function(player) {
            currentPlayer = player;
        },
        
        getCurrentPlayer: function() {
            return currentPlayer;
        },
        
        saveCurrentGameStats: function(player, scores) {            
            var players = this.getPlayers();
            var currentCourse = this.getCurrentCourse();
            
            for(var i = 0; i < players.length; i++) {
                if (player.name == players[i].name) {
                    if (players[i].previousGames == "none") {
                        players[i].previousGames = [];
                        var score = [];
                        var sum = scores.reduce(function add(a, b) {
                            return a + b;
                        }, 0);
                        
                        if (sum - currentCourse.par > 0) {
                            sum = "+" + (sum - currentCourse.par);
                        } else {
                            sum = sum - currentCourse.par;
                        }
                        
                        score.push(sum);
                        score.push(currentCourse.name);
                        var today = this.getToday();
                        score.push(today);
                        players[i].previousGames.unshift(score);
                        players[i].playedGames++;
                    } else {
                        var score = [];
                        var sum = scores.reduce(function add(a, b) {
                            return a + b;
                        }, 0);
                        
                        if (sum - currentCourse.par > 0) {
                            sum = "+" + (sum - currentCourse.par);
                        } else {
                            sum = sum - currentCourse.par;
                        }
                        
                        score.push(sum);
                        score.push(currentCourse.name);
                        var today = this.getToday();
                        score.push(today);
                        players[i].previousGames.unshift(score);
                        players[i].playedGames++;
                    }
                }    
            }
            
            // currentCourse.gamesPlayed += 1;
            // this.updateCourses(currentCourse);
            
            window.localStorage.setItem('players', JSON.stringify(players));
        },
        
        updateCourses: function(currentCourse) {
            var courses = JSON.parse(window.localStorage.getItem('courses'));
            for(var i = 0; i < courses.length; i++) {
                if (currentCourse.name == courses[i].name) {
                    courses[i].gamesPlayed++;
                    break;
                }
            }
            
            window.localStorage.setItem('courses', JSON.stringify(courses));
        },
        
        removeCourse: function(course) {
            var courses = JSON.parse(window.localStorage.getItem('courses'));
            for(var i = 0; i < courses.length; i++) {
                if (course.name == courses[i].name) {
                    courses.splice(i, 1);
                    break;
                }
            }
            
            window.localStorage.setItem('courses', JSON.stringify(courses));
        },
        
        getToday: function() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 

            today = dd+'/'+mm+'/'+yyyy;
            return today;
        }
    }
});