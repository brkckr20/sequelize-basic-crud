'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const context = require('./models');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post("/leagues", function (req, res) {
    if (!req.body.name || !req.body.country) {
        res.send("parametre gerekli")
    }

    const league = context.league.build({
        name: req.body.name,
        country: req.body.country
    });

    league.save().then((rows) => {
        res.send({ isSuccess: true })
    }).catch(() => {
        res.send({ isSuccess: false })
    })
})

app.get("/leagues", function (req, res) {
    context.league.findAll().then(rows => {
        res.send(rows.map(r => {
            let league = {};
            league.id = r.dataValues.id;
            league.name = r.dataValues.name;
            league.country = r.dataValues.country;
            return league;
        }))
    })
})


app.delete("/leagues/:id", (req, res) => {
    res.send("req.params : " + req.params.id);
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});