const express = require('express');
const port = process.env.PORT || 8080;
var app = express();

app.listen(
    port, () => console.log(`Listening on port ${port}..`)
);

app.get('/', 
    (req, res) => {
        res.send('Hello World!')
    }
)