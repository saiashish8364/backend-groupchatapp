const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs").promises;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    // Read the content of the file
    const data = await fs.readFile("messages.txt", "utf-8");

    res.send(`
      ${data}<br/>
      <form action="/" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')">
        <input type="text" name="message" id="message"/>
        <input type="hidden" name="username" id="username"/>
        <br/>
        <button type="submit">Send</button>
      </form>
    `);
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", (req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  fs.writeFile(
    "messages.txt",
    `${username}:${message}\n`,
    { flag: "a" },

    res.redirect("/")
  );
});

app.get("/login", (req, res) => {
  res.send(`
    <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
      <input id="username" type="text" name="title"/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.listen(3000);
