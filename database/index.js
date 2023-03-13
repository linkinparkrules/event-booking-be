const {MongoClient} = require("mongodb");

const db = {};
const connectToDb = () => {
  const client = new MongoClient("mongodb://nghiacao1997:Linkinpark1@ac-rndsoob-shard-00-00.pbpfsmp.mongodb.net:27017,ac-rndsoob-shard-00-01.pbpfsmp.mongodb.net:27017,ac-rndsoob-shard-00-02.pbpfsmp.mongodb.net:27017/?ssl=true&replicaSet=atlas-7ziilu-shard-0&authSource=admin&retryWrites=true&w=majority");
  client.connect(async () => {
    console.log("DB connected");
    const database = await client.db("Event_Booking");
    db.contact = database.collection("User");
  });
};

module.exports = {db, connectToDb};