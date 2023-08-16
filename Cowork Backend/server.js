const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();
const authRoute=require("./routes/users")
const amnetiesRoute=require("./routes/amneties");
const memberRoute=require("./routes/members");
const PropertyRoute=require("./routes/property");
const quotationsRoute=require("./routes/quotations");
const subscribersRoute=require("./routes/subscribers");


app.use(cors());
app.use(bodyParser({extended:true}))

mongoose.connect("mongodb+srv://muhammadAli:Journey!24@cluster0.qci00.mongodb.net/coWork?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res=>{
   console.log("connected")
}).catch(err=>{
   console.log("err")
})

app.use("/api",amnetiesRoute)
app.use("/api",PropertyRoute)
app.use("/api",memberRoute)
app.use("/api",authRoute)
app.use("/api",quotationsRoute)
app.use("/api",subscribersRoute)

app.listen(5000,()=>console.log("listening on port 5000"))



