const pool = require('../config/database');

const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res, next) => {

        let connexion;

        console.log("Genre : " + req.body.genre);
        console.log("Email : " + req.body.email);
        console.log("Password : " + req.body.password);
        console.log("Confirm Password : " + req.body.confirm_password);
        console.log("Nom : " + req.body.nom);
        console.log("Prenom : " + req.body.prenom);
        console.log("Adresse : " + req.body.adresse);
        console.log("Ville : " + req.body.ville);
        console.log("Codepostal : " + req.body.codepostal);
        console.log("Date de naissance : " + req.body.password);

        try {
            connexion = await pool.getConnection();
            const result = await connexion.query("INSERT INTO `client`(`client_genre`, `client_email`, `client_password`, `client_nom`, `client_prenom`, `client_adresse`, `client_ville`, `client_codepostal`, `client_datenaissance`) VALUES ('" + req.body.genre + "', '" + req.body.email + "','" + req.body.password + "', '" + req.body.nom + "','"+ req.body.prenom + "','" + req.body.adresse + "','" + req.body.ville + "','" + req.body.codepostal + "','" + req.body.datenaissance + "')"); // curl -d '{"genre": "Monsieur", "email": "user1@gmail.com", "password": "user1", "nom": "Jorès", "prenom": "Jean", "adresse": "2 rue de londres", "ville": "Angers", "codepostal": 49000, "datenaissance": "1970-12-31"}' -X POST "http://localhost:3001/users/register" -H 'Content-Type: application/json'
            console.log(result);
            res.writeHead(302, {
                'Location': 'http://localhost:3000/'
              });
            return res.status(200).json({ success: result });
            
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end()
        }
    },
    login: async (req, res) => {

        let connexion;
        console.log("Email : " + req.body.email);
        console.log("Password : " + req.body.password);

        try {
            connexion = await pool.getConnection();
            const result = await connexion.query("SELECT * FROM client WHERE client_email = '" + req.body.email + "' AND client_password = '" + req.body.password + "'"); // curl -d '{"email": "test@gmail.com", "password": "test123"}' -X POST "http://localhost:3001/users/login" -H 'Content-Type: application/json'
            console.log(result);

            return res.status(200).json({ success: result });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end()
        }
    },
    selectAll: async (req, res) => {
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM client');
            console.log(result);
            return res.status(200).json({ success: result })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    }
}