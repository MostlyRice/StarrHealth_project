myApp.controller('LoginController', ['$http', '$location', 'UserService', 'SignupService', function ($http, $location, UserService, SignupService) {
  console.log('LoginController created');
  var self = this;
  self.userService = UserService;
  self.signupService = SignupService;
  self.id = UserService.userObject.id;
  self.disclaimer = SignupService.disclaimer;

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
    //  console.log('sending to server...', self.user);
      $http.post('/api/user/login', self.user).then(
        function (response) {
          if (response.status == 200) {
          //  console.log('success: ', response.data);
            // location works with SPA (ng-route)
            self.determineUser(self.user);
          } else {
          //  console.log('failure error: ', response);
            self.message = "Incorrect credentials. Please try again.";
          }
        },
        function (response) {
         // console.log('failure error: ', response);
          self.message = "Incorrect credentials. Please try again.";
        });
    }
  };

  self.registerUser = function () {
    if (self.user.username === '') {
      self.message = "Choose a username!";
    } else if (self.user.passwordOne === '' || self.user.passwordTwo === '') {
      self.message = "Choose a password!";
    } else if (self.user.passwordOne != self.user.passwordTwo) {
      self.message = "Passwords do not match!";
    } else if (self.user.passwordOne === self.user.passwordTwo) {
      self.user.password = self.user.passwordOne;
     // console.log('sending to server...', self.user);
      $http.post('/api/user/register', self.user).then(function (response) {
        //  console.log('success');
          let user = self.user;
          self.newLogin(user);
        },
        function (response) {
        //  console.log('error');
          self.message = "Something went wrong. Please try again."
        });
    } else {
      self.message = "Something went wrong. Please try again."
    }
  } // end register user

  self.newLogin = function (user) {
   // console.log('sending to server...', user);
    $http.post('/api/user/login', user).then(
      function (response) {
        if (response.status == 200) {
        //  console.log('success: ', response.data);
          // location works with SPA (ng-route)
          self.disclaimer();
        } else {
        //  console.log('failure error: ', response);
          self.message = "Incorrect credentials. Please try again.";
        }
      },
      function (response) {
       // console.log('failure error: ', response);
        self.message = "Incorrect credentials. Please try again.";
      });
  }; // end newLogin

  self.determineUser = function (user) {
    const name = user.username;
    $http({
      method: 'GET',
      url: `/path/${name}`
    }).then(function (response) {
      const id = response.data[0].id;
      const role = response.data[0].user_role;
      self.determineRole(id, role);
    }).catch(function (error) {
     // console.log('Error getting data', error);
    })
  } // end determineUser

  self.determineRole = function (id, role) {
    if (role === 4) {
      $location.url('/super_AdminHome');
    } else if (role === 3) {
      $location.url('/admin_Home');
    } else if (role === 2) {
      $location.url('/coach_Home');
    } else if (role === 1) {
      self.determineStudent(id, role);
    } else {
      self.message = "Something went wrong. Please try again."
      $location.url('/home');
    }
  } // end determineRole

  self.determineStudent = function (id, role) {
    $http({
      method: 'GET',
      url: `/path/student/${id}`
    }).then(function (response) {
      const student = response.data[0];
      if (student.first_name === null || student.date_of_birth === null || student.email === null || student.phone_number === null || student.school_code === null || student.school_name === null) {
        $location.url('/general_info');
      } else if (student.primary_goal === null) {
        $location.url('/student_goals');
      } else if (student.other_professionals === null || student.other_information === null) {
        $location.url('/additional_info');
      } else if (student.coach_id === null) {
        $location.url('/student_coaches');
      } else if (student.coach_id != null) {
        $location.url('/student_home');
      } else {
        self.message = "Something went wrong. Please contact the administrator."
        $location.url('/home');
      }
    }).catch(function (error) {
    //  console.log('Error getting data', error);
    })

  } // end determineStudent

}]); // end controller