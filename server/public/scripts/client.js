const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAria', 'ngMessages', 'angularUtils.directives.dirPagination'])
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

/// Routes     ///
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
    .when('/super_AdminHome', {
      templateUrl: '/views/super_admin/super_AdminHome.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminStudentDirectory', {
      templateUrl: '/views/super_admin/super_AdminStudentDirectory.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminCoachDirectory', {
      templateUrl: '/views/super_admin/super_AdminCoachDirectory.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminSchoolDirectory', {
      templateUrl: '/views/super_admin/super_AdminSchoolDirectory.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminCreateCoach', {
      templateUrl: '/views/super_admin/super_AdminCreateCoach.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminNewSchool', {
      templateUrl: '/views/super_admin/super_AdminNewSchool.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminAllAppointments', {
      templateUrl: '/views/super_admin/super_AdminAllAppointments.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminCoachSchedule', {
      templateUrl: '/views/super_admin/super_AdminCoachSchedule.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/super_AdminCoachAllAppointments', {
      templateUrl: '/views/super_admin/super_AdminCoachAllAppointments.html',
      controller: 'SuperAdminController as vm',
      resolve: {
        getJulia: function (UserService) {
          return UserService.getJulia();
        }
      }
    })
    .when('/admin_Home', {
      templateUrl: '/views/admin_views/admin_Home.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/admin_CreateCoach', {
      templateUrl: '/views/admin_views/admin_CreateCoach.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/admin_NewSchool', {
      templateUrl: '/views/admin_views/admin_NewSchool.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/admin_StudentDirectory', {
      templateUrl: '/views/admin_views/admin_StudentDirectory.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/admin_CoachDirectory', {
      templateUrl: '/views/admin_views/admin_CoachDirectory.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/admin_SchoolDirectory', {
      templateUrl: '/views/admin_views/admin_SchoolDirectory.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/admin_AllApointments', {
      templateUrl: '/views/admin_views/admin_AllAppointments.html',
      controller: 'AdminController as vm',
      resolve: {
        getAdmin: function (UserService) {
          return UserService.getAdmin();
        }
      }
    })
    .when('/coach_Home', {
      templateUrl: '/views/coach_views/coach_Home.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/coach_Schedule', {
      templateUrl: '/views/coach_views/coach_Schedule.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/student_Appointments', {
      templateUrl: '/views/student_views/student_Appointments.html',
      controller: 'StudentController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getStudent();
        }
      }
    })
      .when('/student_info', {
        templateUrl: '/views/coach_views/student_info.html',
        controller: 'CoachController as vm',
        resolve: {
          getCoach: function (UserService) {
            return UserService.getCoach();
          }
        }
    }) //ScheduleController
    .when('/coach_Appointments', {
      templateUrl: '/views/coach_views/coach_Appointments.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/coach_Students', {
      templateUrl: '/views/coach_views/coach_Students.html',
      controller: 'CoachController as vm',
      resolve: {
        getCoach: function (UserService) {
          return UserService.getCoach();
        }
      }
    })
    .when('/student_appointments', {
      templateUrl: '/views/student_views/student_appointments.html',
      controller: 'ScheduleController as vm',
      resolve: {
        getStudent: function (UserService) {
          return UserService.getStudent();
        }
      }
    })
    .when('/disclaimer', {
      templateUrl: '/views/registration_views/disclaimer.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/general_info', {
      templateUrl: '/views/registration_views/general_info.html',
      controller: 'GeneralController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/student_goals', {
      templateUrl: '/views/registration_views/student_goals.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/student_barriers', {
      templateUrl: '/views/registration_views/student_barriers.html',
      controller: 'SignupController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/additional_info', {
      templateUrl: '/views/registration_views/additional_info.html',
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
    .when('/student_home', {
      templateUrl: '/views/student_views/student_home.html',
      controller: 'StudentController as vm',
      resolve: {
        getStudent: function (UserService) {
          return UserService.getStudent();
        }
      }
    })
    .when('/student_coach', {
      templateUrl: '/views/student_views/student_coach.html',
      controller: 'MatchController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/past_appointments', {
      templateUrl: '/views/student_views/past_appointments.html',
      controller: 'ApptController as vm',
      resolve: {
        getStudent: function (UserService) {
          return UserService.getStudent();
        }
      }
    })
    .when('/match_coach', {
      templateUrl: '/views/student_views/match_coach.html',
      controller: 'MatchController as vm',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/change_password', {
      templateUrl: '/views/student_views/change_password.html',
      controller: 'StudentController as vm',
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