const express = require('express');
const router = express.Router();
const Person = require('../model/person');

router.post('/Person', async (req, res) => {

    try {
        const data = req.body
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("response data saved");
        res.status(200).json(response)



    } catch (error) {

        console.log(error);
        res.status(500).json({ error: 'internal server error' });


    }
})

router.get("/Person", async (req, res) => {
    try {
        // const data=req.body;
        const data = await Person.find();
        console.log("data fetched sucessfullly");
        res.status(200).json(data);
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});
router.get("/Person/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.put("/person/:Id", async (req, res) => {
    try {

        const personid = req.params.Id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personid, updatePersonData, {
            new: true,
            runValidators: true,

        })
        if (!response) {
            return res.status(404).json({ err: 'personid not found' });
        }
        console.log('data updated');
        res.status(200).json(response);

    } catch (err) {

        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }

})

router.delete('/person/:Id', async (req, res) => {
    try {
        const personId = req.params.Id;
        const deletePerson = await Person.findByIdAndDelete(personId);
        console.log('data deleted');
        res.status(200).json({ msg: 'Person data succesfully' });

    } catch (err) {

        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }

})

module.exports = router;