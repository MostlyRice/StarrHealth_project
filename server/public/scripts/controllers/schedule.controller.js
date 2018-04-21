myApp.controller('ScheduleController', ['$http', 'ScheduleService', 'UserService', function ($http, ScheduleService, UserService) {
  console.log('ScheduleController created');
  let self = this;
  self.postAvailability = ScheduleService.postAvailability;

  self.coachAppointments = ScheduleService.coachAppointments;
  self.getCoachAppointments = ScheduleService.getCoachAppointments;

  self.coachTimes = ScheduleService.coachTimes;
  self.getCoachTimes = ScheduleService.getCoachTimes;

  self.postCalendar = ScheduleService.postCalendar;
  self.getCoachSchedule = ScheduleService.getCoachSchedule;

  self.schedule = ScheduleService.schedule;

  self.studentAppointment = {};
  self.studentAppointment.date = new Date();
  self.getCoachTimes(self.studentAppointment.date);

  self.postStudentSchedule = ScheduleService.postStudentSchedule;

  // self.getCoachTimes();
  self.getCoachAppointments();

}]);