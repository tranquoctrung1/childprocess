const app = require("express")();
const cors = require("cors");
const workerpool = require("workerpool");

app.use(cors());

const pool = workerpool.pool(`./isprime2.js`, { minWorkers: "max" });

let countClientCallApi = 1;

app.get("/isprime", (req, res) => {
  pool
    .exec("isprime", [req.query.number])
    .then(function (result) {
      res.send(result); // outputs 55
    })
    .catch(function (err) {
      console.error(err);
    })
    .then(function () {
      pool.terminate(); // terminate all workers when done
    });
});

app.listen(8081, () => {
  console.log("Listening on 8081");
});
