import dns from "dns";
import app from "./app.js";

dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv"; 
import connectDB from "./config/db.config.js";



dotenv.config({
    path:'./.env'
});

connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;  
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log("DB connection error", err);
    process.exit(1);
});