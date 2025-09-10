const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://student-life-toolkit-8hr7.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Custom-Header', 'Authorization', 'Accept'],
}));
app.use(express.json());

// MongoDB Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@practicecoffee.ru33usd.mongodb.net/?retryWrites=true&w=majority&appName=PracticeCoffee`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Initialize MongoDB connection and routes
let db; // Store the database connection
async function initialize() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
    db = client.db("studentToolkit");

    // Define collections
    const scheduleCollection = db.collection("schedules");
    const QuestionCollection = db.collection("examPrep");
    const PlansCollection = db.collection("plans");
    const BudgetCollection = db.collection("budgets");
    const MotivationalQuotes = db.collection("quotes");
    const TaskCollection = db.collection("tasks");

    // Routes
    app.get('/test', (req, res) => {
      res.send('Test route working!');
    });

    // Insert schedule & show Schedule & delete schedule & Overview Schedule
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

    app.get(`/schedules-overview/:user`, async (req, res) => {
      const email = req.params.user;
      const query = { user: email };
      const result = await scheduleCollection.findOne(query);
      res.send(result || {});
    });

    // Insert Budget & show budget & Delete budget
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

    // ExamQuiz Cards Display
    app.get(`/examQ&A`, async (req, res) => {
      const result = await QuestionCollection.find().toArray();
      res.send(result);
    });

    // Insert Plans & display Plans & delete Plans
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

    // Motivational Quotes Display
    app.get(`/quotes/random`, async (req, res) => {
      const result = await MotivationalQuotes.aggregate([{ $sample: { size: 1 } }]).toArray();
      res.send(result[0] || {});
    });

    // Tasks Post & Display & Delete Task
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

    // Ping MongoDB to confirm connection
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; // Ensure errors are caught in Vercel logs
  }
}

// Export handler for Vercel serverless
module.exports = async (req, res) => {
  if (!db) {
    await initialize(); // Initialize MongoDB and routes on first request
  }
  return app(req, res); // Handle the request with Express
};

// Optional: Keep app.listen for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}