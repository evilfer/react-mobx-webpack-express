const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const loadSettings = require("./loadSettings");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const initMessageRoutes = require("./routes/message");
const initApiCatchAll = require("./routes/api-catchall");


const settings = loadSettings();

const staticIndexFile = path.join(settings.frontendStaticFiles, 'index.html');

const app = express();

app.use(bodyParser.json());
app.use(expressSession({
  secret: settings.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.use(morgan('combined'));
app.use(helmet());
app.use(compression());

initMessageRoutes(app);
initApiCatchAll(app);

app.use(express.static(settings.frontendStaticFiles));

app.get('*', (req, res) => {
  res.sendFile(staticIndexFile);
});

app.listen(settings.port, () => console.log(`Listening on port ${settings.port}!`));
