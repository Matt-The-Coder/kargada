const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'',
    database: "fleetdb",
    port: "3307"
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