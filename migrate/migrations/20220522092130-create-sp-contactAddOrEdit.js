'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `CREATE DEFINER=root@localhost PROCEDURE contactAddOrEdit(
         IN _contact_id INT(5),
         IN _firstname VARCHAR(45),
         IN _lastname VARCHAR(45),
         IN _email VARCHAR(45),
         IN _phone CHAR(13)
      )
      BEGIN
         IF _contact_id = 0 THEN
            INSERT INTO contactdetails(firstname,lastname,email,phone)
            VALUES (_firstname,_lastname,_email,_phone);
            SET _contact_id = last_insert_id();
         ELSE
            UPDATE contactdetails
            SET
            firstname = _firstname,
            lastname = _lastname,
            email = _email,
            phone = _phone
            WHERE contact_id = _contact_id;
         END IF;
         SELECT _contact_id AS contact_id;
      END;`
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      `DROP PROCEDURE contactAddOrEdit;`
    );
  }
};