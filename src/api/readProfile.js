const fs = require('fs')
const pool = require('../config/dbConfig')

const readProfile = async( email ) => {
    try{
        const query = `SELECT * from userauth
        WHERE uemail = $1;
        `

        const values = [ email ]

        const result = await pool.query(query, values)

        if(result.rowCount == 0)return { error: "User does not exist" }

        return { message: "User data found", data: result.rows[0] }
    }
    catch(err){
        console.error("Error creating object:", err.message);
        return { error: "Failed to create object", details: err.message };

    }

}


module.exports = {
    readProfile
}