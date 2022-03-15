const pool = require('../config/database');

const {validationResult, body} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 11;

const express = require('express');
const session = require('express-session');

const app = express();

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
        console.log("Telephone : " + req.body.telephone);
        console.log("Ville : " + req.body.ville);
        console.log("Codepostal : " + req.body.codepostal);
        console.log("Date de naissance : " + req.body.datenaissance);

        try {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)

           // if (! (req.body.genre && req.body.email && req.body.password && req.body.confirm_password && req.body.nom && req.body.prenom && req.body.adresse && req.body.telephone && req.body.ville && req.body.codepostal && req.body.datenaissance)){
            //    if (req.body.password == req.body.confirm_password){
            connexion = await pool.getConnection();
            const result = await connexion.query("INSERT INTO `t_client`(`client_genre`, `client_email`, `client_password`, `client_nom`, `client_prenom`, `client_adresse`, `client_phone`, `client_ville`, `client_codepostal`, `client_datenaissance`, `isAdmin`) VALUES ('" + req.body.genre + "', '" + req.body.email + "','" + encryptedPassword + "', '" + req.body.nom + "','" + req.body.prenom + "','" + req.body.adresse + "','" + req.body.telephone + "','" + req.body.ville + "','" + req.body.codepostal + "','" + req.body.datenaissance + ", '0')"); // curl -d '{"genre": "Monsieur", "email": "user1@gmail.com", "password": "user1", "nom": "Jorès", "prenom": "Jean", "adresse": "2 rue de londres", "ville": "Angers", "codepostal": 49000, "datenaissance": "1970-12-31", isAdmin: 0}' -X POST "http://localhost:3001/users/register" -H 'Content-Type: application/json'                console.log(result);
            res.writeHead(302, {
                    'Location': 'http://localhost:3000/'
            });
            return res.status(200).json({ success: result });
             //   }
          //  }
            
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
            if (req.body.email && req.body.password){
                const mailExist = await connexion.query("SELECT * FROM t_client WHERE client_email = '" + req.body.email + "'"); 
                const passEnc = await connexion.query("SELECT client_password FROM t_client WHERE client_email = '" + req.body.email + "'"); 

                if (mailExist.length > 0){

                    console.log("Good mail.");
                    const comparison = await bcrypt.compare(req.body.password, passEnc[0].client_password);
                    
                    if(comparison){  
                        console.log('Good password.');
                        req.session.loggedIn = true;
                        
                        req.session.client_email = req.body.email;

                        res.header('Access-Control-Allow-Credentials', true);
                        res.header('Access-Control-Allow-Origin', 'http://localhost:3001/'); // only_one_url_here');
                        res.header('Access-Control-Allow-Headers', 'Content-Type, POST, GET, OPTIONS, DELETE');
                        
                        console.log(req.session);
                        
                    } else {
                        console.log('Bad password.')
                    }

                } else {
                    console.log("Bad mail.")
                }
            }
            return res.status(200).json({ success: result});

        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end()
        }
    },
    retrieveUsersData: async (req, res) => {

        console.log(req.session);
        /*
        if(req.session.loggedIn == false){
            let connexion = await pool.getConnection();
            const userVals = await connexion.query("SELECT * FROM t_client WHERE client_email = '" + req.session.client_email + "'", function(err, results){
                if (error) throw error;
                
                req.session.client_genre = results[0]['client_genre'];
                req.session.client_nom = results[0]['client_nom'];
                req.session.client_prenom = results[0]['client_prenom'];
                
                console.log(req.session.client_nom);

            });
        }
        */
    },
    checkLoginStatus: async (req, res) => {
        const { email } = req.session;
            if (email) {
                return res.status(200).json({ success: { email } });
            }
        return res.status(403).send();
    },
    selectAll: async (req, res) => {
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query('SELECT * FROM t_client');
            console.log(result);
            return res.status(200).json({ success: result })
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },
    disconnect: async (req, res) => {
        if(req.session.loggedIn == true){
            req.session.destroy();
        }
    }
}