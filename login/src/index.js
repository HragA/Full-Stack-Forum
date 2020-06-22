import express from "express";
import * as bodyParser from 'body-parser'
import routes from './routes/index'

const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));