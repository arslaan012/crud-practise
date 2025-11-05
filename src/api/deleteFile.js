const fs = require('fs')
const pool = require('../config/dbConfig')


const deleteObj = async( obj ) => {
    try{
        const query = `DELETE from users where obj = $1;`
        
        const values = [ obj ]

        const result = await pool.query(query, values)

        console.log(result)

        if(result.rowCount == 0)return { error: "User data not found" }

        return { message: "Deleted Successfully" }
    }
    catch(err){
        console.error("Error deleting object:", err.message);
        return { error: "Failed to delete object", details: err.message };

    }

}

module.exports = {
    deleteObj
}