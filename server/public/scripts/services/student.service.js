myApp.service('StudentService', ['$http', '$location', 'UserService', 'SignupService', function ($http, $location, UserService, SignupService) {
 //   console.log('StudentService Loaded');
    var self = this;
    self.userService = UserService;
    self.signupService = SignupService;
    self.userObject = UserService.userObject;
    self.student = [
        list = {}
    ];
    self.appointment = [
        list = {}
    ];

    self.myAppts = {
        list: []
    }

    self.studentHome = function () {
        $location.path('/student_home');
    }

    self.studentSchedule = function () {
        $location.path('/student_appointments');
    }

    self.studentCoach = function () {
        $location.path('/student_coach');
    } 

    self.getStudent = function () {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/student/${id}`
        }).then(function (response) {
            self.student.list = response.data;
            $http({
                method: 'GET',
                url: `/student/appointment/${id}`
            }).then(function (response) {
                let appointmentArray = response.data.filter(function(res){
                    let date = moment().format('L');
                    if(moment(res.date).isSameOrAfter(date)){
                    return res
                    }
                })
                self.appointment.list = appointmentArray;
            }).catch(function (error) {
             //   console.log('update get appointment error', error);
            })
        }).catch(function (error) {
          //  console.log('coach match error');
        })
    } // end getStudent

    self.newPassword = function () {
        $location.path('/change_password');
    } // end newPassword

    self.changePassword = function (auth) {
        self.user = {
            username: self.userObject.userName,
            password: auth.currentPassword,
            user_role: self.userObject.user_role
        }
        if (auth.currentPassword === '') {
            self.message = "Enter your current password!";
        } else {
         //   console.log('sending to server...', self.user);
            $http.post('/api/user/login', self.user).then(
                function (response) {
                    if (response.status == 200) {
                   //     console.log('success: ', response.data);
                        // location works with SPA (ng-route)
                        self.postPassword(auth);
                    } else {
                      //  console.log('failure error: ', response);
                        swal("Current password is incorrect!", "", "warning");
                    }
                },
                function (response) {
                 //   console.log('failure error: ', response);
                    swal("Current password is incorrect!", "", "warning");
                    location.reload(true);
                });
        }
    } // end changePassword

    self.postPassword = function (auth) {
        const id = UserService.userObject.id;
        if (auth.newPasswordOne != auth.newPasswordTwo) {
            swal("New passwords do not match!", "", "warning");
            location.reload(true);
        } else if (auth.newPasswordOne === auth.newPasswordTwo) {
            entry = {
                username: self.userObject.userName,
                password: auth.newPasswordOne,
            }
            $http({
                method: 'PUT',
                url: `/api/user/changePassword/${id}`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
                swal("Success!", "", "success");
                let role = UserService.userObject.user_role;
                if (role === 2) {
                    $location.path('/coach_Home');
                } else if (role === 1) {
                    $location.path('/student_home');
                } else if (role === 3) {
                    $location.path('/admin_home');
                } else if (role === 4) {
                    $location.path('/super_AdminHome');
                }
                 else {
                    swal("What is your role?", "", "warning");
                }
                // $location.path('/student_home');
            }).catch(function (error) {
             //   console.log('change password put error', error);
            })
        } else {
            swal("Something went wrong!", "", "warning");
            location.reload(true);
        }
    } // end postPassword

    self.returnFromPass = function() {
        let role = UserService.userObject.user_role;
        if (role === 2) {
            $location.path('/coach_Home');
        } else if (role === 1) {
            $location.path('/student_home');
        } else if (role === 3) {
            $location.path('/admin_home');
        } else if (role === 4) {
            $location.path('/super_AdminHome');
        }
         else {
            swal("What is your role?", "", "warning");
        }
    }

    self.saveBio = function (id, bio) {
        const entry = {
            student_id: id,
            student_bio: bio
        }
        $http({
            method: 'PUT',
            url: `/student/bio/${id}`,
            data: {
                entry: entry
            }
        }).then(function (response) {
            swal("Success!", "", "success");
            location.reload(true);
        }).catch(function (error) {
        //    console.log('update bio put error', error);
        })
    } // end saveBio

    self.myPastAppts = function() {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/coach/thisstudent/appts/${id}`
        }).then(function (response) {
            self.myAppts.list = response.data;
            $location.path('/past_appointments');
        }).catch(function (error) {
         //   console.log('get my students error');
        })
    }

    self.late = function(id, newmessage) {
        $http({
            method: 'GET',
            url: `/sms/coachphone/${id}`,
        }).then(function (response) {
            let firstphone = response.data[0].coach_phone;
            let first_name = response.data[0].first_name.trim();
            let last_name = response.data[0].last_name.trim();
            let phone = '+1' + firstphone;
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
                $location.path('/student_home');
            }).catch(function (error) {
             //   console.log('SMS error');
            })  
        }).catch(function (error) {
        //    console.log('SMS error');
        })
    }

   

}]); // end student service