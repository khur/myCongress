angular.module('myCongress', ['ngRoute']);

angular.module('myCongress')
	.config(function($routeProvider){

        ////////////////////////////////////////
        //////// ANGULAR ROUTING ///////////////
        ////////////////////////////////////////

	$routeProvider.
	when('/list', {
		templateUrl: '../templates/user/list.html',
		controller: 'userController'
		//serves the list of USERS partial
	}).when('/new', {
            templateUrl: '../templates/user/new.html',
            controller: 'userController'
            //serves the new USER partial
        }
    ).when('/user/:id', {
            templateUrl: '../templates/user/show.html',
            controller: 'userController'
            //serves the show USER patrial
        }
    ).when('/edit/:id', {
           templateUrl: '../templates/user/edit.html',
            controller: 'userController'
            // serves the USER edit form
        }
    ).when('/teams', {
            templateUrl: '../templates/team/list.html',
            controller: 'teamController'
            // serves list of TEAMS partial
        }
    ).when('/teams/new', {
            templateUrl: '../templates/team/new.html',
            controller: 'teamController'
            // serves new TEAM partial
        }
    ).when('/teams/:id',{
            templateUrl: '../templates/team/show.html',
            controller: 'teamController'
            // serves the show TEAM partial
        }
    ).when('/teams/edit/:id', {
            templateUrl: '../templates/team/edit.html',
            controller: 'teamController'
            // server the TEAM edit partial
        }
    ).otherwise(
        '/' //redirects to the root page
    );
}); // Ends Config Function

angular.module('myCongress')
	.controller('userController', userController);

	userController.$inject = ["$scope", "$route", "$http", "$routeParams", "$location"];

	function userController ($scope, $route, $http, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        //Gets a list of all the Users
		$http.get('/users').success(function(response){
			console.log("I got the data i requested!");
			$scope.users = response;
		}); /* Ends users get*/

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        //Creates a new user
        $scope.createUser = function () {
            console.log($scope.user);
            $http.post('/users', $scope.user).success(function (response) {
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
        $scope.showUser = function () {
            var url = '/users/'+ $routeParams.id;
                console.log(url);
            $http.get(url).success(function (response) {
                console.log(response);
                $scope.person = response;
            });
        }; // Ends Show User

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        // Updates your user
        $scope.updateUser = function () {
            console.log($scope.person._id);
            $http.put('/users/' + $scope.person._id, $scope.person)
                .success(function(response){
                    $location.path('/user/' + $scope.person._id);
            }).error(function(err){
                    console.log(err);
                });

        }; // End User Update function

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        // Removes a user
        $scope.remove = function (id) {
            console.log(id);
            $http.delete('/users/' + id).success(function (response) {
                console.log("user is gone!");
                $location.path('/');
            });
        };// End remove User

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////




    } // Ends User Controller




        //////////////////////////////////////////////////////
        ///////////////     TEAM CONTROLLER     //////////////
        //////////////////////////////////////////////////////

    angular.module('myCongress')
        .controller('teamController', teamController);

    teamController.$inject = ["$scope", "$route", "$http", "$routeParams", "$location"];

    function teamController($scope, $route, $http, $routeParams, $location){
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;


        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////


        // Gets a list of teams

        $http.get('/teams').success(function(response){
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
            $http.get('/teams/' + $routeParams.id).success(function (response) {
                $scope.team = response;
                console.log($scope.team);
            });
        };

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        // Creates a TEAM

        $scope.createTeam = function(){
            console.log("New Team:" + $scope.newTeam);
            $http.post('/teams', $scope.newTeam).success(function(response){
                $scope.team = response;
                console.log("this is what i posted:" + $scope.team);
                $location.path('/teams/' + response._id);
            });
            return $scope.newTeam = '';
        };

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        // Updates a TEAM

        $scope.updateTeam = function () {
            console.log($scope.team._id);
            $http.put('/teams/' + $scope.team._id, $scope.team)
                .success(function(response){
                    $location.path('/teams/' + $scope.team._id);
                }).error(function(err){
                    console.log(err);
                });

        }; // End TEAM Update function

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////

        // Removes a TEAM
        $scope.removeTeam = function (id) {
            console.log(id);
            $http.delete('/teams/' + id).success(function (response) {
                console.log("user is gone!");
                $location.path('/');
            });
        };// End remove TEAM

        ///////////////////////////////////////////////
        ///////////////////////////////////////////////
        ///////////////////////////////////////////////





    }// End teamController