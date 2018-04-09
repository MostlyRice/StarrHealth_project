var myApp = angular.module('myApp', ['ngRoute','ngMaterial', 'ngAria', 'ngMessages']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('myApp -- config')
  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    .when('/schedule', {
      templateUrl: '/views/templates/schedule.html',
      controller: 'ScheduleController as vm',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as vm'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
    })
    .when('/julia_home', {
      templateUrl: '/views/templates/julia_home.html',
      controller: 'JuliaController as vm',
      resolve: {
        getJulia : function(UserService){
          return UserService.getJulia();
        }
      }
    })
    .when('/admin_home', {
      templateUrl: '/views/templates/admin_home.html',
      controller: 'UserController as vm',
      resolve: {
        getAdmin : function(UserService){
          return UserService.getAdmin();
        }
      }
    })
    .when('/coach_home', {
      templateUrl: '/views/templates/coach_home.html',
      controller: 'UserController as vm',
      resolve: {
        getCoach : function(UserService){
          return UserService.getCoach();
        }
      }
    })
    .when('/student_home', {
      templateUrl: '/views/student_views/student_home.html',
      controller: 'UserController as vm',
      resolve: {
        getStudent : function(UserService){
          return UserService.getStudent();
        }
      }
    })
    .when('/disclaimer', {
      templateUrl: '/views/student_views/disclaimer.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/general_info', {
      templateUrl: '/views/student_views/general_info.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/student_goals', {
      templateUrl: '/views/student_views/student_goals.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/student_barriers', {
      templateUrl: '/views/student_views/student_barriers.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/additional_info', {
      templateUrl: '/views/student_views/additional_info.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/student_coaches', {
      templateUrl: '/views/student_views/student_coaches.html',
      controller: 'MatchController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
