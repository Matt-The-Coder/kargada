const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt');
const db = require('../database/connection')
route.get("/Home", (req, res)=>{
    res.send('hello')
})

route.get('/register', async (req, res)=>
{
  try {
    const email = 'ralphmatthewmanabat@gmail.com'
    const username = 'superAdmin'
    const name = 'superAdmin'
    const password = 'mattTheCoder#17'
    const hashedPassword = await bcrypt.hash(password, 10)
    const sqlQuery = `INSERT INTO accounts (u_name, u_username, u_password, u_email) VALUES('${name}', 
    '${username}', '${hashedPassword}', '${email}')`;
    await db(sqlQuery)

  } catch (error) {
    console.error(error)
  }


})

route.post('/login', async (req, res)=>
{
  try { 
    const {userName, password} = req.body
    const result = await db(`Select * from accounts where u_username = '${userName}'`)
    if(result == 0){
     return res.json({message: "User does not exist"})
    }
    else{
     const checkPassword =  await bcrypt.compare(password, result[0].u_password)
      if (!checkPassword) {
          return res.json({message: "Password is Incorrect!"})
      }
      else return res.json({message: "Successfully Logged In!"})
    }
 
  } catch (error) {
    console.log('You have an error', error)
  }

})

module.exports = route