const mysql = require('mysql');

const db = mysql.createPool({
    host: 'o29.h.filess.io',
    user:'fleet_lookupyet',
    password:'6c907053a5417ebb84482d6cc68996432d1f768e',
    database: "fleet_lookupyet",
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