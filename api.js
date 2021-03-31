const models = require("./models");
const server = require("./server");
const members = models.members;
const db = models.db;
const connect = models.connect;
const syncTables = models.syncTables;
const app = server.app;

//Below are endpoints associated with your API

app.get("/members", (req, res) => {
  const body = req.body;
  let reqName = body.name;
  if (reqName == undefined) {
    res.status(401).end(JSON.stringify({ status: 401, success: false }));
  }
  members.findOne({ where: { name: reqName } }).then((result) => {
    if (result == null) {
      res.status(404).end(JSON.stringify({ status: 404, success: false }));
    } else {
      res.status(200).end(JSON.stringify(result));
    }
  });
});

app.get("/members/:id", (req, res) => {
  const params = req.params;
  let id = params.id;
  members.findByPk(id).then((result) => {
    if (result == null) {
      res.status(404).end(JSON.stringify({ status: 404, success: false }));
    } else {
      res.status(200).end(JSON.stringify(result));
    }
  });
});

app.patch("/members/:id", (req, res) => {
  const params = req.params;
  const body = req.body;
  let id = params.id;
  let name = body.name;

  if (name == undefined || id == undefined) {
    res.status(401).end(JSON.stringify({ status: 401, success: false }));
  }

  try {
    members.update({ name: name }, { where: { id: id } }).then((result) => {
      if (result[0] > 0) {
        res.status(200).end(
          JSON.stringify({
            status: 200,
            rowsAffected: result[0],
            success: true,
          })
        );
      } else {
        res.status(404).end(JSON.stringify({ status: 404, success: false }));
      }
    });
  } catch (Exception) {
    res.status(500).end(JSON.stringify({ status: 500, success: false }));
  }
});

app.delete("/members/:id", (req, res) => {
  const params = req.params;
  const id = params.id;
  members.destroy({ where: { id: id } }).then((result) => {
    if (result > 0) {
      res.status(200).end(JSON.stringify({ status: 200, success: true }));
    } else {
      res.status(404).end(JSON.stringify({ status: 404, success: false }));
    }
  });
});

app.post("/members", (req, res) => {
  const body = req.body;
  try {
    let name = body.name;
    let major = body.major;
    if (major == null || name == null) {
      throw new Exception("Bad Request");
    }
    members.create({ name: name, major: major }).then((result) => {
      console.log(result);
      res.status(200).end(
        JSON.stringify({
          status: 200,
          success: true,
          member: result.dataValues,
        })
      );
    });
  } catch (error) {
    res
      .status(401)
      .end(
        JSON.stringify({ status: 401, success: false, message: "Bad Request" })
      );
  }
});
