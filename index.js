//instantiation
const express = require("express")
const app=express()
const mysql= require("mysql")
const moment=require("moment")
const PORT = process.env. PORT || 5000


const logger= (req,res,next) =>{
    console.log(
        `${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`
    )
    next();
}
app.use(logger);


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee",
});

connection.connect();
//REPORT-CRUD
app.get("/api/members", (req,res) =>{
    connection.query("SELECT * FROM userdata",(err,rows,fields) =>{
        if(err) throw err;
        res.json(rows)
    })
})

//REPORT-CRUD SEARCH
app.get("/api/members/:id", (req,res) =>{
    const id=req.params.id
    //res.send(id)
    connection.query(`SELECT * FROM userdata WHERE id=${id}`, (err,rows, fields)=>{
        if(err) throw err
        if(rows.lenght > 0){
        res.json(rows)
        }else{
            res.status(400).json({msg:`${id} id not found`})
        }
    })
})

//POST
//CREATE - CRUD
app.use(express.urlencoded({extended:false}))
app.post("/api/members", (req, res) =>{
    const fname = req.body.fname; //Juan
    const lname = req.body.lname; //DelaCruz
    const email = req.body.email; //juan@gmail.com
    const gender =req.body.gender; //male
    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUES ('${fname}','${lname}','${email}','${gender}')`,
        (err,rows,fields)=>{
            if(err) throw err;
            res.json({msg: `Succesfully insert`})
        }
    )
})

app.use(express.urlencoded({extended:false}))
app.put("/api/members",(req,res) =>{S
    const fname = req.body.fname; //Juan
    const lname = req.body.lname; //DelaCruz
    const email = req.body.email; //juan@gmail.com
    const gender =req.body.gender; //male
    const id=req.body.id;
    connection.query(`UPDATE userdata SET first_name='${fname}', lastname='${lname}',email='${email}',gender='${gender}' WHERE id='${id}'`,(err,rows,fields)=>{
        if(err) throw err
        res.json({msg: `Successfully Updated!`})
    })
})


//DELETE
app.use(express.urlencoded({extended:false}))
app.delete("/api/members",(req,res) =>{
    const id=req.body.id;
    HTMLFormControlsCollection.query(`DELETE FROM userdata WHERE id='${id}'`),(err,rows,fields)=>{
        if(err) throw err;
        res.json({msg: `Succesfully Deleted`})
    }
})

app.listen(5000, () => {
    console.log(`Server is running in port ${PORT}`)
})