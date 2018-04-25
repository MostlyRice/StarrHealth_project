myApp.service('SignupService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
  //  console.log('SignupService Loaded');
    var self = this;
    self.newStudent = {};
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.schools = {
        list: []
    }
    self.allCoaches = {
        list: []
    }
    self.myCoach = {
        list: []
    }
    self.specialties = {
        list: []
    }
    

    self.disclaimer = function () {
        // swal({
        //     title: "Disclaimer",
        //     text: `This application, and any information or materials provided in connection with it, is informational only and does not constitute medical advice, care, diagnosis or treatment.
        //     The Starr Health Co. application is not intended to be a replacement or substitution to the medical advice, care, diagnosis or treatment of a licensed medical practitioner.
        //     Starr Health Co. recommends that you consult your physician prior to beginning any new health initiative.`,
        //     icon: "warning",
        //     buttons: true, 
        //     dangerMode: true,//sweetAlert in progress here
        $location.path('/disclaimer');
    } // end disclaimer

    self.general = function () {
        $location.path('/general_info');
    } // end general

    self.back = function () {
        $location.path('/student_coaches');
    } // end back

    self.goals = function () {
        $location.path('/student_goals');
    } // end goals

    self.viewCoach = function (coach) {
        $http({
            method: 'GET',
            url: `/coach/viewcoach/${coach}`
        }).then(function (response) {
            self.myCoach.list = response.data;
            $http({
                method: 'GET',
                url: `/coach/getspecialties/${coach}`
            }).then(function (response) {
                self.specialties.list = response.data;
            }).catch(function (error) {
            //    console.log('get specialties error');
            })
        }).catch(function (error) {
        //    console.log('get myCoach error');
        })
        $location.path('/match_coach');
    } // end viewCoach


    self.letPass = function () {
        const disclaimer = true;
        const user = UserService.userObject;
        const entry = {
            id: user.id,
            disclaimer: disclaimer
        }
        $http({
            method: 'POST',
            url: '/student',
            data: {
                entry: entry
            }
        }).then(function (response) {
            $location.path('/general_info');
        }).catch(function (error) {
          //  console.log('disclaimer error');
        })
    } // end letPass

    self.getSchools = function () {
        $http({
            method: 'GET',
            url: '/admin/school'
        }).then(function (response) {
            self.schools.list = response.data;
            self.letPass();
        }).catch(function (error) {
        //    console.log('get schools error');
        })
    }

    self.collectGeneral = function (info) {
        const id = UserService.userObject.id;
        const sessions_used = 0;
        const entry = {
            id: id,
            first_name: info.first_name,
            last_name: info.last_name,
            date_of_birth: info.date_of_birth,
            relationship_status: info.relationship_status,
            skype_id: info.skype,
            email: info.email,
            phone_number: info.phone_number,
            school_id: info.school_id,
            school_code: info.school_code,
            sessions_used: sessions_used
        }
        $http({
            method: 'PUT',
            url: `/student/general/${id}`,
            data: {
                entry: entry
            }
        }).then(function (response) {
            const school_id = entry.school_id;
            const school_code = entry.school_code;
            const secret = {
                secret: school_code
            }
            $http({
                method: 'POST',
                url: `/admin/school/${school_id}`,
                data: {
                    secret: secret
                }
            }).then(function (response) {
                const total_sessions = response.data[0].student_sessions;
                const entry = {
                    id: id,
                    total_sessions: total_sessions
                }
                $http({
                    method: 'PUT',
                    url: `/student/sessions/${id}`,
                    data: {
                        entry: entry
                    }
                }).then(function (response) {
                    $location.path('/student_goals');
                }).catch(function (error) {
                //    console.log('sessions put error', error);
                })
            }).catch(function (error) {
                swal("School code is incorrect!", "", "warning");
                info.school_code = '';
            })
        }).catch(function (error) {
         //   console.log('general put error', error);
        })
    } // end collectGeneral

    self.collectGoals = function (goal) {
        const id = UserService.userObject.id;
        const entry = {
            id: id,
            specialty_id: goal.primary_goal,
            other_goals: goal.secondary_goals
        }
        $http({
            method: 'PUT',
            url: `/student/goals/${id}`,
            data: {
                entry: entry
            }
        }).then(function (response) {
            $location.path('/student_barriers');
        }).catch(function (error) {
         //   console.log('goals put error', error);
        })

    }

    self.collectBarriers = function (barriers) {
        const id = UserService.userObject.id;
        const entry = {
            id: id,
            other_barriers: barriers.other_barriers
        }
        $http({
            method: 'PUT',
            url: `/student/barriers/${id}`,
            data: {
                entry: entry
            }
        }).then(function (response) {
            self.primaryBarriers(barriers);
        }).catch(function (error) {
        //    console.log('barriers put error', error);
        })
    } // end collectBarriers

    self.collectExtraInfo = function (info) {
        const id = UserService.userObject.id;
        let other_professionals_explain = 'N/A';
        let other_information_explain = 'N/A';
        if (info.medical_bool === "true") {
            other_professionals_explain = info.medical_explain;
        } else {
            other_professionals_explain = 'N/A';
        }
        if (info.other_bool === "true") {
            other_information_explain = info.other_explain;
        } else {
            other_information_explain = 'N/A';
        }
        const entry = {
            id: id,
            other_professionals: info.medical_bool,
            other_professionals_explain: other_professionals_explain,
            other_information: info.other_bool,
            other_information_explain: other_information_explain
        }
        $http({
            method: 'PUT',
            url: `/student/extra/${id}`,
            data: {
                entry: entry
            }
        }).then(function (response) {
            $location.path('/student_coaches');
        }).catch(function (error) {
          //  console.log('extra info put error', error);
        })

    } // end collect extra info

    self.primaryBarriers = function (barriers) {
        const id = UserService.userObject.id;
        stress = 0;
        support = 0;
        confidence = 0;
        knowledge = 0;
        resources = 0;
        health = 0;
        time = 0;

        if (barriers.stress === true) {
            stress = 1;
            const entry = {
                id: id,
                barrier_id: stress
            }
            $http({
                method: 'POST',
                url: `/barriers/stress`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
            }).catch(function (error) {
             //   console.log('stress post error', error);
            })
        } else {
            stress = 0;
        }
        if (barriers.lack_of_support === true) {
            support = 2;
            const entry = {
                id: id,
                barrier_id: support
            }
            $http({
                method: 'POST',
                url: `/barriers/support`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
            }).catch(function (error) {
            //    console.log('support post error', error);
            })
        } else {
            support = 0;
        }
        if (barriers.self_confidence === true) {
            confidence = 3;
            const entry = {
                id: id,
                barrier_id: confidence
            }
            $http({
                method: 'POST',
                url: `/barriers/confidence`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
            }).catch(function (error) {
             //   console.log('confidence post error', error);
            })
        } else {
            confidence = 0;
        }
        if (barriers.knowledge === true) {
            knowledge = 4;
            const entry = {
                id: id,
                barrier_id: knowledge
            }
            $http({
                method: 'POST',
                url: `/barriers/knowledge`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
            }).catch(function (error) {
            //    console.log('knowledge post error', error);
            })
        } else {
            knowledge = 0;
        }
        if (barriers.resources === true) {
            resources = 5;
            const entry = {
                id: id,
                barrier_id: resources
            }
            $http({
                method: 'POST',
                url: `/barriers/resources`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
            }).catch(function (error) {
            //    console.log('resources post error', error);
            })
        } else {
            resources = 0;
        }
        if (barriers.physical_health === true) {
            health = 6;
            const entry = {
                id: id,
                barrier_id: health
            }
            $http({
                method: 'POST',
                url: `/barriers/health`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
            }).catch(function (error) {
             //   console.log('health post error', error);
            })
        } else {
            health = 0;
        }
        if (barriers.time === true) {
            time = 7;
            const entry = {
                id: id,
                barrier_id: time
            }
            $http({
                method: 'POST',
                url: `/barriers/time`,
                data: {
                    entry: entry
                }
            }).then(function (response) {
            }).catch(function (error) {
             //   console.log('time post error', error);
            })
        } else {
            time = 0;
        }
        $location.path('/additional_info');
    } // end primary Barriers


    self.findCoach = function () {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/match/student/${id}`
        }).then(function (response) {
            const thisStudent = response.data[0].specialty_id;
            $http({
                method: 'GET',
                url: `/match/coaches/${thisStudent}`
            }).then(function (response) {
                self.allCoaches.list = response.data;
                self.thisCoach = response.data[0].coach_id;
            }).catch(function (error) {
            //    console.log('coach match error');
            })
        }).catch(function (error) {
          //  console.log('find student goal error');
        })
    }

    self.studentCoach = function(coach) {
        const id = UserService.userObject.id;
        const entry = {
            id: id,
            coach_id: coach
        }
        $http({
            method: 'PUT',
            url: `/student/coach/${id}`,
            data: {
                entry: entry
            }
        }).then(function (response) {
            $location.path('/student_appointments');
        }).catch(function (error) {
        //    console.log('coach_id put error', error);
        })
    } // end student coach


    self.viewMyCoach = function (coach) {
        $http({
            method: 'GET',
            url: `/coach/viewcoach/${coach}`
        }).then(function (response) {
            self.myCoach.list = response.data;
            $http({
                method: 'GET',
                url: `/coach/getspecialties/${coach}`
            }).then(function (response) {
                self.specialties.list = response.data;
                $location.path('/student_coach');
            }).catch(function (error) {
             //   console.log('get specialties error');
            })
        }).catch(function (error) {
         //   console.log('get myCoach error');
        })
    } // end viewCoach




    self.getMyCoach = function() {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/student/mycoach/${id}`
        }).then(function (response) {
            coach = response.data[0].coach_id;
            self.viewMyCoach(coach);
        }).catch(function (error) {
          //  console.log('coach match error');
        })
    } // end getMyCoach

}]); // end signup service