var express = require('express');
var app = express();
app.use(express.static(__dirname + "/public"));
var mongo = require('mongodb');
var Server = mongo.Server,Db = mongo.Db,BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('emp', server);
db.open(function(err, db) 
{
    if(!err) 
    {
        console.log("Connected to 'emps' database");
        db.collection('emp', {strict:true}, function(err, collection) 
        {
            if (err) 
            {
                console.log("The 'emps' collection doesn't exist.");
            }
        });
    }
});
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));
app.post("",  function(req, res) 
{
    var emp = req.body;
    emp.message="";
    console.log(emp);
    console.log('Adding emp: ' + JSON.stringify(emp));
    db.collection('emp', {strict:true}, function(err, collection) 
    {      
        collection.insert(emp, function(err, result) 
        {
            if (err) 
            {
                res.send('An error has occurred');
            } 
            else 
            {
                console.log('Success'); 
            }

        });
    });  
});
app.post("/login",  function(req, res) {
	var ee=req.body.lusername;
	var pp=req.body.lpassword;
     console.log(req.body.lusername);
     db.collection('emp').findOne({'e':ee,'pwd':pp},function(err,doc){
     	if(doc==null){
     	 res.send(null);
     	}
     	else
     		res.send('pass');
     });
app.post("/chatbox",function(req,res)
{
	 var msg=req.body.msg;
	 var fe=req.body.fe;
	 var te=req.body.te;
	 db.collection('emp').findOne({'e':te},function(err,doc)
	 {
     	if(doc==null)
     	{
     		console.log("not registor")
     	    res.send(null);
     	}
     	else
     	{
	    	console.log(msg,fe,te);
        	db.collection('emp').update({e:fe},{$push:{messages:msg+"\nto  "+te+"\n\n"}})
    	    db.collection('emp').update({e:te},{$push:{messages:msg+"\nfrom "+fe+"\n\n"}})
     		db.collection('emp').findOne({e:fe},function(err,doc)
     		{
        		res.send(doc.messages);
    		});
     	 }	
      });    
})
app.post('/chat',function(req,res)
{ 
	var fe=req.body.fe;
 db.collection('emp').findOne({e:fe},function(err,doc)
     {   if(err)
     	  res.send();
     	  else
           res.send(doc.messages);
     });
    
})     
 
});
app.get('/userlogin1',function(req, res) {
    db.collection('emp', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
});
app.listen(3000);
console.log("server running on port 3000");