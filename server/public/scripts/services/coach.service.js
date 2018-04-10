myApp.service('CoachService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('CoachService Loaded');
    var self = this;

    self.coachDir = function() {
        $location.path('/admin_home');
    }

    self.collectCoach = function(coach) {
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
          } else if (user.passwordOne === '' || user.passwordTwo === '' ) {
            alert("Choose a password!");
          } else if (user.passwordOne != user.passwordTwo) {
            alert("Passwords do not match!");
          } else if (user.passwordOne === user.passwordTwo) {
            user.password = user.passwordOne;
            console.log('sending to server...', user);
            $http.post('/api/user/register', user).then(function (response) {
              console.log('success');
            },
              function (response) {
                console.log('error');
                alert("Something went wrong. Please try again.")
              });
          } else {
              alert("Something went wrong. Please try again.")
          }
    }



}]); // end coach service