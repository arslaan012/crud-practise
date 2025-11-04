const fs = require('fs')
const express = require('express')

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const { read } = require('./api/readFile')
const { create } = require('./api/createFile')
const { update } = require('./api/updateFile')
const { deleteObj } = require('./api/deleteFile')

const PORT = 3000
const filePath = './text.json'
const app = express()


app.use(express.json())

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CRUD api',
            version: '0.0.1',
            description: 'Simple API calls to read, create, delete and update the data in the file',
        },
    },

    apis: ['./server.js']
}


const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))



/**
 * @swagger
 * /read:
 *   get:
 *     summary: Read specific data from file
 *     parameters:
 *       - in: query
 *         name: obj
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File read successfully
 */

app.get('/read', (req, res) => {
    console.log("read block")
    try{
        const { obj } = req.query
        if(!obj)return res.status(400).json({message: "Object not found"})
        
        const data = read(filePath, obj)
        
        return res.status(200).json({message: "File read", data: data})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({err: err.message})
    }
    
})


/**
 * @swagger
 * /create:
 *   post:
 *     summary: Write data into the file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               obj:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: string
 *     responses:
 *       200:
 *         description: Object created successfully
 */

app.post('/create', (req, res) => {
    console.log("create block")
    try{
        const { obj, name, age } = req.body

        if(!obj || !name || !age)return res.status(400).json({message: "Some data is not found"})

        create(filePath, {obj, name, age})
    
        return res.status(201).json({message: "Object created"})
    }
    catch(err){
        console.log(err)
        return res.status(404).json({message: "Object not found", err: err.message})
    }
})


/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update the data in the file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               obj:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: string
 *     responses:
 *       200:
 *         description: Object updated successfully
 */

app.put('/update', (req, res) => {
    console.log("update block")
    try{
        const { obj, name, age } = req.body

        if(!obj || !name || !age)return res.status(404).json({message: "Some data is not found"})
        
        update(filePath, {obj, name, age})
    
        return res.status(200).json({message: "File updated"})
    }
    catch(err){
        console.log(err)
        return res.status(404).json({message: "Object not found", err: err.message})
    }
})

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete specific data from the file
 *     parameters:
 *       - name: obj
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Object deleted successfully
 */

app.delete('/delete', (req, res) => {
    console.log("delete block")
    try{
        const { obj } = req.query

        if(!obj)return res.status(400).json({message: "Object is required"})
            
        deleteObj(filePath, obj)
    
        return res.json({message: "Object deleted"})
    }
    catch(err){
        console.log(err)
        return res.status(404).json({message: "Object not found", err: err.message})
    }
})


const server = app.listen(PORT || 3000, () => {
    console.log("Server running on port", PORT)
})

// setInterval(() => {
//   console.log('Server is still alive...');
// }, 5000);
