const fs = require('fs');
const path = require('path');

module.exports = {
  up: (queryInterface) => {
    const data = fs.readFileSync(path.join(__dirname, 'data', 'contact.json'), 'utf8');
    const searchForm = JSON.parse(data);

    return queryInterface.bulkInsert('contactdetails', searchForm);
  },

  down: queryInterface => queryInterface.bulkDelete('contactdetails', null, {}),
};