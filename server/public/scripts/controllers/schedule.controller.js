myApp.controller('ScheduleController', ['$http', 'ScheduleService', 'UserService', function($http, ScheduleService, UserService) {
    console.log('ScheduleController created');
    let self = this;
    self.postAvailability = ScheduleService.postAvailability;

    self.coachAppointments = ScheduleService.coachAppointments;
    self.getCoachAppointments = ScheduleService.getCoachAppointments;

    self.coachAppointments = ScheduleService.coachAppointments;
    self.getCoachTimes = ScheduleService.getCoachTimes;

    self.postStudentSchedule = ScheduleService.postStudentSchedule;

    self.getCoachTimes();
    self.getCoachAppointments();
  }]);