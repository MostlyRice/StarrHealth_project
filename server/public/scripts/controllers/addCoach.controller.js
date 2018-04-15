myApp.controller('AddCoachController', ['$http', 'UserService', '$location', 'AddCoachService', function($http, UserService, $location, AddCoachService) {
    console.log('AddCoachController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;

    self.coachDir = AddCoachService.coachDir;
    self.addCoach = AddCoachService.addCoach;
}]);