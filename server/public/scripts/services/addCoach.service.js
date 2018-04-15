myApp.service('AddCoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('AddCoachService Loaded');
    var self = this;


    self.addCoach = function (coach) {
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
        } else if (user.passwordOne === '' || user.passwordTwo === '') {
            alert("Choose a password!");
        } else if (user.passwordOne != user.passwordTwo) {
            alert("Passwords do not match!");
        } else if (user.passwordOne === user.passwordTwo) {
            user.password = user.passwordOne;
            console.log('sending to server...', user);
            $http.post('/api/user/register', user).then(function (response) {
                    console.log('success');
                    self.addCoachProfile(coach);
                },
                function (response) {
                    console.log('error');
                    alert("Something went wrong. Please try again.")
                });
        } else {
            alert("Something went wrong. Please try again.")
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
                    academic = 0;
                    social = 0;
                    health = 0;
                    professional = 0;
                    relationships = 0;

                    if (coach.academic === true) {
                        academic = 1;
                        const entry = {
                            coach_id: coach_id,
                            specialty_id: academic
                        }
                        $http({
                            method: 'POST',
                            url: `/admin/academic`,
                            data: {
                                entry: entry
                            }
                        }).then(function (response) {
                            console.log('academic posted');
                        }).catch(function (error) {
                            console.log('academic post error', error);
                        })
                    } else {
                        academic = 0;
                    }
                    if (coach.social === true) {
                        social = 2;
                        const entry = {
                            coach_id: coach_id,
                            specialty_id: social
                        }
                        $http({
                            method: 'POST',
                            url: `/admin/social`,
                            data: {
                                entry: entry
                            }
                        }).then(function (response) {
                            console.log('social posted');
                        }).catch(function (error) {
                            console.log('social post error', error);
                        })
                    } else {
                        social = 0;
                    }
                    if (coach.health === true) {
                        health = 3;
                        const entry = {
                            coach_id: coach_id,
                            specialty_id: health
                        }
                        $http({
                            method: 'POST',
                            url: `/admin/health`,
                            data: {
                                entry: entry
                            }
                        }).then(function (response) {
                            console.log('health posted');
                        }).catch(function (error) {
                            console.log('health post error', error);
                        })
                    } else {
                        health = 0;
                    }
                    if (coach.professional === true) {
                        professional = 4;
                        const entry = {
                            coach_id: coach_id,
                            specialty_id: professional
                        }
                        $http({
                            method: 'POST',
                            url: `/admin/professional`,
                            data: {
                                entry: entry
                            }
                        }).then(function (response) {
                            console.log('professional posted');
                        }).catch(function (error) {
                            console.log('professional post error', error);
                        })
                    } else {
                        professional = 0;
                    }
                    if (coach.relationships === true) {
                        relationships = 5;
                        const entry = {
                            coach_id: coach_id,
                            specialty_id: relationships
                        }
                        $http({
                            method: 'POST',
                            url: `/admin/relationships`,
                            data: {
                                entry: entry
                            }
                        }).then(function (response) {
                            console.log('relationships posted');
                        }).catch(function (error) {
                            console.log('relationships post error', error);
                        })
                    } else {
                        relationships = 0;
                    }
                    alert('Coach Added');
                    $location.path('/admin_Home');
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




}]); // end Addcoach service