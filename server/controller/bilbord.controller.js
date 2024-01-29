const db = require('../db');

class BilbordController {
    async createBilbord(req, res) {
        const { addres } = req.body;
        const newBilbord = await db.query(`INSERT INTO bilbord (addres) values ($1) RETURNING *`, [addres]);
        res.json(newBilbord.rows[0]);
    }

    async getBilbords(req, res) {
        const bilbords = await db.query('SELECT * FROM bilbord');
        res.json(bilbords.rows);
    }

    async getOneBilbord(req, res) {
        const id = req.params.id;
        const bilbord = await db.query('SELECT * FROM bilbord WHERE id = $1', [id]);
        res.json(bilbord.rows[0]);
    }

    async updateBilbord(req, res) {
        const { id, addres } = req.body;
        const bilbord = await db.query('UPDATE bilbord set addres = $1 where id = $2 RETURNING *', [addres, id]);
        res.json(bilbord.rows[0]);
    }

    async deleteBilbord(req, res) {
        const id = req.params.id;
        await db.query('DELETE FROM request WHERE bilbord_id = $1', [id]);
        const bilbord = await db.query('DELETE FROM bilbord WHERE id = $1', [id]);
        res.json(bilbord.rows[0]);
    }
}

module.exports = new BilbordController();
