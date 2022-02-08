const app = require("express")();
const { fork } = require("child_process");
const cors = require("cors");

app.use(cors());

let countClientCallApi = 1;

app.get("/isprime", (req, res) => {
  console.log(`client ${countClientCallApi} is called`);
  countClientCallApi++;

  const childProcess = fork("./isprime.js");
  childProcess.send({ number: parseInt(req.query.number) });
  childProcess.on("message", (message) => res.send(message));
});

app.listen(8081, () => console.log("Listening on 8081"));
