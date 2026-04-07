import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const checkSagar = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        const db = conn.connection.useDb('Sagar_Graphics');
        const collections = await db.db.listCollections().toArray();
        
        console.log("DB: Sagar_Graphics");
        for (const coll of collections) {
            const count = await db.db.collection(coll.name).countDocuments();
            console.log(`  -> Collection ${coll.name} has ${count} documents.`);
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
};

checkSagar();
