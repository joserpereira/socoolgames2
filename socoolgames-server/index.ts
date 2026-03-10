import { routes } from './routes/api';
// import { initDatetimeExtensions } from './utils/dateTimeUtils'
import { Logger } from './utils/loggerUtils';
import { errorHandler } from './middlewares/errorHandler';
import path from "path";
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from './config/corsOptions';
const RoleModel = require('./models/role');
// import fs = require('fs');

import "./config/env"

const app = express()
app.use(express.static(__dirname + '/public'));

app.use("/uploads", express.static(path.join(__dirname, "uploads")))


const loggerUtils = new Logger();

//initDatetimeExtensions();

console.log("process.version: ", process.version)
console.log("process.execPath: ", process.execPath)
console.log("__dirname ", __dirname)
console.log("cwd:", process.cwd());
console.log("node path:", module.paths)

app.use(express.json())

app.use(cors(corsOptions));
// Global error handler (should be after routes)
app.use(errorHandler);

app.use((err: any, req: any, res: any, next: any) => {

  if (err.message === 'CORS_NOT_ALLOWED') {
    return res.status(403).json({
      error: 'CORS_ERROR',
      message: 'Origin not allowed',
      origin: req.headers.origin || null
    })
  }

 // outros erros conhecidos
  if (err.status) {
    return res.status(err.status).json({
      error: err.name || 'ERROR',
      message: err.message
    })
  }

  // fallback REAL para erro interno
  return res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Unexpected error'
  })
})

app.use(cookieParser());

app.use(express.static('../client/dist'))

app.use('/api/static/', express.static('./public'))
// Vue static files

const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));


var production = !((process.env.NODE_ENV || 'production').trim() === 'development');


function createRoutes() {
     routes(app); 
     app.get(/^(?!\/api).*$/, (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
      });

}

const  initial = async () => {
  try {

    var count = await RoleModel.countDocuments().exec();
    if (count === 0) {
      new RoleModel({
        name: "user"
      }).save();

      new RoleModel({
        name: "moderator"
      }).save();

      new RoleModel({
        name: "admin"
      }).save();
    }
  }
  catch (error: any) {
    console.log("Failed to get Role documents")
  }
}

//var http = require('http');
const http_port = process.env.PORT_HTTP || 3000; //3000
//const https_port = process.env.PORT_HTTPS; //4431;

function startServers() {
     console.log("startServers", process.env.PORT_HTTP)
     const PORT = process.env.PORT_HTTP || 3000

     // if (production) {
     //    var https = require('https');
     //    var credentials = {
     //      key: fs.readFileSync('sslcert/links-digest.lazulilabs.com.key'),
     //      cert: fs.readFileSync('sslcert/links-digest.lazulilabs.com.crt'),
     //    }
     //    app.enable('trust proxy')
        
     //    app.use((req,res,next)=>{
     //         if(req.secure){
     //             next();
     //         }else{
     //             res.redirect('https://'+req.hostname+req.url)
     //         }
     //    });

        app.listen(PORT, () => {
            loggerUtils.info('Server http is running on port ' + http_port)
        }).on('error', function(err) {
            loggerUtils.error('Http Server error ' + err.message)
         });
         
     //    https.createServer(credentials, app).listen(https_port, () => {
     //        loggerUtils.info('Server https is running on port ' + https_port)
     //     }).on('error', function(err) {
     //        loggerUtils.error('Https Server error ' + err.message)
     //      });
     //}
     //else {
     //     app.listen(PORT, () => loggerUtils.log(`App listening at http://localhost:${PORT}`))
     //}     
}

loggerUtils.log("production: " + production)
var suffix_db = production ? "" : "_dev"
loggerUtils.debug("mode " + production.toString() + process.env.NODE_ENV)

var connection_string = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@'+process.env.MONGO_URL+'/socoolgames_v2' + suffix_db;

mongoose.connect(connection_string, {
     })
    .then(() => { 
        console.info('Connected to MongoDB');
        initial();

     })
    .then(() => {
         // validateVersion()
         createRoutes()
         // initial()
         startServers()
     })
     .catch((error) => loggerUtils.error('Fail to initialize. ' + error.message.toString()))
