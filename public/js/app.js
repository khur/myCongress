angular.module('myCongress', ['ngRoute']);

angular.module('myCongress')
    .config(function($routeProvider, $httpProvider) {




        ////////////////////////////////////////////////////////////////////////
        // Check if the user is connected //
        ////////////////////////////////////////////////////////////////////////

        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') {
                    $timeout(deferred.resolve, 0);
                    deferred.resolve();

                    // Not Authenticated
                } else {

                    $rootScope.message = 'You need to log in.';
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    deferred.reject();
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////


        ////////////////////////////////////////////////////
        //       Add an interceptor for AJAX errors       //
        ////////////////////////////////////////////////////

        $httpProvider.interceptors.push(function($q, $location) {
            return {
                response: function(response) {
                    // console.log(response.data);
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401)
                        $location.url('/login');
                    return $q.reject(response);
                }
            };
        });



        ////////=================//////////
        //////// ANGULAR ROUTING //////////
        ////////=================//////////

        $routeProvider.
        when('/list', {
            templateUrl: '../templates/user/list.html',
            controller: 'userController',
            resolve: {
                // loggedin: checkLoggedin
            } //serves the list of USERS partial
        }).when('/login', {
            templateUrl: '../templates/registration/login.html',
            controller: 'LoginCtrl'
                // login in form
        }).when('/new', {
            templateUrl: '../templates/user/new.html',
            controller: 'userController'
                //serves the new USER partial
        }).when('/user/:id', {
            templateUrl: '../templates/user/show.html',
            controller: 'userController',
            // resolve: {
            //     loggedin: checkLoggedin
            // }
            //serves the show USER partial
        }).when('/edit/:id', {
            templateUrl: '../templates/user/edit.html',
            controller: 'userController',
            // resolve: {
            //     loggedin: checkLoggedin
            // }
            // serves the USER edit form
        }).when('/teams', {
            templateUrl: '../templates/team/list.html',
            controller: 'teamController'
                // serves list of TEAMS partial
        }).when('/leagues/:league_id/teams/new', {
            templateUrl: '../templates/team/new.html',
            controller: 'teamController',
            // resolve: {
            //     loggedin: checkLoggedin
            // }
            // serves new TEAM partial
        }).when('/teams/:id', {
            templateUrl: '../templates/team/show.html',
            controller: 'teamController'
                // serves the show TEAM partial
        }).when('/teams/edit/:id', {
            templateUrl: '../templates/team/edit.html',
            controller: 'teamController',
            // resolve: {
            //     loggedin: checkLoggedin
            // }
            // serves the TEAM edit partial
        }).when('/leagues', {
            templateUrl: '../templates/league/list.html',
            controller: 'leagueController'
                // serves the LEAGUE list partial
        }).when('/leagues/new', {
            templateUrl: '../templates/league/new.html',
            controller: 'leagueController',
            // resolve: {
            //     loggedin: checkLoggedin
            // }
            // serves the new LEAGUE partial
        }).when('/leagues/:id', {
            templateUrl: '../templates/league/show.html',
            controller: 'leagueController'
                // serves the show LEAGUE partial
        }).when('/leagues/edit/:id', {
            templateUrl: '../templates/league/edit.html',
            controller: 'leagueController',
            // resolve: {
            //     loggedin: checkLoggedin
            // }
            // serves the edit LEAGUE partial
        }).when('/senators', {
            templateUrl: '../templates/senators/list.html',
            controller: 'SenController'
        }).when('/senators/:id', {
            templateUrl: '../templates/senators/show.html',
            controller: 'SenController'
        }).otherwise(
            '/' //redirects to the root page
        );
    }) // Ends Config Function
    .run(function($rootScope, $http) {
        $rootScope.message = '';
        // Logout function is available in any page
        $rootScope.logout = function() {
            $rootScope.message = 'Later gator';
            $http.post('/logout');
        };

    });

