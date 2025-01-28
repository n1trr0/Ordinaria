import { MongoClient } from "mongodb";
//deno add npm:@apolloserver
//deno add npm:graphql
const MONGO_URL = Deno.env.get("MONGO_URL");
if (!MONGO_URL) {throw new Error("Mongo URL not found")};

const Client = new MongoClient(MONGO_URL);
await Client.connect();
console.info("Client connected");

const db = Client.db("Ordinaria"); 

//APIREST
/*
const handler = async (req: Request): Promise<Response> => {
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;

  if(method === "GET"){
    
  }else if(method === "POST"){

  }else if(method === "PUT"){

  }else if(method === "DELETE"){

  }
  return new Response("Endpoint not found", {status: 404});
}

Deno.serve({port:3000}, handler);
*/

//


/*
const server = new ApolloServer({typeDefs: schema, resolvers,});
const { url } = await startStandaloneServer(server, {
  context: async () => (await { Collection }),
  listen: { port: 8080 }
});
console.info(`Server ready at ${url}`);*/