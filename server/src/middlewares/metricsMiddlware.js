const client = require("prom-client");

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "Request response time in milliseconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});

const totalRequestsCounter = new client.Counter({
  name: "total_requests",
  help: "Total number of requests received",
});

const metricsMiddleware = (req, res, time) => {
  totalRequestsCounter.inc();
  reqResTime.labels({
    method: req.method,
    route: req.url,
    status_code: res.statusCode,
  }).observe(time);
};

module.exports = { metricsMiddleware };
