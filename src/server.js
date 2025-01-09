const express = require('express');
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const PORT =3000;

app.get("/",(req,res)=>{
    // res.send("DialUp, Streamline your contacts with sekani only")
    res.json({"message":"DialUp, Streamline your contacts with sekani only"})
})

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT,() =>{
        console.log(`Server is running on http://localhost:${PORT} and DB is connected`)
    })
})
.catch((err) => console.log(err))


