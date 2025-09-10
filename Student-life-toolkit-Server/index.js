const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors({
  origin: 'https://student-life-toolkit-8hr7.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'X-Custom-Header', 'Authorization', 'Accept'],  
}));
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@practicecoffee.ru33usd.mongodb.net/?retryWrites=true&w=majority&appName=PracticeCoffee`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const scheduleCollection = client
      .db("studentToolkit")
      .collection("schedules");
    const QuestionCollection = client
      .db("studentToolkit")
      .collection("examPrep");
    const PlansCollection = client.db("studentToolkit").collection("plans");
    const BudgetCollection = client.db("studentToolkit").collection("budgets");
    const MotivationalQuotes = client.db("studentToolkit").collection("quotes");
    const TaskCollection = client.db("studentToolkit").collection("tasks");

    // insert schedule & show Schedule & delete schedule & Overview Schedule -------------------------------------------------------------
    app.post("/schedules", async (req, res) => {
      const schedule = req.body;
      const result = await scheduleCollection.insertOne(schedule);
      res.send(result);
    });
    app.get("/schedules", async (req, res) => {
      const result = await scheduleCollection.find().toArray();
      res.send(result);
    });
    app.get(`/schedules/:user`, async (req, res) => {
      const email = req.params.user;
      const query = { user: email };
      const result = await scheduleCollection.find(query).toArray();
      res.send(result);
    });
    app.delete(`/schedules/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await scheduleCollection.deleteOne(query);
      res.send(result);
    });
    // overview's schedule
    app.get(`/schedules/overview/:user`, async (req, res) => {
      const email = req.params.user;
      const query = { user: email };
      const result = await scheduleCollection.findOne(query);
      res.send(result);
    });

    // insert Budget & show budget & Delete budget -----------------------------------------------------------------------
    app.post("/budget", async (req, res) => {
      const budget = req.body;
      const result = await BudgetCollection.insertOne(budget);
      res.send(result);
    });
    app.get(`/budget/:user`, async (req, res) => {
      const email = req.params.user;
      const query = { user: email };
      const result = await BudgetCollection.find(query).toArray();
      res.send(result);
    });
    app.delete(`/budget/:user`, async (req, res) => {
      const email = req.params.user;
      const query = { user: email };
      const result = await BudgetCollection.deleteMany(query);
      res.send(result);
    });

    // ExamQuiz Cards Display --------------------------------------------------------------------------------------------
    app.get(`/examQ&A`, async (req, res) => {
      const result = await QuestionCollection.find().toArray();
      res.send(result);
    });

    // insert Plans & display Plans & delete Plans-----------------------------------------------------------------------
    app.post("/plans", async (req, res) => {
      const plan = req.body;
      const result = await PlansCollection.insertOne(plan);
      res.send(result);
    });
    app.get("/plans/:user", async (req, res) => {
      const email = req.params.user;
      const query = { user: email };
      const result = await PlansCollection.find(query).toArray();
      res.send(result);
    });
    app.delete(`/plans/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await PlansCollection.deleteOne(query);
      res.send(result);
    });

    // Overview's Plan----------------------------------------------------------------------------------------------------
    // Motivational Quotes Display ---------------------------
    app.get(`/quotes/random`, async (req, res) => {
      const result = await MotivationalQuotes.aggregate([
        { $sample: { size: 1 } },
      ]).toArray();
      res.send(result);
    });
    //  Tasks Post & Display & Delete Task -------------------
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await TaskCollection.insertOne(task);
      const insertedTask = {
        _id: result.insertedId,
        note: task.note,
        user: task.user,
      };
      res.send(insertedTask);
    });
    app.get(`/tasks/:user`, async (req, res) => {
      const email = req.params.user;
      const query = { user: email };
      const result = await TaskCollection.find(query).toArray();
      res.send(result);
    });
    app.delete(`/tasks/:id`, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await TaskCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Student Life Toolkit Server");
});
app.get('/test', (req, res) => {
  res.send('Test route working!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


module.exports = app;