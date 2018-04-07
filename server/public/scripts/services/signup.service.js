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

    self.letPass = function() {
        const disclaimer = true;
        const user = UserService.userObject;
        console.log('user is ', user, disclaimer);
        const entry = {
            id: user.id,
            disclaimer: disclaimer
        }
        $http({
            method: 'POST',
            url: '/student',
            data: {entry: entry}
        }).then(function(response) {
            $location.path('/general_info');
        }).catch(function(error) {
            console.log('disclaimer error');
        })
      } // end letPass

      self.collectGeneral = function(info) {
          console.log('general info', info);
          const id = UserService.userObject.id;
          const entry = {
              id: id,
              first_name: info.first_name,
              last_name: info.last_name,
              date_of_birth: info.date_of_birth,
              relationship_status: info.relationship_status,
              skype_id: info.skype,
              email: info.email,
              phone_number: info.phone_number,
              school_name: info.school_name,
              school_code: info.school_code
          }
          $http({
            method: 'PUT',
            url: `/student/general/${id}`,
            data: {entry: entry}
        }).then(function(response) {
          $location.path('/student_goals');
        }).catch(function (error) {
          console.log('general put error', error);
        })

      }

      self.collectGoals = function(goal) {
        console.log('goal', goal);
        const id = UserService.userObject.id;
        const entry = {
            id: id,
            primary_goal: goal.primary_goal,
            other_goals: goal.secondary_goals
        }
        $http({
            method: 'PUT',
            url: `/student/goals/${id}`,
            data: {entry: entry}
        }).then(function(response) {
            $location.path('/student_barriers');
        }).catch(function (error) {
          console.log('goals put error', error);
        })

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