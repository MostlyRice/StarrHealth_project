myApp.controller('AddCoachController', ['$http', 'UserService', '$location', 'AddCoachService', function ($http, UserService, $location, AddCoachService) {
   // console.log('AddCoachController created');
    var self = this;
    self.userService = UserService;
    self.addCoachService = AddCoachService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;

    self.addCoach = AddCoachService.addCoach;
    self.specialties = AddCoachService.specialties;
    self.jobs = AddCoachService.jobs;

    AddCoachService.getSpecialties();
    AddCoachService.getJobs();


}]);