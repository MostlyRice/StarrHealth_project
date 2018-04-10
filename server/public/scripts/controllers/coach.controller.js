myApp.controller('CoachController', ['$http', 'UserService', '$location', 'CoachService', function($http, UserService, $location, CoachService) {
    console.log('CoachController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;
    self.coachDir = CoachService.coachDir;
    self.collectCoach = CoachService.collectCoach;



}]);