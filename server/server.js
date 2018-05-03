const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twilio = require('twilio');

let env = require('dotenv');
env.config();

const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session-middleware');

// Route includes
const userRouter = require('./routes/user.router');
const studentRouter = require('./routes/student.router');
const coachRouter = require('./routes/coach.router');
const adminRouter = require('./routes/admin.router');
const calendarRouter = require('./routes/calendar.router');
const pathRouter = require('./routes/path.router');
const barriersRouter = require('./routes/barriers.router');
const matchRouter = require('./routes/match.router');
const smsRouter = require('./routes/sms.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Filestack key call
const FILESTACK_KEY = process.env.FILESTACK_KEY;
app.get('/filestack-key', (req, res) => {
    res.send(FILESTACK_KEY);
})

//Twilio Key
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
app.get('/twilio-key', (req, res) => {
    res.send(ACCOUNT_SID, AUTH_TOKEN);
})


// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/student', studentRouter);
app.use('/coach', coachRouter);
app.use('/admin', adminRouter);
app.use('/calendar', calendarRouter);
app.use('/path', pathRouter);
app.use('/barriers', barriersRouter);
app.use('/match', matchRouter);
app.use('/sms', smsRouter);

// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 3000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});