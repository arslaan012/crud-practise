const fs = require('fs')
const pool = require('../config/dbConfig')

const create = async(logData) => {
    try{
        const {obj, name, age} = logData

        const query = `INSERT INTO users (obj, nam, age)
        VALUES ($1, $2, $3) 
        RETURNING obj, nam, age;
        `
        const values = [obj, name, age]

        const result = await pool.query(query, values)

        return {message: "user created successfully", data: result.rows[0]}
    }
    catch(err){
        if(err.code === "23505"){
            return {error: "Object already exists"}
        }
        return { error: "Failed to create object", details: err.message };
    }
}

module.exports = {
    create
}