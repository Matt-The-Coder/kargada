const express = require('express')
const route = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require('../database/connection')

const verifyToken = (req, res, next) => 
{
    if(req.cookies.token){
        req.userToken = req.cookies.token
        next()
    }else {
      return res.json({message:'No token provided.'});
    }

}

route.get('/homeAuthentication', verifyToken, (req, res) => {
    jwt.verify(req.userToken, "secretkey", (err, authData)=>{
        if(err){
          return res.json({message: "token is expired, not valid!"})
        }else {
          return res.json({authData})
        }
    })
})

route.delete("/logout", (req, res) => 
{
  res.clearCookie("token")
  return res.json({message: "Logout Successfully!"})
})

route.post('/login', async (req, res)=>
{
  try { 
    const {userName, password} = req.body
    const user = await db(`Select * from accounts where u_username = '${userName}'`)
    if(user == 0){
     return res.json({message: "User does not exist"})
    }
    else{
     const checkPassword =  await bcrypt.compare(password, user[0].u_password)
      if (!checkPassword) {
          return res.json({message: "Password is Incorrect!"})
      }
      else {
         jwt.sign({user: user}, "secretkey", {expiresIn: '1d'}, (err, token)=>{
          if(err){
            return res.json({message: "Cannot create token"})
          }
          res.cookie('token', token)
          return res.json({success:"Login Success!"})
        })
      }
    }
 
  } catch (error) {
    console.log('You have an error', error)
  }
})



route.get('/register', async (req, res)=>
{
  try {
    const email = 'ralphmatthewmanabat@gmail.com'
    const username = 'rm'
    const name = 'rm'
    const password = '123'
    const hashedPassword = await bcrypt.hash(password, 10)
    const sqlQuery = `INSERT INTO accounts (u_name, u_username, u_password, u_email) VALUES('${name}', 
    '${username}', '${hashedPassword}', '${email}')`;
    await db(sqlQuery)

  } catch (error) {
    console.error(error)
  }


})
module.exports = route