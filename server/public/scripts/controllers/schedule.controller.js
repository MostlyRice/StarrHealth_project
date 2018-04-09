myApp.controller('ScheduleController', ['$http', function($http) {
    console.log('ScheduleController created');
    let self = this;
    self.postAvailability;
    self.coachTimes = {list: []};
    self.coachAppointments = {list: []};

    self.postAvailability = function(schedule){
        console.log('post availability', schedule);
        $http({
            method: 'POST',
            url: '/calendar/coach',
            data: schedule
        })
        .then(function(response) {
            console.log('rating added', response);
        }).catch(function(error) {
            console.log('add rating error', error);
        })
    }

    self.getCoachTimes = function(){
        $http.get('/calendar/availability')
        .then(function(response) {
            console.log('times get', response.data);
        let responseArray = response.data.filter(function(res){ 
            if(res.student_id == null){
            return res.available_time}});
        self.coachTimes.list = responseArray.map(res => res.available_time);
        let appointmentArray = response.data.filter(function(res){
            return res.student_id != null
        })
        self.coachAppointments.list = appointmentArray.map(res => res.available_time);
        }).catch(function(error){
            console.log('Error getting times', error);
        })
    }

    self.postStudentSchedule = function(studentAppointment){
        console.log('student appointment', studentAppointment);
        $http({
            method: 'PUT',
            url: '/calendar/student',
            data: studentAppointment
        })
        .then(function(response) {
            console.log('studend appointment added', response);
        }).catch(function(error) {
            console.log('student appointment error', error);
        })
    }

    self.getCoachTimes();
  }]);