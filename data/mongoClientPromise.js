import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONNECTION_STRING;

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global;

  if (!globalWithMongo._mongoClient) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    globalWithMongo._mongoClient = client;
  }
  clientPromise = globalWithMongo._mongoClient.connect();
} else {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

export default clientPromise;
