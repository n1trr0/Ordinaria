import { MongoClient } from "mongodb";

const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {throw new Error("Mongo URL not found")};

const Client = new MongoClient(MONGO_URL);
await Client.connect();
console.info("Client connected");

const db = Client.db("Ordinaria"); 







/*
const server = new ApolloServer({typeDefs: schema, resolvers,});
const { url } = await startStandaloneServer(server, {
  context: async () => (await { Collection }),
  listen: { port: 8080 }
});
console.info(`Server ready at ${url}`);*/