myApp.service('CoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('CoachService Loaded');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.myself = {
        list: []
    }
    self.newItem = {};

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
    
    //Instantiating dialog with Filestack
    self.client = filestack.init("ASYgNuRdqTkmiELkrSnfIz");

    self.coachBio = {
        list: []
    };

    //Filestack API method 'pick()' that opens the file picker
    self.upload = function () {
        const id = UserService.userObject.id;
        console.log('in upload');
        self.typeUrl = false;
        self.client.pick({
            accept: 'image/*',
            maxFiles: 1
        }).then(function (result) {
            // self.uploadSuccess.success = true;
            // console.log(JSON.stringify(result));
            self.newItem.itemUrl = result.filesUploaded[0].url;
            console.log('self.newItem.itemUrl', self.newItem.itemUrl);
            let photo = self.newItem.itemUrl;
            entry = {
                id: id,
                coach_photo: photo
            }
            console.log('ENTRAY', entry);
            $http({
                method: 'PUT',
                url: `/coach/photo/${id}`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
                alert('Successful Update');
                location.reload(true);
            }).catch(function (error) {
                console.log('photo change error');
            })

        });
    }

    self.getCoachBio = function () {
        $http({
            method: 'GET',
            url: '/picture'
        }).then(function (response) {
            self.coachBio.list = response.data;
        }).catch(function (error) {
            console.log('get error', error);
        })
    }

    self.addPicture = function () {
        console.log();
        $http({
            method: 'POST',
            url: '/picture',
            data: {}
        }).then(function (response) {
            self.getCoachBio();
            $location.path('/coach_Home');
        }).catch(function (error) {
            console.log('post error', error);
        })
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