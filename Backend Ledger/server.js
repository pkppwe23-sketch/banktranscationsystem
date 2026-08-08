// we made server in app.js but start server here
//t9Jebv1YTBNSQhtM

//why here require used not import 
//reason is earlier ,companies made their server on require so most of chance that the company which you going to serve has server made on require so.
//https://github.com/ankurdotio/Difference-Backend-video/tree/main/026-nodemailer
//https://developers.google.com/oauthplayground/?iss=https://accounts.google.com&code=4/0AXEQxIAwLzreaSRT8VxIDx5zC4zO_pdQnMH2CeKSnfROPnrCafXiND6PzHJ889icr7ZUnQ&scope=https://mail.google.com/
//https://console.cloud.google.com/auth/clients/create?previousPage=%2Fapis%2Fcredentials%3Fproject%3Dbackend-ledger-503106%26supportedpurview%3Dproject&project=backend-ledger-503106&supportedpurview=project
//https://console.cloud.google.com/auth/audience?project=backend-ledger-503106

require("dotenv").config()



const app = require("./src/app")
const connectToDB = require("./src/config/db")

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);


connectToDB()



//here we start server
app.listen(3000,() => {
  console.log("server is running on port 3000")
})
