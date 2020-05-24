const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const { id } = request.body;

        const condominio = await connection('condominios')
        .where('id', id)
        .select('name')
        .first();

        if (!condominio) {
            return response.status(400).json({ error: 'No CONDOMINIO found with this ID.' })
        }

        return response.json(condominio);
    }
}