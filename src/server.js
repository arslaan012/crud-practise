const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRouter = require('./routes/authRoutes')
const crudRouter = require('./routes/crudRoutes')

const PORT = 3000
const app = express()

app.use(express.json())


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD api',
      version: '0.0.1',
      description: 'API for CRUD operations with Authentication',
    },

    tags: [
      { name: "Users", description: "CRUD operations for user endpoints" },
      { name: "Auth", description: "Authentication endpoints" }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['./src/routes/*.js']
};



const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use("/auth", authRouter);
app.use("/users", crudRouter);


app.listen(PORT || 3000, () => {
    console.log("Server running on port", PORT)
})