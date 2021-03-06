const express = require('express');
const axios = require('axios');
const router = express.Router();
const accountSid = 'AC1ed15c2b932127a8396c2bb567595884';
const authToken = '19bad305d655d5a0cbc8478ed7ad925a';
const client = require('twilio')(accountSid, authToken);
const cron = require('node-cron');
const pool = require('../pool');

router.get('/', (req, res) => {
    let search = req.query.search
    let url = process.env.API_URL
    let key = process.env.API_KEY
    console.log(`values are ${search}, ${url}, ${key}`);
    
    axios.get(`${url}?token=${key}&q=${search}&total=10`)
    .then(response => {
        res.send(response.data)
        console.log(`woot!  got stuff for plant on serverside`, response);
    }).catch( error => {
        console.log(`error getting plant stuff`, error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    console.log(`req.body is`, req.body);
    
    res.sendStatus(201);
});

function checkWater (){
    console.log(`in checkWater`);
    
    axios.get('/')
        let sqlText = `SELECT * FROM "water" WHERE "watered" = $1;`;
        pool.query(sqlText, [false])
            .then(response => {
                let plantArray = response.rows;
                if (plantArray.length === 0) {
                    console.log(`no plants to water`);
                }
                else {
                    console.log(`in checkWater, response is`, plantArray);
                    let newArray = [];
                    for (plant of plantArray) {
                        console.log(`plant name is`, plant.name);
                        newArray.push(plant.name);
                    }
                    client.messages
                        .create({
                            body: `You need to water ${newArray}`,
                            from: '+12679037114',
                            to: '+12156923748'
                        })
                        .then(message => console.log(message.sid));
                }
            }).catch(error => {
                console.log(`error getting response`, error);
            })
    }


cron.schedule('56 11 * * *', () => {
    console.log(`running node cron at 12pm`);
    // checkWater();
},
    {
        scheduled: true,
    });
module.exports = router;