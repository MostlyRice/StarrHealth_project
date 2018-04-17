myApp.service('CoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('CoachService Loaded');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.myself = {
        list: []
    }

    self.coachHome = function () {
        $location.path('/coach_Home');
    }
    self.coachAppointmenets = function () {
        $location.path('/coach_Appointments');
    }
    self.coachSchedule = function () {
        $location.path('/coach_Schedule');
    }
    self.coachStudents = function () {
        $location.path('/coach_Students');
    }

    self.newPassword = function () {
        $location.path('/coach_password');
    } // end newPassword

    self.getMe = function() {
        const id = UserService.userObject.id;
        console.log('myID', id);
        $http({
            method: 'GET',
            url: `/coach/${id}`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.myself.list = response.data;
            console.log('thisCoach = ', self.myself.list);
        }).catch(function (error) {
            console.log('get coach error');
        })
    }

    self.saveCoach = function(id, coach) {
        console.log('This ID', id);
        console.log('This Coach', coach);
        entry = {
            coach_id: id,
            first_name: coach.first_name,
            last_name: coach.last_name,
            email: coach.email,
            job_title: coach.job_title,
            certifications: coach.certifications,
            personal_interests: coach.personal_interests,
            coach_bio: coach.coach_bio
        }
        $http({
            method: 'PUT',
            url: `/coach/profile/${id}`,
            data: {
                entry: entry
            }
        }).then(function (response) {
            alert('Successful Update');
            location.reload(true);
        }).catch(function (error) {
            console.log('profile change error');
        })
    }

    self.saveUserName = function(id, name) {
        console.log('id', id);
        console.log('username', name)
        entry = {
            id: id,
            username: name
        }
        $http({
        method: 'PUT',
        url: `/coach/username/${id}`,
        data: {
            entry: entry
        }
    }).then(function (response) {
        alert('Successful Update');
        location.reload(true);
    }).catch(function (error) {
        console.log('username change error');
    })
    }

}]); // end coach service