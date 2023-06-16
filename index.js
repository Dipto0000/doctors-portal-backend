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
    const bookingCollection = client
      .db("doctors-portal")
      .collection("bookings");

    app.get("/service", async (req, res) => {
      const result = await serviceCollection.find({});
      const services = await result.toArray();
      res.send(services);
    });
    // a post api for bookings
    app.post("/booking", async (req, res) => {
      const booking = req.body;
      const query = {treatment: booking.treatment, date: booking.date, patient: booking.patient };
      const exists = await bookingCollection.findOne(query);
      if (exists) {
        return res.send({ success: false, booking: exists });
      }
      const result = await bookingCollection.insertOne(booking);
      return res.send({ success: true, result });
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
