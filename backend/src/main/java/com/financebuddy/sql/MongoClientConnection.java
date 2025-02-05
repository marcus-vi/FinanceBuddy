package com.financebuddy.sql;

import com.mongodb.ConnectionString;
import com.mongodb.MongoException;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoClientConnection {
    private static final String URI = "mongodb://localhost:27017";
    private static final MongoClient mongoClient;
    private static final MongoDatabase database;

    static {
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .build();

        mongoClient = MongoClients.create(
                com.mongodb.MongoClientSettings.builder()
                        .applyConnectionString(new ConnectionString(URI))
                        .serverApi(serverApi)
                        .build()
        );

        database = mongoClient.getDatabase("teste");
    }

    public static MongoDatabase getDatabase() {
        return database;
    }

    public static void testConnection() {
        try {
            database.runCommand(new org.bson.BsonDocument("ping", new org.bson.BsonInt64(1)));
            System.out.println("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (MongoException e) {
            System.err.println("Error connecting to MongoDB: " + e.getMessage());
        }
    }
}
