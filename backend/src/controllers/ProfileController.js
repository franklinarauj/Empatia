const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const condominio_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('condominio_id', condominio_id)
        .select('*');

        return response.json(incidents);
    }
}