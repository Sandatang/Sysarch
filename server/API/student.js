const express = require('express')
const router = express.Router()
const config = require('../config')
const mysql = require('mysql2')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const db = mysql.createPool(config.db)

// const upload = multer({dest: '../images'})
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

db.getConnection((err) => {

    if(err){ 
        console.log("DB not Connected")
    }
    else{
        console.log("Succesfully Connected")
    }
})


router.use('/image', express.static('./images'))
//FOR TABLE OF STUDENTS
router.get('/display', (req,res) => {
    const sqlStatement = "SELECT * FROM student"
    db.query(sqlStatement, (err,result) => {
        if(err) res.status(500).json(err)
        res.json({result})
    })
})

// //adding student
router.post('/add-student', async (req,res) => {
    try {
        let upload = multer({ storage: storage}).single('avatar');
        upload(req, res, function(err) {
            if (!req.file) {
                return res.json({'message':'Please select an image to upload'});
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            const classifiedsadd = req.file.filename
            const lastname = req.body.lastname
            const firstname = req.body.firstname
            const course = req.body.course
            const level = req.body.level

            const sqlStatement = "INSERT INTO student (lastname, firstname, course, level, image) VALUES(?,?,?,?,?)"
            db.query(sqlStatement,[lastname,firstname,course,level,classifiedsadd], (err,result) => {
                if(err) res.status(500).json(err)
                res.json({"message":"Student was succesfully added"})
            })
        });
    }catch(err) {console.log(err)}
})


// //delete student
router.delete('/delete-student/:idno', (req,res) => {
    const idno = req.params.idno

    const sqlStatement = "DELETE FROM student WHERE idno = ?"
    db.query(sqlStatement,[idno], (err,result) => {
        if(err) res.status(500).json(err)
        res.json({message: "Student Deleted"})
    })
})

// //update student
router.put('/update-student', (req,res) => {
    try {
        let upload = multer({ storage: storage}).single('avatar');
        upload(req, res, function(err) {
            if (!req.file) {
                return res.json({'message':'Please select an image to upload'});
            }
            else if (err instanceof multer.MulterError) {
                return res.send("first "+err);
            }
            else if (err) {
                return res.send("second "+err);
            }

            const classifiedsadd = req.file.filename
            const lastname = req.body.lastname
            const firstname = req.body.firstname
            const course = req.body.course
            const level = req.body.level
            const idno = req.body.idno

            const sqlStatement = "UPDATE student SET lastname = ?,firstname = ?,course = ?,level = ?,image = ? WHERE idno = ?"
            db.query(sqlStatement,[lastname,firstname,course,level,classifiedsadd,idno], (err,result) => {
                if(err) res.status(500).json(err)
                res.json({"message":"Student was succesfully updated"})
            })
        });
    }catch(err) {console.log(err)}
    
})
module.exports=router