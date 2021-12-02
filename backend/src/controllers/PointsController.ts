import knex from '../database/connection';
import { Request, Response } from 'express';

class ItemsController {

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        const parsedItems = String(items)
            .split(",")
            .map((item) => Number(item.trim()));
        const points = await knex("points")
            .join("point_items", "points.id", "=", "point_items.point_id")
            .whereIn("point_items.item_id", parsedItems)
            .where("city", String(city))
            .where("uf", String(uf))
            .distinct()
            .select("points.*");
        /*  const serializedPoints = points.map((item) => {
              return {
                  ...points,
                  image_url: `http://192.168.0.13:3333/uploads/${item.image}`,
              };
          });*/
        return response.json(points);
    }

    async create(req: Request, res: Response) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;
        const trx = await knex.transaction();
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        const insertIds = await trx('points').returning('id').insert(point);
        const point_id = insertIds[0];
        const pointItens = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
        await trx('point_items').insert(pointItens);
        await trx.commit();
        return res.json({
            id: point_id,
            ...point
        })
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const point = await knex('points').where('id', id).select('*').first();
        if (!point) {
            return res.status(400).json({ message: "Point not found" });
        }
        const items = await knex("items")
            .join("point_items", "items.id", "=", "point_items.item_id")
            .where("point_items.point_id", id)
            .select("items.title");
        return res.json({ point, items });
    }
}

export default ItemsController