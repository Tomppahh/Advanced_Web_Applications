import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/hello", (req: Request, res: Response) => {
  res.json({ msg: "Hello world!" });
});

app.get("/echo/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  res.json({ id: id });
  console.log("User id: ", id);
});

app.post("/sum", (req: Request, res: Response) => {
  let summa: number = 0;
  const numbers: number[] = req.body.numbers;
  numbers.forEach((number: number) => {
    summa += number;
  });
  res.json({ sum: summa });
  console.log("Sum: ", summa);
});

type TUser = {
  name: string;
  email: string;
}

let users: TUser[] = [];

app.post("/users", (req: Request, res: Response) => {
  const name = req.body.name;
  const email = req.body.email;

  // lippu käyttäjälle, ettei ole vielä listassa
  let userExists = false;

  // onko uusi lisättävä käyttäjä listassa
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name && users[i].email === email) {
      userExists = true;
      break;
    }
  }

  // Jos ei, lisätään listaan.
  if (!userExists) {
    const newUser: TUser = { name, email };
    users.push(newUser);
    console.log("New user added:", newUser);
    res.status(200).json({ message: "User successfully added" });
  } else {
    console.log("User", name, email, "already in database.");
    res.status(200).json({ message: "User already exists" });
  }
});

// lähetetään käyttäjälista takaisin frontendille
app.get("/users", (req: Request, res: Response) => {
  res.status(200)
  res.json(users);
});