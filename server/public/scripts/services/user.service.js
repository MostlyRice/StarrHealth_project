myApp.service('UserService', ['$http', '$location', function ($http, $location) {
  //  console.log('UserService Loaded');
    var self = this;
    self.userObject = {};

    self.getuser = function () {
        //    console.log('UserService -- getuser');
            $http.get('/api/user').then(function (response) {
                if (response.data.username) {
                    // user has a curret session on the server
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                  //  console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
                } else {
                   // console.log('UserService -- getuser -- failure');
                    // user has no session, bounce them back to the login page
                    $location.path("/home");
                }
            }, function (response) {
              //  console.log('UserService -- getuser -- failure: ', response);
                $location.path("/home");
            });


        },

        self.getJulia = function () {
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 4) {
                    // user has a curret session on the server
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                  //  console.log('UserService -- getJulia -- User Data: ', self.userObject.userName);
                } else {
                 //   console.log('UserService -- getJulia -- failure');
                    // user has no session, bounce them back to the login page
                    swal("You are not authorized to view this page.", "", "warning");
                    $location.path("/home");
                }
            }, function (response) {
              //  console.log('UserService -- getJulia -- failure: ', response);
                swal("You are not authorized to view this page.", "", "warning");
                $location.path("/home");
            });


        },

        self.getAdmin = function () {
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 3 || response.data.user_role === 4) {
                    // user has a curret session on the server
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                   console.log('UserService -- getAdmin -- User Data: ', self.userObject.userName);
                } else {
                 console.log('UserService -- getAdmin -- failure');
                    // user has no session, bounce them back to the login page
                    swal("You are not authorized to view this page.", "", "warning");
                    $location.path("/home");
                }
            }, function (response) {
                console.log('UserService -- getAdmin -- failure: ', response);
                swal("You are not authorized to view this page.", "", "warning");
                $location.path("/home");
            });


        },

        self.getCoach = function () {
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 2) {
                    // user has a curret session on the server
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                 //   console.log('UserService -- getCoach -- User Data: ', self.userObject.userName);
                } else {
                //    console.log('UserService -- getCoach -- failure');
                    // user has no session, bounce them back to the login page
                    swal("You are not authorized to view this page.", "", "warning");
                    $location.path("/home");
                }
            }, function (response) {
              //  console.log('UserService -- getCoach -- failure: ', response);
                swal("You are not authorized to view this page.", "", "warning");
                $location.path("/home");
            });


        },

        self.getStudent = function () {
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 1) {
                    // user has a curret session on the server\
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                 //   console.log('UserService -- getStudent -- User Data: ', self.userObject.userName);
                } else {
                 //   console.log('UserService -- getStudent -- failure');
                    // user has no session, bounce them back to the login page
                    swal("You are not authorized to view this page.", "", "warning");
                    $location.path("/home");
                }
            }, function (response) {
             //   console.log('UserService -- getStudent -- failure: ', response);
                swal("You are not authorized to view this page.", "", "warning");
                $location.path("/home");
            });


        },

        self.logout = function () {
            $http.get('/api/user/logout').then(function (response) {
             //   console.log('UserService -- logout -- logged out');
                $location.path("/home");
                location.reload(true);
            });
        }

}]);