const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
PORT = 8000;

app.use(express.urlencoded({ extended: false }));

//crating a route
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.send("Patch request");
  })
  .delete((req, res) => {
    return res.send("Delete request");
  });

app.get("/users", (req, res) => {
  const HTML = `<ul>${users
    .map((user) => `<li>${user.first_name} ${user.last_name} </li>`)
    .join("")}</ul>`;
  res.send(HTML);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
