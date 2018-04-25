myApp.service('AdminService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
  //  console.log('AdminService Loaded');
    var self = this;
    self.allSchools = {
        list: []
    }
    self.allCoaches = {
        list: []
    }
    self.allStudents = {
        list: []
    }
    
    self.allAppts = {
        list: []
    }

    self.adminHome = function () {
        $location.path('/admin_Home');
    }
    self.adminCreateCoach = function () {
        $location.path('/admin_CreateCoach');
    }
    self.adminNewSchool = function () {
        $location.path('/admin_NewSchool');
    }

    self.adminStudentDirectory = function () {
        $location.path('/admin_StudentDirectory');
    }
    self.adminCoachDirectory = function () {
        $location.path('/admin_CoachDirectory');
    }
    self.adminSchoolDirectory = function () {
        $location.path('/admin_SchoolDirectory');
    }

    self.adminAllApointments = function () {
        $location.path('/admin_AllApointments');
    }

    self.coachDir = function () {
        $location.path('/admin_Home');
    }

    self.getSchools = function() {
        $http({
            method: 'GET',
            url: `/admin/schools`
        }).then(function (response) {
            self.allSchools.list = response.data;
        }).catch(function (error) {
          //  console.log('get schools error');
        })
    }

    self.getCoaches = function() {
        $http({
            method: 'GET',
            url: `/admin/coaches`
        }).then(function (response) {
            self.allCoaches.list = response.data;
        }).catch(function (error) {
        })
    }

    self.getStudents = function() {
        $http({
            method: 'GET',
            url: `/admin/students`
        }).then(function (response) {
            self.allStudents.list = response.data;
        }).catch(function (error) {
          //  console.log('get all students error');
        })
    }

    self.getAppts = function() {
        $http({
            method: 'GET',
            url: `/admin/appts`
        }).then(function (response) {
            self.allAppts.list = response.data;
        }).catch(function (error) {
           // console.log('get all Appts error');
        })
    }

    self.deleteCoach = function(id) {
        $http({
            method: 'DELETE',
            url: `/admin/remove/coach/${id}`
        }).then(function (response) {
            self.getCoaches();
        }).catch(function (error) {
          //  console.log('delete error');
        })
    }

    self.deleteStudent = function(id) {
        $http({
            method: 'DELETE',
            url: `/admin/remove/student/${id}`
        }).then(function (response) {
            self.getStudents();
        }).catch(function (error) {
          //  console.log('delete error');
        })
    }


}]); // end Admin service