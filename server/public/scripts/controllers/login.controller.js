myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    console.log('LoginController created');
    var self = this;
    self.userService = UserService;
    
   

    self.user = {
      username: '',
      password: '',
      passwordOne: '',
      passwordTwo: '',
      user_role: 1
    };
    self.message = '';

    self.login = function () {
      if (self.user.username === '' || self.user.password === '') {
        self.message = "Enter your username and password!";
      } else {
       console.log('sending to server...', self.user);
        $http.post('/api/user/login', self.user).then(
          function (response) {
            if (response.status == 200) {
              console.log('success: ', response.data);
              // location works with SPA (ng-route)
              self.determineUser(self.user);
            } else {
              console.log('failure error: ', response);
              self.message = "Incorrect credentials. Please try again.";
            }
          },
          function (response) {
            console.log('failure error: ', response);
            self.message = "Incorrect credentials. Please try again.";
          });
      }
    };

    self.registerUser = function () {
      if (self.user.username === '') {
        self.message = "Choose a username!";
      } else if (self.user.passwordOne === '' || self.user.passwordTwo === '' ) {
        self.message = "Choose a password!";
      } else if (self.user.passwordOne != self.user.passwordTwo) {
        self.message = "Passwords do not match!";
      } else if (self.user.passwordOne = self.user.passwordTwo) {
        self.user.password = self.user.passwordOne;
        console.log('sending to server...', self.user);
        $http.post('/api/user/register', self.user).then(function (response) {
          console.log('success');
          $location.path('/home');
        },
          function (response) {
            console.log('error');
            self.message = "Something went wrong. Please try again."
          });
      } else {
          self.message = "Something went wrong. Please try again."
      }
    } // end register user



    self.determineUser = function(user) {
      console.log('DU', user);
      const name = user.username;
      console.log(name);
      $http({
        method: 'GET',
        url: `/path/${name}`
      }).then(function(response){
        console.log(response.data);
        const id = response.data[0].id;
        const role = response.data[0].user_role;
        console.log('my id is: ', id);
        console.log('my role is: ', role);
        self.determineRole(id, role);
      }).catch(function(error){
        console.log('Error getting data', error);
      })
    } // end determineUser

    self.determineRole = function(id, role) {
      console.log('DR', id, role);
      if (role === 4) {
        $location.url('/julia_home');
      } else if (role === 3) {
        $location.url('/admin_home');
      } else if (role === 2) {
        $location.url('/coach_home');
      } else if (role === 1) {
        $location.url('/student_home');
      } else {
        self.message = "Something went wrong. Please try again."
        $location.url('/home');
      }
    } // end determineRole

    self.determinePath = function(id, role) {
      console.log('DP', id, role);
      $location.url('/user');

    } // end determinePath

}]); // end controller
