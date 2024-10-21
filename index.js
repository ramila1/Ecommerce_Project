const express = require('express');
const ejs = require('ejs');

const app = express();
app.use(express.static('public'))
const port = 3000

app.get('/',(req,res)=>{
    res.send('Hello')
});

app.listen(port,()=>{
    console.log(`Server run at http://ecommerce:${port}`);
})