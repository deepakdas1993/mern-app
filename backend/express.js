const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        title: 'Swagger',
        description: 'API Documentation',
        contact: {
            name: 'Deepak',

        },
        servers: ["http://localhost:5000/"]
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);


require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
const excerciseRouter = require("./routes/excercise");
const userRouter = require("./routes/users");

app.use('/excercise', excerciseRouter);
app.use('/users', userRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});