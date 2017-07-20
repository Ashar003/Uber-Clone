const Driver = require('../models/driver');

module.exports = {
    greeting(req, res){ //es6
        res.send({hi: 'there'});
    },

    index(req, res, next){
        const { lng, lat } = req.query;
        // GET Ex: 'http://google.com?lng=80&lat=20'  AFTER QUESTION MARK is the query string.

        Driver.geoNear(
            { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }, //*NEAR FIELD ERROR*
            {spherical: true, maxDistance: 200000 }
        ).then(drivers => {
            res.send(drivers)
        })
        .catch(next);
    },

    create(req, res, next){
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next); //Call next if an error exists.
    },
    edit(req, res, next){
        const driverId = req.params.id; //id matches ':id'
        const driverProps = req.body;

        Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
            .then(() => Driver.findById({ _id: driverId}))
            .then(driver => res.send(driver))
            .catch(next);
    },

    delete(req, res, next){
        const driverId = req.params.id; //id matches ':id'
        
        Driver.findByIdAndRemove({ _id: driverId})
            .then(driver => {
                res.status(204).send(driver);
            }).catch(next);
        
    }
//THE findByIDandRemove returns in the callback the user that was deleted.
};


//es5:
//{greeting: function(req,res){}}