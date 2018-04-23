myApp.service('UserService', ['$http', '$location', function ($http, $location) {
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};

    self.getuser = function () {
            console.log('UserService -- getuser');
            $http.get('/api/user').then(function (response) {
                if (response.data.username) {
                    console.log('user service reponse', response.data);
                    console.log('user service userObject', self.userObject);
                    // user has a curret session on the server
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                    console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
                } else {
                    console.log('UserService -- getuser -- failure');
                    // user has no session, bounce them back to the login page
                    $location.path("/home");
                }
            }, function (response) {
                console.log('UserService -- getuser -- failure: ', response);
                $location.path("/home");
            });


        },

        self.getJulia = function () {
            console.log('UserService -- getJulia');
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 4) {
                    console.log('get Julia reponse', response.data);
                    console.log('get Julia userObject', self.userObject);
                    // user has a curret session on the server
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                    console.log('UserService -- getJulia -- User Data: ', self.userObject.userName);
                } else {
                    console.log('UserService -- getJulia -- failure');
                    // user has no session, bounce them back to the login page
                    alert("You are not authorized to view this page");
                    $location.path("/home");
                }
            }, function (response) {
                console.log('UserService -- getJulia -- failure: ', response);
                alert("Get out of here n00b");
                $location.path("/home");
            });


        },

        self.getAdmin = function () {
            console.log('UserService -- getAdmin');
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 3 || response.data.user_role === 4) {
                    console.log('get Admin reponse', response.data);
                    console.log('get Admin userObject', self.userObject);
                    // user has a curret session on the server
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                    console.log('UserService -- getAdmin -- User Data: ', self.userObject.userName);
                } else {
                    console.log('UserService -- getAdmin -- failure');
                    // user has no session, bounce them back to the login page
                    alert("You are not authorized to view this page");
                    $location.path("/home");
                }
            }, function (response) {
                console.log('UserService -- getAdmin -- failure: ', response);
                alert("You are not authorized to view this page");
                $location.path("/home");
            });


        },

        self.getCoach = function () {
            console.log('UserService -- getCoach');
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 2) {
                    console.log('get Coach reponse', response.data);
                    console.log('get Coach userObject', self.userObject);
                    // user has a curret session on the server
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                    console.log('UserService -- getCoach -- User Data: ', self.userObject.userName);
                } else {
                    console.log('UserService -- getCoach -- failure');
                    // user has no session, bounce them back to the login page
                    alert("You are not authorized to view this page");
                    $location.path("/home");
                }
            }, function (response) {
                console.log('UserService -- getCoach -- failure: ', response);
                alert("You are not authorized to view this page");
                $location.path("/home");
            });


        },

        self.getStudent = function () {
            console.log('UserService -- getStudent');
            $http.get('/api/user').then(function (response) {
                if (response.data.user_role === 1) {
                    console.log('get Student reponse', response.data);
                    console.log('get Student userObject', self.userObject);
                    // user has a curret session on the server\
                    self.userObject.id = response.data.id;
                    self.userObject.userName = response.data.username;
                    self.userObject.user_role = response.data.user_role;
                    console.log('UserService -- getStudent -- User Data: ', self.userObject.userName);
                } else {
                    console.log('UserService -- getStudent -- failure');
                    // user has no session, bounce them back to the login page
                    alert("You are not authorized to view this page");
                    $location.path("/home");
                }
            }, function (response) {
                console.log('UserService -- getStudent -- failure: ', response);
                alert("You are not authorized to view this page");
                $location.path("/home");
            });


        },

        self.logout = function () {
            console.log('UserService -- logout');
            $http.get('/api/user/logout').then(function (response) {
                console.log('UserService -- logout -- logged out');
                $location.path("/home");
                location.reload(true);
            });
        }

}]);