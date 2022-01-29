const express = require('express');
//const { status } = require('express/lib/response');
//const res = require('express/lib/response');
const mysql = require("mysql2");
const app = express();
app.listen(4050,()=>{
    console.log("server is running");
});

const db = mysql.createConnection({
    host: 'localhost',
    user:"root",
    password:"",
    database: 'ecommerce',
    port: 3306
});



db.connect(err=>{
    if(err){
        console.log(err,"error")
    }else{
        console.log("database connection established");
    }
})

app.get('/', function(req, res){
    res.send('Welcome');
});

app.get("/admin",function(req, res){
    res.send("admin page");
});

app.get("/admin/:id",function(req, res){
    let id = req.params.id;
    let qry = "select * from admin where id = '" + id + "'";
    db.query(qry,(err, results)=>{
        if (err) {console.log(err)}
        if (results.length > 0){
            res.send({status: true,msg:"success",data:results});
        }else{
            res.send({status: false,msg:"error"})
        }
    })
})



app.get("/home",(req, res)=>{
    res.send("home page");
})

app.get("/home/:id",function(req, res){
    let id = req.params.id;
    let qq ="SELECT * FROM home where id = '" + id + "'";
    db.query(qq,function(err,result){
        if (err){
            console.log(err);
        }
        if(result.length>0){
            res.send({status:true,msg:"success",data:result})
        }
        else{
            res.send({status:false,msg:"error"})
        }
    })
})