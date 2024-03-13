require("dotenv").config()
const {PORT} = process.env
//requirements
const express = require("express")
const app = express()
const cors = require("cors")
const session = require("express-session")
const dataBase = require("./models/index")
const routes = require("./routes/index.js")
const MongoStore = require("connect-mongo")
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}
//Middlewear
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors(corsOptions))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        collectionName: "vitalflow-sessions"
    }),
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use('/', routes);
app.use((req, res) => {res.status(404).json({message: "this is not a proper route"})})

app.listen(PORT, ()=> {
    console.log("Listening on PORT: ", PORT)
})
