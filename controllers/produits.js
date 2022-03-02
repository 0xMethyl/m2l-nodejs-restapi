const pool = require('../config/database');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 11;

module.exports = {
    retrieveProduits: async (req, res) =>{
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_produit INNER JOIN t_categorie ON t_produit.produit_id = t_categorie.categorie_id');
            console.log(result);
            return res.status(200).json({ success: result })


        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    }
}