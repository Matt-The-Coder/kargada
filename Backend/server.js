require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT
app.use(express.json());
const db = require('./database/connection')

const routes = require('./routes/adminRoute')

app.use(routes)
app.listen(port, async (err)=>{
    if(err) throw err;
    console.log(`Server started at port ${port}`)
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    const query = `Insert into login (u_name, u_username, u_password, u_role, u_isactive, u_email, u_created_date)
    values ('ralph', 'ralph@gmail.com', '1231h2jgsdna2', 'fleetmanager', '1', 'ralph@gmail.com', '${currentDate}'  )`;
    const selectQuery = "Select * from login";
    try {
        console.log(formattedDate)
    } catch (error) {
        console.log(err)
    }
})
