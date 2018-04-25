myApp.controller('SignupController', ['UserService', '$location', 'SignupService', function (UserService, $location, SignupService) {
//  console.log('SignupController created');
  var self = this;
  self.userService = UserService;
  self.signupService = SignupService;
  self.userObject = UserService.userObject;
  self.id = UserService.userObject.id;
  self.disclaimer = SignupService.disclaimer;
  self.collectGeneral = SignupService.collectGeneral;
  self.collectGoals = SignupService.collectGoals;
  self.general = SignupService.general;
  self.collectBarriers = SignupService.collectBarriers;
  self.goals = SignupService.goals;
  self.collectExtraInfo = SignupService.collectExtraInfo;
  self.getSchools = SignupService.getSchools;

  function move() {
    var elem = document.getElementById("myBar"); 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            elem.style.width = width + '%'; 
        }
    }
}

}]);