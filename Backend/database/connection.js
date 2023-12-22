const mysql = require('mysql');

// const db = mysql.createPool({
//     host: 'localhost',
//     user:'root',
//     password:'',
//     database: "fleet",
//     port: "3307"
// })
const db = mysql.createPool({
    host: 'bjxwp9zadzdyfnlsid8b-mysql.services.clever-cloud.com',
    user:'uyo3diweamt0qrca',
    password:'SSSLkR8oQLwUFVl0kyWU',
    database: "bjxwp9zadzdyfnlsid8b",
    port: "3306"
})


module.exports = async (query) => {

return new Promise((resolve, reject)=>{
    db.getConnection((err, connection)=>{
        if(err) reject(err)
        connection.query(query, (err, results)=>{
            if(err) reject (err)
            else{
                resolve(results)
                connection.release()
        }
           
            })
    })


})
    
}