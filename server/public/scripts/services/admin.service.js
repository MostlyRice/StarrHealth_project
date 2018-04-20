myApp.service('AdminService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('AdminService Loaded');
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
            console.log('DATA', response.data);
            self.allSchools.list = response.data;
            console.log('All Schools = ', self.allSchools.list);
        }).catch(function (error) {
            console.log('get schools error');
        })
    }

    self.getCoaches = function() {
        $http({
            method: 'GET',
            url: `/admin/coaches`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.allCoaches.list = response.data;
            console.log('All Coaches = ', self.allCoaches.list);
        }).catch(function (error) {
            console.log('get all coaches error');
        })
    }

    self.getStudents = function() {
        $http({
            method: 'GET',
            url: `/admin/students`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.allStudents.list = response.data;
            console.log('All Students = ', self.allStudents.list);
        }).catch(function (error) {
            console.log('get all students error');
        })
    }

    self.deleteCoach = function(id) {
        $http({
            method: 'DELETE',
            url: `/admin/remove/coach/${id}`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.getCoaches();
        }).catch(function (error) {
            console.log('delete error');
        })
    }

    self.deleteStudent = function(id) {
        $http({
            method: 'DELETE',
            url: `/admin/remove/student/${id}`
        }).then(function (response) {
            console.log('DATA', response.data);
            self.getStudents();
        }).catch(function (error) {
            console.log('delete error');
        })
    }


}]); // end Admin service