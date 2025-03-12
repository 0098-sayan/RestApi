const express = require('express');
const users = require("./MOCK_DATA.json");

const app = express();
PORT = 8000;

app.get("/users", (req,res)=>{
    const HTML=`<ul>${users.map((user)=>`<li>${user.first_name} ${user.last_name} </li>`).join('')}</ul>`;
    res.send(HTML);
})

app.post("/user", (req,res)=>{
    res.send("Post request");
})

//Rest api
app.get("/api/users",(req,res) =>{
    return res.json(users);
})

app.get("/api/users/:id", (req,res)=>{
    const id = Number(req.params.id);
    const user= users.find((user)=>user.id === id);
    return res.json(user);
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
