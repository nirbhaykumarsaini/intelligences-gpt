// app.get("/metrics", async (req, res) => {
//     res.setHeader("Content-Type", client.register.contentType);
//     const metrics = await client.register.metrics();
//     res.send(metrics);
// });

const client = require("prom-client");

exports.metrics = async (req, res, next) => {
    try {
        res.setHeader("Content-Type", client.register.contentType);
        const metrics = await client.register.metrics();
        res.send(metrics);
    } catch (error) {
        next(error);
    }
};