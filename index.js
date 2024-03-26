import express from "express"
//import bodyParser from "body-parser"
import axios from "axios"
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"))

const API_URL = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "R3dg91bG35xplbDMJze6uQ==7aVmUA0ZCbm262tq";
let category;

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res) => {
    res.render("index.ejs")
})

app.post("/", async(req,res) => {

    switch (req.body.choice) {
        case "hope":
          category = "hope";
          break;
        case "best":
            category = "best";
          break;
        case "change":
            category = "change";
          break;
        case "dreams":
            category = "dreams";
          break;
        case "happiness":
            category = "happiness";
          break;
        case "faith":
            category = "faith";
          break;
        case "family":
            category = "family";
          break;
        case "success":
            category ="success";
          break;
        case "future":
            category ="future";
          break;
        default:
          break;
      }

    try {
        const result = await axios.get(API_URL+"?category="+category,{
            headers: {'X-Api-Key': API_KEY}
        })
        res.render("show.ejs",{quotes: JSON.stringify(result.data[0])})
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
        });
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

