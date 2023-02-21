const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://db_admin:obTIc8MrMOnPXrk4@cluster0.wvuwslc.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const serviceCollection = client
      .db("doctors-portal")
      .collection("services");

    app.get("/service", async (req, res) => {
      // const query = {};
      // const cursor = serviceCollection.find(query);
      // const services = await cursor.toArray();
      // const result = await serviceCollection.find({}).toArray();
      const result = await serviceCollection.find({});
      const services = await result.toArray();
      res.send(services);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello from doctor's portal");
});

app.listen(port, () => {
  console.log(`Doctor's portal app listening on port ${port}`);
});
