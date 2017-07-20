const DriversControllers = require('../controllers/drivers_controllers');

module.exports = (app) => {
    //Watch for incoming requests of methods
    //to the route to http://localhost:3050/api
    app.get('/api', DriversControllers.greeting);
    //We are passing references to the function. We are not doing DC.greeting(), so the function doesn't run on app start.
    app.post('/api/drivers', DriversControllers.create);

    app.put('/api/drivers/:id', DriversControllers.edit);

    app.delete('/api/drivers/:id', DriversControllers.delete);

    app.get('/api/drivers', DriversControllers.index);
};
