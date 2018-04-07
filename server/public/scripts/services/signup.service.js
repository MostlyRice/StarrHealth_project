myApp.service('SignupService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('SignupService Loaded');
    var self = this;
    self.newStudent = {};
    self.userService = UserService;
    self.userObject = UserService.userObject;
    



    self.disclaimer = function() {
        $location.path('/disclaimer');
      } // end disclaimer

    self.general = function() {
        $location.path('/general_info');
    } // end general

    self.goals = function() {
        $location.path('/student_goals');
    } // end goals

    self.barriers = function() {
        $location.path('/student_barriers');
    } // end goals

    self.letPass = function(id) {
        console.log('SS', id);
        const disclaimer = true;
        $location.path('/general_info');
      } // end letPass

      self.collectGeneral = function(info) {
          console.log('general info', info);
          $location.path('/student_goals');
      }

      self.collectGoals = function(goals) {
        console.log('goals', goals);
        $location.path('/student_barriers');
    }

    self.collectBarriers = function(barriers) {
        console.log('barriers', barriers);
        $location.path('/additional_info');
    }

    self.collectExtraInfo = function(info) {
        console.log('info', info);
        $location.path('/student_coaches');
    }



}]); // end signup service