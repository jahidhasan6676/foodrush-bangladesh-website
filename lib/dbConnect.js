const { MongoClient, ServerApiVersion } = require("mongodb");

export const collectionNameObj = {
    userCollection: "users"
};

export default function dbConnect(collectionName) {
    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db('foodrush').collection(collectionName);
}