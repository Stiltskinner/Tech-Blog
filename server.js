const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1800000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});
// Front end
// Need a homepage for the front end
// Need front end route for dashboard
// Need front end route for login page
// Need front end route to write a post and submit it. Front end route lets user see all their existing posts, update the, or write a new one.


// Back end
// Routes
// Need routes for home page to show blog posts
// Need api routes for blog post db. Blog posts need: title, contents, creator username, date created, option to leave comments.
// Need login api route
// Need sign up api route
// Need backend put route to update a post
// Need a logout route.
// Need logins to expire after a set amount of time.

// Need session and cookies to save loggedin status