<header class="ng-cloak" hide-gt-md ng-include="'/views/partials/header.html'"></header>

<div class="ng-cloak" layout="column" layout-fill>

    <section layout="row" flex>
        <!-- Start md-sidenav -->
        <md-sidenav class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia('gt-md')" md-whiteframe="4">
            <div class="starr-sidenav">
                <img ng-src="./images/starrhealthlogo.png" />
                <p class="starr-sidenav-text">Starr Health Co.</p>
                <h1 class="lead">Welcome {{vm.userObject.userName}}!</h1>
            </div>
            <md-content layout-padding hide show-gt-md flex>
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminHome()">
                    <i class="material-icons home">home</i>
                    <span>Home Page</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminCreateCoach()">
                    <i class="material-icons note-add">note_add</i>
                    <span>Admin - Add Coach</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary selectedBtn" flex ng-click="vm.superAdminNewSchool()">
                    <i class="material-icons note-add">note_add</i>
                    <span>Admin - Add School</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminStudentDirectory()">
                    <i class="material-icons list">list</i>
                    <span>Admin - Student Directory</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superCoachDirectory()">
                    <i class="material-icons list">list</i>
                    <span>Admin - Coach Directory</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminSchoolDirectory()">
                    <i class="material-icons list">list</i>
                    <span>Admin - School Directory</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminAllAppointments()">
                    <i class="material-icons date-range">date_range</i>
                    <span>Admin - All Appointments</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminCoachSchedule()">
                    <i class="material-icons date-range">date_range</i>
                    <span>Coach - Schedule</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminCoachAllAppointments()">
                    <i class="material-icons date-range">date_range</i>
                    <span>Coach - All Appointments</span>
                </md-button>
                <br />
                <md-button class="md-raised md-warn" flex ng-click="vm.userService.logout()">
                    <i class="material-icons exit-app">exit_to_app</i>
                    <span>Log Out</span>
                </md-button>
            </md-content>
            <md-content layout-padding hide-gt-md flex>
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminHome()">
                    <i class="material-icons home">home</i>
                    <span>Home Page</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminCreateCoach()">
                    <i class="material-icons note-add">note_add</i>
                    <span>Admin - Add Coach</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary selectedBtn" flex ng-click="vm.superAdminNewSchool()">
                    <i class="material-icons note-add">note_add</i>
                    <span>Admin - Add School</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminStudentDirectory()">
                    <i class="material-icons list">list</i>
                    <span>Admin - Student Directory</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superCoachDirectory()">
                    <i class="material-icons list">list</i>
                    <span>Admin - Coach Directory</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminSchoolDirectory()">
                    <i class="material-icons list">list</i>
                    <span>Admin - School Directory</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminAllAppointments()">
                    <i class="material-icons date-range">date_range</i>
                    <span>Admin - All Appointments</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminCoachSchedule()">
                    <i class="material-icons date-range">date_range</i>
                    <span>Coach - Schedule</span>
                </md-button>
                <br />
                <md-button class="md-raised md-primary" flex ng-click="vm.superAdminCoachAllAppointments()">
                    <i class="material-icons date-range">date_range</i>
                    <span>Coach - All Appointments</span>
                </md-button>
                <br />
                <md-button class="md-raised md-warn" flex ng-click="vm.userService.logout()">
                    <i class="material-icons exit-app">exit_to_app</i>
                    <span>Log Out</span>
                </md-button>
            </md-content>
        </md-sidenav>
        <!-- End md-sidenav -->
        <div class="overflow-1" flex layout="row" layout-align="center center">
            <!-- Start Add New School Card -->
            <md-content flex class="content-element content-element-text" layout="column" layout-align="center center" ng-controller="SchoolController as ss">
                <div flex class="div-element" layout="column" layout-align="center center">
                    <md-card flex class="card-element md-padding">
                        <h2 class="create-school-title">New School</h2>
                    </md-card>
                    <md-card flex class="card-element md-padding" layout="column" layout-align="center center">
                        <div layout-gt-sm="row">
                            <md-input-container flex>
                                <label class="blackLabel" for="schoolName">School Name:</label>
                                <input type="text" name="schoolName" ng-model="ss.schoolInfo.school_name">
                            </md-input-container>
                        </div>
                        <div layout-gt-sm="row">
                            <md-input-container flex>
                                <label class="blackLabel" for="schoolCodeOne">School Code:</label>
                                <input type="text" name="schoolCodeOne" ng-model="ss.schoolInfo.school_codeOne">
                            </md-input-container>
                            <md-input-container flex>
                                <label class="blackLabel" for="schoolCodeTwo">Confirm School Code:</label>
                                <input type="text" name="schoolCodeTwo" ng-model="ss.schoolInfo.school_codeTwo">
                            </md-input-container>
                        </div>
                        <div layout-gt-sm="row">
                            <md-input-container flex>
                                <label class="blackLabel overflow" for="accounts">Number of Student Accounts:</label>
                                <input type="text" name="accounts" ng-model="ss.schoolInfo.total_accounts">
                            </md-input-container>
                            <md-input-container>
                                <label class="blackLabel overflow" for="sessions">Number of Sessions per Student:</label>
                                <input type="text" name="sessions" ng-model="ss.schoolInfo.student_sessions">
                            </md-input-container>
                        </div>
                        <md-container>
                            <md-button class="md-raised md-primary defaultBtn" ng-click="ss.addSchool(ss.schoolInfo)">Add School</md-button>
                        </md-container>
                    </md-card>
                </div>
            </md-content>
            <!-- End Add New School Card -->
        </div>

    </section>

</div>
