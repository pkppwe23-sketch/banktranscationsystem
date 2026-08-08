const mongoose = require("mongoose")

function connectToDB(){
  //here database connect to mongoose
  mongoose.connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    serverSelectionTimeoutMS: 10000,
  })

  .then(()=>{
    console.log("server is connected to DB")
  })

  .catch(err=>{
    console.log("error connecting to DB:", err.message)
    process.exit(1)
  })

}

module.exports = connectToDB