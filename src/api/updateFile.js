const pool = require('../config/dbConfig')

const update = async( params ) => {
    try{
        const {obj, name, age} = params
    
        const query = `
            UPDATE users SET nam = $2, age = $3
            WHERE obj = $1
            RETURNING obj, nam, age;
        `

        const values = [obj, name, age];
        const result = await pool.query(query, values)

        // console.log(result)

        if(result.rowCount == 0)return { error: "User does not exist" }

        return {message: "File updated successfully", data: result.rows[0]}
    }
    catch(err){
        console.error("Error updating object:", err.message);
        return { error: "Failed to update the object", details: err.message };

    }
}


module.exports = {
    update
}