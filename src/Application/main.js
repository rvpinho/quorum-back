const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 3000;

const apiRouter = express.Router();
apiRouter.get("/", (req, res) => {
  res.send("Welcome TEST");
});


app.use(cors());


//Users

const usersRoutes = require('../Controller/UserController');
app.use('/api/users', usersRoutes);

//Events

const eventRoutes = require('../Controller/EventController');
app.use('/api/events', eventRoutes);


//events people

const eventPeopleRoutes = require('../Controller/EventPeopleController');
app.use('/api/eventPeople', eventPeopleRoutes);



app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
