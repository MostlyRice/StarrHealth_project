myApp.service('CoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('CoachService Loaded');
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
    self.notesBool = '';

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
                swal("Successful Update!", "", "success");
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
        $location.path('/change_password');
    } // end newPassword

    self.getMe = function () {
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

    self.saveCoach = function (id, coach) {
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
            swal("Successful Update!", "", "success");
            location.reload(true);
        }).catch(function (error) {
            console.log('profile change error');
        })
    }

    self.saveUserName = function (id, name) {
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
            swal("successful Update!", "", "success");
            location.reload(true);
        }).catch(function (error) {
            console.log('username change error');
        })
    }

    self.getTodayAppts = function() {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/coach/today/${id}`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.todayAppts.list = response.data;
            console.log('TODAYS APPTS = ', self.todayAppts.list);
        }).catch(function (error) {
            console.log('get coach error');
        })
    }

    self.getMyStudents = function() {
        const id = UserService.userObject.id;
        console.log('HERE');
        $http({
            method: 'GET',
            url: `/coach/${id}`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.myself.list = response.data;
            console.log('thisCoach = ', self.myself.list);
            coach = response.data[0].coach_id;
            $http({
                method: 'GET',
                url: `/coach/everyone/students/${coach}`
            }).then(function (response) {
                console.log('DATA', response.data);
                self.coachesStudents.list = response.data;
                console.log('my students = ', self.coachesStudents.list);
            }).catch(function (error) {
                console.log('get my students error');
            })
        }).catch(function (error) {
            console.log('get coach error');
        })
    }
       
    

    self.moreInfo = function(id) {
        $http({
            method: 'GET',
            url: `/coach/onestudent/${id}`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.myStudent.list = response.data;
            console.log('my Student = ', self.myStudent.list);
            $http({
                method: 'GET',
                url: `/coach/thisstudent/appts/${id}`
            }).then(function (response) {
                console.log('DATA', response.data);
                self.studentAppts.list = response.data;
                console.log('my students appts = ', self.studentAppts.list);
                $location.path('/student_info');
            }).catch(function (error) {
                console.log('get my students error');
            })
        }).catch(function (error) {
            console.log('get my Studen error');
        })
        
    }

    self.addNotes = function(id, student) {

        console.log('in upload');
        self.typeUrl = false;
        self.client.pick({
            accept: '.pdf',
            maxFiles: 1
        }).then(function (result) {
            // self.uploadSuccess.success = true;
            // console.log(JSON.stringify(result));
            self.newItem.itemUrl = result.filesUploaded[0].url;
            console.log('self.newItem.itemUrl', self.newItem.itemUrl);
            let note = self.newItem.itemUrl;
            let note_update = 'Notes Complete';
            entry = {
                id: id,
                session_notes: note,
                notes_status: note_update
            }
            console.log('ENTRAY', entry);
            $http({
                method: 'PUT',
                url: `/coach/sessionnotes/${id}`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
                swal("Successful Update!", "", "success");
                console.log('NEXT ID = ', id);
                self.moreInfo(student);
            }).catch(function (error) {
                console.log('notes uplaod error');
            })

        });
    }


    self.late = function(id, newmessage) {
        console.log('in late', newmessage);
        $http({
            method: 'GET',
            url: `/sms/studentphone/${id}`,
        }).then(function (response) {
            console.log('COMPLETE', response.data);
            let firstphone = response.data[0].phone_number;
            console.log(firstphone);
            let phone = '+1' + firstphone;
            console.log(phone);
            const entry = {
                phone: phone,
                newmessage: newmessage
            }
            $http({
                method: 'POST',
                url: `/sms/message`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
                alert('Message Sent to Student!');
                $location.path('/coach_Home');
            }).catch(function (error) {
                console.log('SMS error');
            })  
        }).catch(function (error) {
            console.log('SMS error');
        })
    }


}]); // end coach service