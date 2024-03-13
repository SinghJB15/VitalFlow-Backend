const { error } = require("console");
const mongoose = require("mongoose");
const MONGOURL = process.env.MONGOURL

mongoose.connect(MONGOURL+"VitalFlow", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
.on('open',()=>{console.log('Connected')})
.on('close',()=>{console.log('disconected')})
.on('error',(error)=>{console.log(error)})

module.exports={
    Users: require("./Users")
}