////////////////////////=============================================/////////////////////////
////////////////////////                                             /////////////////////////
////////////////////        USER, TEAM, LEAGUE, SENATOR CONTROLLERS       ////////////////////
////////////////////////                                             /////////////////////////
////////////////////////=============================================/////////////////////////

/////////===========================///////////
/////////      USER CONTROLLER      ///////////
/////////===========================///////////


angular.module('myCongress')
    .controller('userController', userController);

userController.$inject = ["$scope", "$route", "$http", "$routeParams", "$location"];

function userController($scope, $route, $http, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////


    //Gets a list of all the Users
    $http.get('/users').success(function(response) {
        console.log("I got the data i requested!");
        $scope.users = response;
    }); /* Ends users get*/

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    //Creates a new user
    $scope.createUser = function() {
        console.log($scope.user);
        $http.post('/users', $scope.user).success(function(response) {
            console.log(response);
            $scope.person = response;
            $location.path('/');
        }); // Ends post request
        return $scope.user = '';
    }; // Ends user create

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Gets a single user
    $scope.showUser = function() {
        var url = '/users/' + $routeParams.id;
        console.log(url);
        $http.get(url).success(function(response) {
            console.log(response);
            $scope.person = response;
        });
    }; // Ends Show User

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Updates your user
    $scope.updateUser = function() {
        console.log($scope.person._id);
        $http.put('/users/' + $scope.person._id, $scope.person)
            .success(function(response) {
                $location.path('/user/' + $scope.person._id);
            }).error(function(err) {
                console.log(err);
            });

    }; // End User Update function

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Removes a user
    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/users/' + id).success(function(response) {
            console.log("user is gone!");
            $location.path('/');
        });
    }; // End remove User

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////




} // Ends User Controller




///////////////=========================//////////////
///////////////     TEAM CONTROLLER     //////////////
///////////////=========================//////////////

angular.module('myCongress')
    .controller('teamController', teamController);

teamController.$inject = ["$scope", "$route", "$http", "$routeParams", "$location"];

function teamController($scope, $route, $http, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.teamMessage = 'this is from team controller in league view';
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////


    // Gets a list of teams

    $http.get('/teams').success(function(response) {
        console.log("i got the teams" + response);
        $scope.teams = response;
    }); //End list of team GET request

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Gets a single TEAM

    $scope.showTeam = function() {
        var url = '/teams/' + $routeParams.id;
        console.log(url);
        $http.get('/teams/' + $routeParams.id).success(function(response) {
            $scope.team = response;
            console.log($scope.team);
        });
    };

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Creates a TEAM

    $scope.createTeam = function() {

        $scope.newTeam.league_id = $routeParams.league_id;
        var url = '/teams';
        console.log(url);
        console.log("New Team:" + $scope.newTeam);

        $http.post(url, $scope.newTeam)
            .success(function(response) {
                $scope.team = response;
                console.log("this is what i posted:" + $scope.team);
                $location.path('/teams/' + response._id);
            })
            .error(function(message) {
                console.log(message)
            });
        return $scope.newTeam = '';
    };

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Updates a TEAM

    $scope.updateTeam = function() {
        console.log($scope.team._id);
        $http.put('/teams/' + $scope.team._id, $scope.team)
            .success(function(response) {
                $location.path('/teams/' + $scope.team._id);
            }).error(function(err) {
                console.log(err);
            });

    }; // End TEAM Update function

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Removes a TEAM
    $scope.removeTeam = function(id) {
        console.log(id);
        $http.delete('/teams/' + id).success(function(response) {
            console.log("user is gone!");
            $location.path('/');
        });
    }; // End remove TEAM

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////


} // End teamController


///////////////=========================//////////////
///////////////    LEAGUE CONTROLLER    //////////////
///////////////=========================//////////////

angular.module('myCongress')
    .controller('leagueController', leagueController);

teamController.$inject = ["$scope", "$route", "$http", "$routeParams", "$location"];

