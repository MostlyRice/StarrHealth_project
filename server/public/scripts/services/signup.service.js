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

    self.backBarriers = function() {
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
        const id = UserService.userObject.id;
        const entry = {
            id: id,
            other_barriers: barriers.other_barriers
        }
        $http({
            method: 'PUT',
            url: `/student/barriers/${id}`,
            data: {entry: entry}
        }).then(function(response) {
            console.log('done');
            self.primaryBarriers(barriers);
        }).catch(function (error) {
          console.log('goals put error', error);
        })
    } // end collectBarriers

    self.collectExtraInfo = function(info) {
        console.log('info', info);
        $location.path('/student_coaches');
    }

    self.primaryBarriers = function(barriers) {
        console.log(barriers);
        const id = UserService.userObject.id;
        let stress = 0;
        let support = 0;
        let confidence = 0;
        let knowledge = 0;
        let resources = 0;
        let health = 0;
        let time = 0;

        if (barriers.stress === true) {
            stress = 1;
            const entry = {
                id: id,
                barrier_id: stress
            }
            $http({
                method: 'POST',
                url: `/barriers/stress`,
                data: {entry: entry}
            }).then(function(response) {
                console.log('stress posted');
            }).catch(function (error) {
              console.log('stress post error', error);
            })
        } else {
            stress = 0;
        }
        if (barriers.lack_of_support === true) {
            support = 2;
            const entry = {
                id: id,
                barrier_id: support
            }
            $http({
                method: 'POST',
                url: `/barriers/support`,
                data: {entry: entry}
            }).then(function(response) {
                console.log('support posted');
            }).catch(function (error) {
              console.log('support post error', error);
            })
        } else {
            support = 0;
        }
        if (barriers.self_confidence === true) {
            confidence = 3;
            const entry = {
                id: id,
                barrier_id: confidence
            }
            $http({
                method: 'POST',
                url: `/barriers/confidence`,
                data: {entry: entry}
            }).then(function(response) {
                console.log('confidence posted');
            }).catch(function (error) {
              console.log('confidence post error', error);
            })
        } else {
            confidence = 0;
        }
        if (barriers.knowledge === true) {
            knowledge = 4;
            const entry = {
                id: id,
                barrier_id: knowledge
            }
            $http({
                method: 'POST',
                url: `/barriers/knowledge`,
                data: {entry: entry}
            }).then(function(response) {
                console.log('knowledge posted');
            }).catch(function (error) {
              console.log('knowledge post error', error);
            })
        } else {
            knowledge = 0;
        }
        if (barriers.resources === true) {
            resources = 5;
            const entry = {
                id: id,
                barrier_id: resources
            }
            $http({
                method: 'POST',
                url: `/barriers/resources`,
                data: {entry: entry}
            }).then(function(response) {
                console.log('resources posted');
            }).catch(function (error) {
              console.log('resources post error', error);
            })
        } else {
            resources = 0;
        }
        if (barriers.physical_health === true) {
            health = 6;
            const entry = {
                id: id,
                barrier_id: health
            }
            $http({
                method: 'POST',
                url: `/barriers/health`,
                data: {entry: entry}
            }).then(function(response) {
                console.log('health posted');
            }).catch(function (error) {
              console.log('health post error', error);
            })
        } else {
            health = 0;
        }
        if (barriers.time === true) {
            time = 7;
            const entry = {
                id: id,
                barrier_id: time
            }
            $http({
                method: 'POST',
                url: `/barriers/time`,
                data: {entry: entry}
            }).then(function(response) {
                console.log('time posted');
            }).catch(function (error) {
              console.log('time post error', error);
            })
        } else {
            time = 0;
        }
    $location.path('/additional_info');
    } // end primary Barriers





}]); // end signup service