const express = require('express')
const router = express.Router()
const config = require('../config')
const mysql = require('mysql')

const db = mysql.createConnection(config.db)
///USER TABLE
router.get('/display-user', (req,res) => {
    const sqlStatement = "SELECT * FROM user"
    db.query(sqlStatement, (err,result) => {
        if(err) res.status(500).json(err)
        res.json({result})
    })
})

// //adding student
router.post('/add-user', (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const sqlStatement = "INSERT INTO user (username, password) VALUES(?,?)"
    db.query(sqlStatement,[username, password], (err,result) => {
        if(err) res.status(500).json(err)
        res.json({message: "User Added"})
    })
})

// //delete student
router.delete('/delete-user/:id', (req,res) => {
    const id = req.params.id

    const sqlStatement = "DELETE FROM user WHERE id = ?"
    db.query(sqlStatement,[id], (err,result) => {
        if(err) res.status(500).json(err)
        res.json({message: "User Deleted"})
    })
})

// //update student
router.put('/update-user', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    const id = req.body.id  

    const sqlStatement = "UPDATE user SET username = ?,password = ? WHERE id = ?"

    db.query(sqlStatement,[username, password, id], (err,result) => {
        if(err) res.status(500).json(err)
        res.json({message: "User Updated"})
    })
})

//FOR VERIFICATION
router.post('/verification', (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const sqlStatement = 'SELECT * FROM user WHERE username = ?'

    db.query(sqlStatement, username, (err,results) => {
        if(err) res.status(500).json(err)
        else{
            if(results.length > 0){
                if(password === results[0].password){
                    const direct = '/table'
                    res.json({'username': results[0].username,'path': direct})
                }
                else{
                    res.json({'message': `Incorrect Username or Password`})
                }
            }
            else{
                res.json({'message': `Incorrect Username or Password`})
            }
        }
    })
})


module.exports = router