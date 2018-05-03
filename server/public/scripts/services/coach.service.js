myApp.service('CoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
  //  console.log('CoachService Loaded');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.myself = {
        list: []
    }
    self.todayAppts = {
        list: []
    }
    self.coachesStudents = {
        list: []
    }
    self.newItem = {};

    self.myStudent = {
        list: []
    };
    self.studentAppts = {
        list: []
    };

    self.othergoals = '';
    self.professionals = '';
    self.otherinfo = '';

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

    // Instantiating dialog with Filestack
    // API Key left blank, please insert your Filestack API Key 
    // or Filestack will not function in this application

    self.getKey = function() {
        let FILESTACK_KEY
        $http.get('/filestack-key')
        .then(response => {
            FILESTACK_KEY = response.data;
            self.client = filestack.init(FILESTACK_KEY);
        }).catch(err => {
            console.log(err);
        })
    }
    
    self.getKey();


    self.coachBio = {
        list: []
    };

    //Filestack API method 'pick()' that opens the file picker
    self.upload = function () {
        const id = UserService.userObject.id;
        self.typeUrl = false;
        self.client.pick({
            accept: 'image/*',
            maxFiles: 1
        }).then(function (result) {
            // self.uploadSuccess.success = true;
            // console.log(JSON.stringify(result));
            self.newItem.itemUrl = result.filesUploaded[0].url;
            let photo = self.newItem.itemUrl;
            entry = {
                id: id,
                coach_photo: photo
            }
            $http({
                method: 'PUT',
                url: `/coach/photo/${id}`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
                swal("Successful Update!", "", "success");
                location.reload(true);
            }).catch(function (error) {
            //    console.log('photo change error');
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
        //    console.log('get error', error);
        })
    }

    self.addPicture = function () {
        $http({
            method: 'POST',
            url: '/picture',
            data: {}
        }).then(function (response) {
            self.getCoachBio();
            $location.path('/coach_Home');
        }).catch(function (error) {
         //   console.log('post error', error);
        })
    }

    self.newPassword = function () {
        $location.path('/change_password');
    } // end newPassword

    self.getMe = function () {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/coach/${id}`
        }).then(function (response) {
            self.myself.list = response.data;
        }).catch(function (error) {
          //  console.log('get coach error');
        })
    }

    self.saveCoach = function (id, coach) {
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
            swal("Successful Update!", "", "success");
            location.reload(true);
        }).catch(function (error) {
         //   console.log('profile change error');
        })
    }

    self.saveUserName = function (id, name) {
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
            swal("successful Update!", "", "success");
            location.reload(true);
        }).catch(function (error) {
         //   console.log('username change error');
        })
    }

    self.getTodayAppts = function() {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/coach/today/${id}`
        }).then(function (response) {
            self.todayAppts.list = response.data;
        }).catch(function (error) {
          //  console.log('get  coach error');
        })
    }

    self.getMyStudents = function() {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/coach/${id}`
        }).then(function (response) {
            self.myself.list = response.data;
            coach = response.data[0].coach_id;
            $http({
                method: 'GET',
                url: `/coach/everyone/students/${coach}`
            }).then(function (response) {
                self.coachesStudents.list = response.data;
            }).catch(function (error) {
             //   console.log('get my students error');
            })
        }).catch(function (error) {
         //   console.log('get coach error');
        })
    }
       
    

    self.moreInfo = function(id) {
        $http({
            method: 'GET',
            url: `/coach/onestudent/${id}`
        }).then(function (response) {
            self.myStudent.list = response.data;
            self.othergoals = response.data[0].other_goals;
            self.professionals = response.data[0].other_professionals;
            self.otherinfo = response.data[0].other_information;
            if (self.othergoals === null) {
                self.othergoals = "N/A";
            } else {
                self.othergoals = response.data[0].other_goals;
            }
            if (self.professionals === false) {
                self.professionals = 'No';
            } else {
                self.professionals = 'Yes';
            }
            if (self.otherinfo === false) {
                self.otherinfo = 'No';
            } else {
                self.otherinfo = 'Yes';
            }
            $http({
                method: 'GET',
                url: `/coach/thisstudent/appts/${id}`
            }).then(function (response) {
                self.studentAppts.list = response.data;
                $location.path('/student_info');
            }).catch(function (error) {
             //   console.log('get my students error');
            })
        }).catch(function (error) {
          //  console.log('get my Studen error');
        })
        
    }

    self.addNotes = function(id, student) {
        self.typeUrl = false;
        self.client.pick({
            accept: '.pdf',
            maxFiles: 1
        }).then(function (result) {
            // self.uploadSuccess.success = true;
            // console.log(JSON.stringify(result));
            self.newItem.itemUrl = result.filesUploaded[0].url;
            let note = self.newItem.itemUrl;
            let note_update = 'Notes Complete';
            entry = {
                id: id,
                session_notes: note,
                notes_status: note_update
            }
            $http({
                method: 'PUT',
                url: `/coach/sessionnotes/${id}`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
                swal("Successful Update!", "", "success");
                self.moreInfo(student);
            }).catch(function (error) {
            //    console.log('notes uplaod error');
            })

        });
    }


    self.late = function(id, newmessage) {
        $http({
            method: 'GET',
            url: `/sms/studentphone/${id}`,
        }).then(function (response) {
            let firstphone = response.data[0].phone_number;
            let phone = '+1' + firstphone;
            let first_name = response.data[0].first_name.trim();
            let last_name = response.data[0].last_name.trim();
            const entry = {
                phone: phone,
                newmessage: newmessage,
                first_name: first_name,
                last_name: last_name
            }
            $http({
                method: 'POST',
                url: `/sms/message`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
                swal({
                    title: "Your message has been sent!",
                    icon: "success",
                });
                $location.path('/coach_Home');
            }).catch(function (error) {
              //  console.log('SMS error');
            })  
        }).catch(function (error) {
          //  console.log('SMS error');
        })
    }


}]); // end coach service