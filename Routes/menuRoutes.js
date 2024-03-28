const express = require('express');
const router = express.Router();
const menuItem = require('../model/menu');

router.post('/menu', async (req, res) => {

    try {
        const data = req.body
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log("response Menuitem data saved");
        res.status(200).json(response)




    } catch (error) {

        console.log(error);
        res.status(500).json({ error: 'internal server error' });


    }
});



router.get("/menu", async (req, res) => {
    try {

        const data = await menuItem.find();
        console.log("Menu data fetched sucessfullly");
        res.status(200).json(data);
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

router.get("/menu/:tasteType", async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const response = await menuItem.find({ taste: tasteType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste type' });
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

//comment added
module.exports = router;