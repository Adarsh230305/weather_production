import dotenv from "dotenv"
import express from 'express';
import cors from 'cors';
dotenv.config({path:'\.env'})
const app=express();
app.use(cors());
const port =process.env.PORT||3000;
app.get("/api/weather", async (req, res) => {
    try {
        const city = req.query.city;
        if (!city) {
            return res.status(400).json({
                message: "City is required"
            });
        }
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`
        );
        const data = await response.json();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
},)