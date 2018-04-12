myApp.service('SuperAdminService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('SuperAdminService Loaded');
    var self = this;

    self.superAdminHome = function() {
        $location.path('/super_AdminHome');
    }
    self.superAdminStudentDirectory = function() {
        $location.path('/super_AdminStudentDirectory');
    }
    self.superCoachDirectory = function() {
        $location.path('/super_AdminCoachDirectory');
    }
    self.superAdminSchoolDirectory = function() {
        $location.path('/super_AdminSchoolDirectory');
    }
    self.superAdminCreateCoach = function() {
        $location.path('/super_AdminCreateCoach');
    }
    self.superAdminNewSchool = function() {
        $location.path('/super_AdminNewSchool');
    }
    self.superAdminAllAppointments = function() {
        $location.path('/super_AdminAllAppointments');
    }
    self.superAdminCoachSchedule = function() {
        $location.path('/super_AdminCoachSchedule');
    }
    self.superAdminCoachAllAppointments = function() {
        $location.path('/super_AdminCoachAllAppointments');
    }

    self.coachDir = function() {
        $location.path('/admin_Home');
    }
    
    self.collectCoach = function(coach) {
        console.log('COACH IS: ', coach);
        const user = {
            username: coach.username,
            password: '',
            passwordOne: coach.passwordOne,
            passwordTwo: coach.passwordTwo,
            user_role: 2
        }
        if (user.username === '') {
            alert("Choose a username!");
          } else if (user.passwordOne === '' || user.passwordTwo === '' ) {
            alert("Choose a password!");
          } else if (user.passwordOne != user.passwordTwo) {
            alert("Passwords do not match!");
          } else if (user.passwordOne === user.passwordTwo) {
            user.password = user.passwordOne;
            console.log('sending to server...', user);
            $http.post('/api/user/register', user).then(function (response) {
              console.log('success');
            self.finishCoach(coach);
            },
              function (response) {
                console.log('error');
                alert("Something went wrong. Please try again.")
              });
          } else {
              alert("Something went wrong. Please try again.")
          }
    }

    self.finishCoach = function(coach) {
        console.log('coach', coach);
        const name = coach.username;
        console.log('my name is', name);
        $http({
            method: 'GET',
            url: `/admin/finduser/${name}`
        }).then(function(response) {
            let id = response.data[0].id;
            const entry = {
                id: id,
                first_name: coach.first_name,
                last_name: coach.last_name,
                email: coach.email,
                job_title: coach.job_title,
                specialties: coach.specialty,
                personal_interests: coach.interests
            }
            $http({
                method: 'POST',
                url: '/coach',
                data: {entry: entry}
            }).then(function(response) {
                alert('coach added');
            }).catch(function(error) {
                console.log('disclaimer error');
            })

        }).catch(function (error) {
          console.log('goals put error', error);
        })
    }

}]); // end Admin service