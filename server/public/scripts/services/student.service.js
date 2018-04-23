myApp.service('StudentService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('StudentService Loaded');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.student = [
        list = {}
    ];
    self.appointment = [
        list = {}
    ];

    self.studentHome = function () {
        $location.path('/student_home');
    }

    self.studentSchedule = function () {
        $location.path('/student_Appointments');
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
            console.log('DATA', response.data);
            self.student.list = response.data;
            console.log('thisStudent = ', self.student.list);
            $http({
                method: 'GET',
                url: `/student/appointment/${id}`
            }).then(function (response) {
                console.log('DATA2', response.data);
                let appointmentArray = response.data.filter(function(res){
                    let date = moment().format('L');
                    if(moment(res.date).isSameOrAfter(date)){
                    return res
                    }
                })
                console.log('appointment array', appointmentArray);
                self.appointment.list = appointmentArray;
                console.log('thisApp = ', self.appointment.list);
            }).catch(function (error) {
                console.log('update get appointment error', error);
            })
        }).catch(function (error) {
            console.log('coach match error');
        })
    } // end getStudent

    self.newPassword = function () {
        $location.path('/change_password');
    } // end newPassword

    self.changePassword = function (auth) {
        console.log('AUTH = ', auth);
        console.log(self.userObject);
        self.user = {
            username: self.userObject.userName,
            password: auth.currentPassword,
            user_role: self.userObject.user_role
        }
        if (auth.currentPassword === '') {
            self.message = "Enter your current password!";
        } else {
            console.log('sending to server...', self.user);
            $http.post('/api/user/login', self.user).then(
                function (response) {
                    if (response.status == 200) {
                        console.log('success: ', response.data);
                        // location works with SPA (ng-route)
                        self.postPassword(auth);
                    } else {
                        console.log('failure error: ', response);
                        alert('Current Password is Incorrect');
                    }
                },
                function (response) {
                    console.log('failure error: ', response);
                    alert('Current Password is Incorrect');
                    location.reload(true);
                });
        }
    } // end changePassword

    self.postPassword = function (auth) {
        console.log('HOORAY for ', auth);
        const id = UserService.userObject.id;
        if (auth.newPasswordOne != auth.newPasswordTwo) {
            alert('New Passwords Do Not Match');
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
                alert('SUCCESS');
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
                    alert('What is your role?');
                }
                // $location.path('/student_home');
            }).catch(function (error) {
                console.log('change password put error', error);
            })
        } else {
            alert('Something went wrong!');
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
            alert('What is your role?');
        }
    }

    self.saveBio = function (id, bio) {
        console.log(id, bio);
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
            alert('SUCCESS');
            location.reload(true);
        }).catch(function (error) {
            console.log('update bio put error', error);
        })
    } // end saveBio

}]); // end student service