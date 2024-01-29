const db = require('../db');

class RequestController {
    async createRequest(req, res) {
        const { company, date_st, date_fn, bilbord_id } = req.body;
        const newRequest = await db.query(
            `INSERT INTO request (company, date_st, date_fn, bilbord_id) values ($1, $2, $3, $4) RETURNING *`,
            [company, date_st, date_fn, bilbord_id]
        );
        res.json(newRequest.rows[0]);
    }

    async getRequests(_, res) {
        const requests = await db.query('SELECT * FROM request');
        res.json(requests.rows);
    }

    async getOneRequest(req, res) {
        const id = req.params.id;
        const request = await db.query('SELECT * FROM request WHERE id = $1', [id]);
        res.json(request.rows[0]);
    }

    async updateRequest(req, res) {
        const { id, company, date_st, date_fn, bilbord_id } = req.body;
        const request = await db.query(
            'UPDATE request SET company = $1, date_st = $2, date_fn = $3, bilbord_id = $4 where id = $5 RETURNING *',
            [company, date_st, date_fn, bilbord_id, id]
        );
        res.json(request.rows[0]);
    }

    async deleteRequest(req, res) {
        const id = req.params.id;
        const request = await db.query('DELETE FROM request WHERE id = $1', [id]);
        res.json(request.rows[0]);
    }

    async getBilbordRequests(req, res) {
        const bilbord_id = req.params.bilbord_id;
        const request = await db.query('SELECT * FROM request WHERE bilbord_id = $1', [bilbord_id]);
        res.json(request.rows);
    }
}

module.exports = new RequestController();
