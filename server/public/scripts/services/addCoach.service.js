myApp.service('AddCoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('AddCoachService Loaded');
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
        console.log('COACH I S: ', coach);
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
            console.log('sending to server...', user);
            $http.post('/api/user/register', user).then(function (response) {
                    console.log('success');
                    self.addCoachProfile(coach);
                },
                function (response) {
                    console.log('error');
                    swal("Something went wrong, please try again!", "", "warning");
                });
        } else {
            swal("Something went wrong, please try again!", "", "warning");
        }
    }

    self.addCoachProfile = function (coach) {
        console.log('coach', coach);
        const name = coach.username;
        console.log('my name is', name);
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
                personal_interests: coach.interests
            }
            $http({
                method: 'POST',
                url: '/coach',
                data: {
                    entry: entry
                }
            }).then(function (response) {
                console.log('MY ID ++++ ', id);
                $http({
                    method: 'GET',
                    url: `/admin/findcoach/${id}`
                }).then(function (response) {
                    console.log(response.data);
                    coach_id = response.data[0].coach_id;
                    console.log('CID', coach_id);
                    console.log('CID', coach.specialty);
                    for (thing of coach.specialty) {
                        console.log(thing);
                        const entry = {
                            coach_id: coach_id,
                            specialty_id: thing
                        }
                        console.log(entry);
                        $http({
                            method: 'POST',
                            url: `/admin/academic`,
                            data: {
                                entry: entry
                            }
                        }).then(function (response) {
                            console.log('academic posted');
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
                            console.log('academic post error', error);
                        })
                    }
                }).catch(function (error) {
                    console.log('get schools error');
                })
            }).catch(function (error) {
                console.log('specialties error');
            })

        }).catch(function (error) {
            console.log('specialties post error', error);
        })
    }

    self.getSpecialties = function() {
        $http({
            method: 'GET',
            url: `/admin/specialties`
        }).then(function (response) {
            console.log('special', response.data);
            self.specialties.list = response.data;
            console.log('special 2 = ', self.specialties.list);
        }).catch(function (error) {
            console.log('get specialties error');
        })
    } // end get Specialties

    self.getJobs = function() {
        $http({
            method: 'GET',
            url: `/admin/jobs`
        }).then(function (response) {
            console.log('jobs', response.data);
            self.jobs.list = response.data;
            console.log('jobs 2 = ', self.jobs.list);
        }).catch(function (error) {
            console.log('get jobs error');
        })
    } // end getJobs


}]); // end Addcoach service