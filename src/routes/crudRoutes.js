const express = require("express")
const router = express.Router()

const { verify } = require("../middleware/verify")

const { readData, createData, updateData, deleteData, profileData } = require('../controllers/crudController')

const statusCodes = require('../constants/httpStatusCodes.json')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: CRUD opreations for the user
 */

/**
 * @swagger
 * /users/read:
 *   get:
 *     summary: Read specific data from file
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: obj
 *         required: true
 *         schema:
 *           type: string
 *         description: Key of object to read
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Data found"
 *               data:
 *                 obj: "user1"
 *                 name: "John"
 *                 age: 25
 *       400:
 *         description: Missing query parameter
 *       404:
 *         description: Object not found
 */

router.get('/read', verify, readData)

/**
 * @swagger
 * /users/readProfile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Returns profile data of the authenticated user based on the JWT token.
 *     responses:
 *       200:
 *         description: User profile data fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User data fetched"
 *               user:
 *                 id: 1
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *       401:
 *         description: Token missing or invalid
 *       500:
 *         description: Server error
 */

router.get('/readProfile', verify, profileData)


/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create data entry in file
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [obj, name, age]
 *             properties:
 *               obj:
 *                 type: string
 *                 example: user1
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 example: 23
 *     responses:
 *       201:
 *         description: Data created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User created"
 *               data:
 *                 obj: "user1"
 *                 name: "John Doe"
 *                 age: 23
 *       400:
 *         description: Missing fields
 */
router.post('/create', verify, createData)


/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Update existing file data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [obj, name, age]
 *             properties:
 *               obj:
 *                 type: string
 *                 example: user1
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Data updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Data updated"
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Object not found
 */
router.put('/update', verify, updateData)

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete data by key
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: obj
 *         required: true
 *         schema:
 *           type: string
 *         description: Key to delete
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Deleted successfully"
 *       400:
 *         description: Object key missing
 *       404:
 *         description: Not found
 */
router.delete('/delete', verify, deleteData)


module.exports = router