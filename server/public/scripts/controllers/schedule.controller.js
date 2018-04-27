myApp.controller('ScheduleController', ['$http', 'ScheduleService', 'UserService', function ($http, ScheduleService, UserService) {
 // console.log('ScheduleController created');
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
 //runs function that gets coaches' availability on today's date on page load

  self.postStudentSchedule = ScheduleService.postStudentSchedule;
  self.back = ScheduleService.back;

  self.getCoachAppointments();
  //runs function on page load to get coaches appointments that students have scheduled
}]);