myApp.controller('MatchController', ['UserService', '$location', 'SignupService', function(UserService, $location, SignupService) {
    console.log('MatchController created');
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

    console.log(self.allCoaches.list);



  }]);