function leagueController($scope, $route, $http, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;


    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////


    // Gets a list of LEAGUES
    $scope.getLeagues = function() {

        $http.get('/leagues').success(function(response) {
            // console.log("i got the leagues" + response);
            console.dir(response);
            $scope.leagues = response;

        }); //End list of league GET request




    }


    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Gets a single LEAGUE

    $scope.showLeague = function() {
        var url = '/leagues/' + $routeParams.id;
        console.log(url);

        //=== request for the single league

        $http.get(url).success(function(response) {
            $scope.league = response;
            console.dir($scope.league);
        });

        //==== changes URL params
        url = '/leagues/' + $routeParams.id + '/teams';

        //==== Gets a list of Single League Teams
        $http.get(url).success(function(response) {
            $scope.leagueTeams = response;
            $scope.committeeCount = $scope.leagueTeams.length;
            console.log($scope.committeeCount);
            console.log(response);
        });
        console.log("this is last");
    };

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Creates a LEAGUE

    $scope.createLeague = function() {
        console.log("New League:" + $scope.newLeague);
        $scope.newLeague.owner = $rootScope.loginUser.username;
        $http.post('/leagues', $scope.newLeague).success(function(response) {
            $scope.league = response;
            console.log("this is what i posted:" + $scope.league);
            $location.path('/leagues/' + response._id);
        });
        return $scope.newLeague = '';
    };

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Updates a LEAGUE

    $scope.updateLeague = function() {
        console.log($scope.league._id);
        $http.put('/leagues/' + $scope.league._id, $scope.league)
            .success(function(response) {
                $location.path('/leagues/' + $scope.league._id);
            }).error(function(err) {
                console.log(err);
            });

    }; // End LEAGUE Update function

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Removes a LEAGUE
    $scope.removeLeague = function(id) {
        console.log(id);
        $http.delete('/leagues/' + id).success(function(response) {
            console.log("league is gone!");
            $location.path('/');
        });
    }; // End remove LEAGUE

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////

    // Gets a list of Single League Teams

    //$scope.getLeagueTeams = function(id){
    //    console.log("I RAN THE GET LEAGUES FUNCTION");
    //    console.log("this is the leagues id: " + id);
    //    var url = '/leagues/' + id + '/teams';
    //
    //    $http.get(url).success(function (response) {
    //        $scope.leagueTeams = response;
    //        console.dir(response);
    //    });
    //}; // End getLeagueTeams

    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////


} // End leagueController



///////////////=========================//////////////
///////////////    SENATOR CONTROLLER   //////////////
///////////////=========================//////////////



angular.module('myCongress')
    .controller('SenController', SenController);

SenController.$inject = ["$scope", "$route", "$http", "$routeParams", "$location"];

function SenController($scope, $route, $http, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $http.get('/senators').success(function(response) {
        // console.log(response);
        $scope.senators = response;
    });

    $scope.showSenator = function() {
        var url = '/senators/' + $routeParams.id;
        console.log(url);
        $http.get(url).success(function(response) {
            $scope.senator = response;
            console.log("I got a response back for a single senator!")
            console.log($scope.senator);
        });
    };
}; // END SENCONTROLLER 



///////////////=========================//////////////
///////////////     LOGIN CONTROLLER    //////////////
///////////////=========================//////////////

angular.module('myCongress')
    .controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
        // This object will be filled by the form
        $scope.user = {};

        // Register the login() function
        $scope.login = function() {
            $http.post('/login', {
                    username: $scope.user.username,
                    password: $scope.user.password,
                })
                .success(function(user) { // Promise

                    // No error: authentication OK
                    $rootScope.loginUser = $scope.user;
                    $rootScope.message = 'Authentication successful! ' + $rootScope.loginUser.username
                    $location.url('/user/');
                    console.dir(user);
                })
                .error(function() {
                    // Error: authentication failed
                    $rootScope.message = 'Authentication failed.';
                    $location.url('/login');
                });
        };
    });
