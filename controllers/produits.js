const pool = require('../config/database');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const saltRounds = 11;
module.exports = {
    getAll: async (req, res) =>{
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_produit INNER JOIN t_categorie ON t_produit.produit_id = t_categorie.categorie_id WHERE produit_quantite > 0;');
            console.log(result);
            return res.status(200).json({ success: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },

    getById: async (req, res) => {
        let connexion;
        try{
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_produit WHERE produit_id = ' + req.params.id);
            console.log(result);
            return res.status(200).json({ success: result });
        }catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },

    getAllCategory: async (req, res) => {
        let connexion 
        try{
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_categorie');
            console.log(result);
            return res.status(200).json({ success: result });
        }catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },

    getByCategory: async (req, res) => {
        let connexion 
        try{
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_produit INNER JOIN t_categorie ON t_produit.produit_id = t_categorie.categorie_id WHERE t_categorie.categorie_id = ' + req.params.id + ";");
            console.log(result);
            return res.status(200).json({ success: result });
        }catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },

    getStock: async (req, res) => {
        let connexion 
        try{
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT produit_quantite FROM t_produit');
            console.log(result);
            return res.status(200).json({ success: result });
        }catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },

    
    getStockById: async (req, res) => {
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT produit_quantite FROM t_produit WHERE produit_id = ' + req.params.id + ";");
            console.log(result);
            return res.status(200).json({ success: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },

    addToCart: async(req, res) => {
        let connexion;
        try {

            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_produit WHERE produit_id = ' + req.params.id + ";");
            console.log(result);

            prodId = req.params.id;
            prodQty = parseInt(req.params.qty);

            var cart = cart || {
                items: [],
                totalQty: 0,
                totalPrice: 0
            }

            req.session.cart = cart;
            
            var prod = {
                "produit_id":result[0].produit_id,
                "produit_nom":result[0].produit_nom,
                "produit_marque":result[0].produit_marque,
                "produit_poids":result[0].produit_poids,
                "produit_taille":result[0].produit_taille,
                "produit_quantite":prodQty,
                "produit_prix":result[0].produit_prix,
                "produit_categories":result[0].produit_categories
            };
            
            cart.items.push({
                "itemId": prod.produit_id, 
                "itemNom": prod.produit_nom,
                "itemQty": prod.produit_quantite, 
                "itemPrix": prod.produit_prix * prod.produit_quantite
            });

            cart.totalPrice += parseInt(prodQty * result[0].produit_prix);
            cart.totalQty += prodQty;
            
            req.session.cart += cart ;

            console.log(req.session.cart)

            return cart;
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },

    search: async(req, res) => {
        let connexion;
        try {
            console.log(req.params.keyword);
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_produit WHERE produit_nom LIKE "%' +  req.params.keyword.toLowerCase() + '%"');
            console.log(result);
            return res.status(200).json({ success: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    }
}