myApp.service('CoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('CoachService Loaded');
    var self = this;


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
    self.client = filestack.init("");

    self.coachBio = {
        list: []
    };

    //Filestack API method 'pick()' that opens the file picker
    self.upload = function () {
        console.log('in upload');
        self.typeUrl = false;
        self.client.pick({
            accept: 'image/*',
            maxFiles: 1
        }).then(function (result) {
            // self.uploadSuccess.success = true;
            alert("Successful Upload!");
            // console.log(JSON.stringify(result));
            self.newItem.itemUrl = result.filesUploaded[0].url;
            console.log('self.newItem.itemUrl', self.newItem.itemUrl);

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
}]); // end coach service