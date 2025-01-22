const express = require('express');
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const contactRoutes = require ("./routes/contact")
const authRoutes = require ("./routes/auth")
const categoryRoutes = require ("./routes/category")
dotenv.config()
const app = express();
const PORT =3000;

app.get("/",(req,res)=>{
    // res.send("DialUp, Streamline your contacts with sekani only")
    res.json({"message":"DialUp, Streamline your contacts with sekani only"})
})

// READING JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// API ROUTES
app.use("/api/contacts", contactRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT,() =>{
        console.log(`Server is running on http://localhost:${PORT} and DB is connected`)
    })
})
.catch((err) => console.log(err))


