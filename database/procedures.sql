use sessions;
DELIMITER //


-- USER REGISTER
CREATE OR REPLACE PROCEDURE register (IN client_genre VARCHAR(255), IN client_email VARCHAR(255), IN client_password VARCHAR(255), IN client_nom VARCHAR(255), IN client_prenom VARCHAR(255), IN client_adresse VARCHAR(255), IN client_phone VARCHAR(255), IN client_ville VARCHAR(255), IN client_codepostal VARCHAR(255), IN client_datenaissance VARCHAR(255))
NOT DETERMINISTIC
CONTAINS SQL
BEGIN
    INSERT INTO t_client INSERT INTO `t_client` (`client_genre`, `client_email`, `client_password`, `client_nom`, `client_prenom`, `client_adresse`, `client_phone`, `client_ville`, `client_codepostal`, `client_datenaissance`, `isAdmin`) VALUES (client_genre, client_email, client_password, client_nom, client_prenom, client_adresse, client_phone, client_ville, client_codepostal, client_datenaissance);
END //

-- USER LOGIN
CREATE OR REPLACE PROCEDURE checkCredentials(IN p_user_email VARCHAR(255), IN p_user_password VARCHAR(255))
NOT DETERMINISTIC
CONTAINS SQL
BEGIN
    SELECT id, email
    FROM User
    WHERE User.email = p_user_email AND User.password = SHA2(p_user_password, 512);
END //