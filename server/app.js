const express = require('express')
// const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
//call config file
const config = require('./config')
const students = require('./API/student')
const users = require('./API/user')

//instance of express
const app = express()

//content type
// {
//     origin: "http://127.0.0.1:5173",
//     method: ["GET","POST","DELETE","PUT",]
// }
app.use(cors())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb'}))
app.use("/", students)
app.use("/", users)
// app.use("/static", express.static("./images"))



 
// //@type   POST
// //route for post data
// app.post("/upload", upload.single('image'), (req, res) => {
//     if (!req.file) {
//         console.log("No file upload");
//     } else {
//         console.log(req.file.filename)
//         var imgsrc = 'http://127.0.0.1:5173/images/' + req.file.filename
//         var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
//         db.query(insertData, [imgsrc], (err, result) => {
//             if (err) throw err
//             console.log("file uploaded")
//         })
//     }
// });


//default route
app.get('/', (req,res) => {
    res.send('Hello!!!')
})

//listetning
app.listen(config.port, () => {
    require("dns").lookup(require("os").hostname(), (err,addr) => {
        console.log("http://%s/%s",addr,port)
    })
})