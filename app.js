const express= require('express');
const mysql2 = require('mysql2')
const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'LoginHopeHacks'

})

db.connect( (error)=>{
if(error){
    console.log(error)
}else{
    console.log('mysql connected');
}
})
app.get('/',(req,res)=>{
    res.send('<h1>home page</h1>')
})

app.listen(5000, ()=>{
    console.log('server is up in port 5000');
})