myApp.controller('NewController', ['UserService', '$location', 'SignupService', 'StudentService', function (UserService, $location, SignupService, StudentService) {
  //  console.log('NewController created');
    var self = this;
    self.userService = UserService;
    self.signupService = SignupService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;
    self.letPass = SignupService.letPass;
    self.disclaimer = SignupService.disclaimer;
    self.collectGeneral = SignupService.collectGeneral;
    self.collectGoals = SignupService.collectGoals;
    self.general = SignupService.general;
    self.collectBarriers = SignupService.collectBarriers;
    self.goals = SignupService.goals;
    self.collectExtraInfo = SignupService.collectExtraInfo;
    self.barriers = SignupService.barriers;
    self.allCoaches = SignupService.allCoaches;
    self.viewCoach = SignupService.viewCoach;
    self.myCoach = SignupService.myCoach;
    self.specialties = SignupService.specialties;
    self.thisCoach = SignupService.thisCoach;
    self.studentCoach = SignupService.studentCoach;
    self.back = SignupService.back;
    self.late = StudentService.late;
  
    SignupService.getMyCoach(); 
    

  }]);