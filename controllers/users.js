const pool = require('../config/database');

const {validationResult, body} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 11;

const express = require('express');

const app = express();

module.exports = {
    register: async (req, res) => {

        let connexion;

        try {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);

            console.log("Genre : " + req.body.genre);
            console.log("Email : " + req.body.email);
            console.log("Password : " + req.body.password);
            console.log("Confirm Password : " + req.body.confirm_password);
            console.log("Hash : " + encryptedPassword);
            console.log("Nom : " + req.body.nom);
            console.log("Prenom : " + req.body.prenom);
            console.log("Adresse : " + req.body.adresse);
            console.log("Telephone : " + req.body.telephone);
            console.log("Ville : " + req.body.ville);
            console.log("Codepostal : " + req.body.codepostal);
            console.log("Date de naissance : " + req.body.datenaissance);

            if (! (req.body.genre && req.body.email && req.body.password && req.body.confirm_password && req.body.nom && req.body.prenom && req.body.adresse && req.body.telephone && req.body.ville && req.body.codepostal && req.body.datenaissance)){
                if (req.body.password == req.body.confirm_password){
                    connexion = await pool.getConnection();
                    const result = await connexion.query("INSERT INTO `t_client` (`client_genre`, `client_email`, `client_password`, `client_nom`, `client_prenom`, `client_adresse`, `client_phone`, `client_ville`, `client_codepostal`, `client_datenaissance`, `isAdmin`) VALUES ('" + req.body.genre + "', '" + req.body.email + "','" + encryptedPassword + "', '" + req.body.nom + "','" + req.body.prenom + "','" + req.body.adresse + "','" + req.body.telephone + "','" + req.body.ville + "','" + req.body.codepostal + "','" + req.body.datenaissance + "', 0)"); // curl -d '{"genre": "Monsieur", "email": "user1@gmail.com", "password": "user1", "nom": "Jorès", "prenom": "Jean", "adresse": "2 rue de londres", "ville": "Angers", "codepostal": 49000, "datenaissance": "1970-12-31", isAdmin: 0}' -X POST "http://localhost:3001/users/register" -H 'Content-Type: application/json'                console.log(result);

                    return res.status(200).json({ success: result });
                }
            }
        } catch (error) {       
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },
    loginG: async (req, res) => {
        try{
            if(req.session.client_email){
                res.send({loggedIn: true, email: req.session.client_email});
            } else {
                res.send({loggedIn: false});
            }
        }catch {
            console.log(res)
            res.send({loggedIn: false});
        }
    },
    loginP: async (req, res) => {

        let connexion;

        console.log("Email : " + req.body.email);
        console.log("Password : " + req.body.password);

        try {
            connexion = await pool.getConnection();

            
            if (req.body.email && req.body.password){
                const result = await connexion.query("SELECT * FROM t_client WHERE client_email = '" + req.body.email + "'"); 
                const passEnc = await connexion.query("SELECT client_password FROM t_client WHERE client_email = '" + req.body.email + "'"); 

                if (result.length > 0){

                    console.log("Good mail.");
                    const comparison = await bcrypt.compare(req.body.password, passEnc[0].client_password);
                    
                    if(comparison){  
                        console.log('Good password.');
                        
        
                        req.session.loggedIn = true;
                        req.session.client_genre = result[0].client_genre;
                        req.session.client_prenom = result[0].client_prenom;
                        req.session.client_nom = result[0].client_nom;
                        req.session.client_email = req.body.email;
                        req.session.client_phone = result[0].client_phone;
                        req.session.client_adresse = result[0].client_adresse;
                        req.session.client_ville = result[0].client_ville;
                        req.session.client_codepostal = result[0].client_codepostal;
                        req.session.client_datenaissance = result[0].client_datenaissance;
                        req.session.isAdmin = result[0].isAdmin;
                        
                        console.log(req.cookies)

                        /*
                        console.log(res.locals)
                        res.locals.loggedIn = req.session.loggedIn;
                        res.locals.client_email = req.session.client_email;
                        */

                        return res.status(200).json({loggedIn: req.session.loggedIn});
                    } else {
                        console.log('Bad password.');
                        return res.send({message: "Mauvais mot de passe !"});
                    }

                } else {
                    console.log("Bad mail.");
                    return res.send({message: "Ce compte n'existe pas !"});
                }
            }
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end()
        }
    },
    retrieveUsersData: async (req, res) => {
        console.log(req.session);
        await res.send("E-mail : " + req.session.client_email);
    },
    checkLoginStatus: async (req, res) => {
        const { client_email } = req.session;
            if (client_email) {
                console.log(client_email);
                return res.status(200).json({ success: { client_email } });
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

    logout: async (req, res) => {
        if (req.session.loggedIn === true) {
            req.session.destroy();
            return res.status(200).json({result: 'SUCCESS'});
        } else {
            return res.stgatsu(400).json({result: 'ERROR'});
        }   
    }
}