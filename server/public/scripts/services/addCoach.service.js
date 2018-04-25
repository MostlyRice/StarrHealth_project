myApp.service('AddCoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
 //   console.log('AddCoachService Loaded');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.specialties = {
        list: []
    }

    self.jobs = {
        list: []
    }

    self.addCoach = function (coach) {
        const user = {
            username: coach.username,
            password: '',
            passwordOne: coach.passwordOne,
            passwordTwo: coach.passwordTwo,
            user_role: 2
        }
        if (user.username === '') {
            swal("Choose a username!", "", "warning");
        } else if (user.passwordOne === '' || user.passwordTwo === '') {
            swal("Choose a password!", "", "warning");
        } else if (user.passwordOne != user.passwordTwo) {
            swal("Passwords do not match!", "", "warning");
        } else if (user.passwordOne === user.passwordTwo) {
            user.password = user.passwordOne;
        //    console.log('sending to server...', user);
            $http.post('/api/user/register', user).then(function (response) {
                    self.addCoachProfile(coach);
                },
                function (response) {
                    swal("Something went wrong, please try again!", "", "warning");
                });
        } else {
            swal("Something went wrong, please try again!", "", "warning");
        }
    }

    self.addCoachProfile = function (coach) {
        const name = coach.username;
        $http({
            method: 'GET',
            url: `/admin/finduser/${name}`
        }).then(function (response) {
            let id = response.data[0].id;
            const entry = {
                id: id,
                first_name: coach.first_name,
                last_name: coach.last_name,
                email: coach.email,
                job_title: coach.job_title,
                personal_interests: coach.interests,
                coach_phone: coach.coach_phone
            }
            $http({
                method: 'POST',
                url: '/coach',
                data: {
                    entry: entry
                }
            }).then(function (response) {
                $http({
                    method: 'GET',
                    url: `/admin/findcoach/${id}`
                }).then(function (response) {
                    coach_id = response.data[0].coach_id;
                    for (thing of coach.specialty) {
                        const entry = {
                            coach_id: coach_id,
                            specialty_id: thing
                        }
                        $http({
                            method: 'POST',
                            url: `/admin/academic`,
                            data: {
                                entry: entry
                            }
                        }).then(function (response) {
                            swal('Coach Added');
                            let role = UserService.userObject.user_role;
                            if (role === 3) {
                                $location.path('/admin_Home');
                            } else if (role === 4) {
                                $location.path('/super_AdminHome');
                            } else {
                                swal("What is your role?", "", "warning");
                            }
                        }).catch(function (error) {
                           // console.log('academic post error', error);
                        })
                    }
                }).catch(function (error) {
                 //   console.log('get schools error');
                })
            }).catch(function (error) {
             //   console.log('specialties error');
            })

        }).catch(function (error) {
          //  console.log('specialties post error', error);
        })
    }

    self.getSpecialties = function() {
        $http({
            method: 'GET',
            url: `/admin/specialties`
        }).then(function (response) {
            self.specialties.list = response.data;
        }).catch(function (error) {
           // console.log('get specialties error');
        })
    } // end get Specialties

    self.getJobs = function() {
        $http({
            method: 'GET',
            url: `/admin/jobs`
        }).then(function (response) {
            self.jobs.list = response.data;
        }).catch(function (error) {
          //  console.log('get jobs error');
        })
    } // end getJobs


}]); // end Addcoach service