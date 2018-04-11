const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAria', 'ngMessages'])
  .controller('SideNav', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler("left");

    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    function buildDelayedToggler(navID) {
      return debounce(function () {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
  })
/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  console.log('myApp -- config')

  $routeProvider
    .when('/', {
      redirectTo: 'home'
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm',
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as vm',
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
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/admin_home', {
      templateUrl: '/views/admin_views/admin_home.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/coach_directory', {
      templateUrl: '/views/admin_views/coach_directory.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/admin_AllApointments', {
      templateUrl: '/views/admin_views/admin_AllApointments.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    
    .when('/school_directory', {
      templateUrl: '/views/admin_views/school_directory.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/student_directory', {
      templateUrl: '/views/admin_views/student_directory.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/new_school', {
      templateUrl: '/views/admin_views/new_school.html',
      controller: 'SchoolController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/coach_home', {
      templateUrl: '/views/coach_views/coach_home.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/coach_schedule', {
      templateUrl: '/views/coach_views/coach_schedule.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/coach_appointments', {
      templateUrl: '/views/coach_views/coach_appointments.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/coach_students', {
      templateUrl: '/views/coach_views/coach_students.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/create_coach', {
      templateUrl: '/views/admin_views/create_coach.html',
      controller: 'CoachController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/student_home', {
      templateUrl: '/views/student_views/student_home.html',
      controller: 'UserController as vm',
      resolve: {
        getStudent: function (UserService) {
          return UserService.getStudent();
        }
      }
    })
    .when('/disclaimer', {
      templateUrl: '/views/student_views/disclaimer.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/general_info', {
      templateUrl: '/views/student_views/general_info.html',
      controller: 'GeneralController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/student_goals', {
      templateUrl: '/views/student_views/student_goals.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/student_barriers', {
      templateUrl: '/views/student_views/student_barriers.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/additional_info', {
      templateUrl: '/views/student_views/additional_info.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/student_coaches', {
      templateUrl: '/views/student_views/student_coaches.html',
      controller: 'MatchController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);