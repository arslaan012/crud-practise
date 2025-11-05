const pool = require('../config/dbConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'something'

const register = async(req, res) => {
    const {name, email, password} = req.body

    const hashPass = await bcrypt.hash(password, 2)

    const result = await pool.query(
        "Insert INTO userAuth (uName, uEmail, uPass) VALUES ($1, $2, $3);",
        [name, email, hashPass]
    );

    return res.status(201).json({msg: "User Created"});
}

const login = async(req, res) => {
    const {email, password} = req.body;

    const result = await pool.query("SELECT * from userAuth WHERE uEmail = $1", [email])

    // console.log(result)

    if(result.rowCount == 0)return res.status(400).json({error: "User not found"})

    const user = result.rows[0];

    // console.log("req.body:", req.body);
    // console.log("DB row:", user);
    // console.log("password given:", password);
    // console.log("hashed password in DB:", user.uPass);


    const check = await bcrypt.compare(password, user.upass);
    if(!check) return res.status(401).json({error: "Invalid password"})

    const token = jwt.sign({id: user.id, email: user.uemail}, JWT_SECRET, {expiresIn: "1h"})

    return res.json({token})
}


module.exports = {
    register,
    login,
}