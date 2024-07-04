import express from 'express'
import db from './db/connectionDB.js';
import customerRouter from './src/modules/custemors/customer.routes.js';
import carRouter from './src/modules/cars/car.routes.js';
import rentRouter from './src/modules/rents/rent.routes.js';
import specailRouter from './src/modules/specialapi/specail.routes.js';
const app = express()
const port = 3000
app.use(express.json());
// &================================================================
app.use("/customer",customerRouter)
app.use("/car",carRouter)
app.use("/rent",rentRouter)
app.use("/specail",specailRouter)

// &================================================================
app.get('*', (req, res,next) => {
    res.json({msg : "404 Not Found"});
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))