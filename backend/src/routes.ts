import express from "express";
const routes = express.Router();
import knex from "./database/connection";
import PointsController from "./controllers/PointsController"
import ItemsController from "./controllers/ItemsController"
const itemsController = new ItemsController();
const pointController = new PointsController();

routes.get('/items', itemsController.create);
routes.post('/points', pointController.create);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

export default routes;

// Service Pattern
// Repository pattern (Data Mapper)