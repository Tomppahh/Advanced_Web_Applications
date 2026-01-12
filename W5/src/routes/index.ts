import { Router, Request, Response } from "express";
import { User, IUser } from '../models/User'
import populateUsers from "../../data/users";

const router: Router = Router();



router.post("/add", async (req: Request, res: Response) => {
    const name = req.body.name;
    const todo = req.body.todo.trim();

    let user = await User.findOne({ name: name });
    
    if (user) {
        user.todos.push({ todo: todo, checked: false });
        await user.save();
    } else {
        const newUser = new User({ name: name, todos: [{ todo: todo, checked: false }] });
        await newUser.save();
    }
    
    res.json({ message: "Todo added" });
})

 

  

router.get("/api/users", async (req: Request, res: Response) => {
   try {
    const users: IUser[] | null = await User.find()
    if (!users || users.length === 0){
        res.status(404).json({message: "No users found"})
        return
    }
    res.json(users)
   } catch (error: any){
        console.log(`Error while fetching users: ${error}`)
        res.status(500).json({message: "Internal server error"})
   }
});

router.get("/todos/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.findOne({ name: id });
    
    if (user) {
        res.json(user.todos);
    } else {
        res.status(404).json({ message: "User not found" });
    }
})

router.delete("/delete", async (req: Request, res: Response) => {
    const name = req.body.name;
    await User.deleteOne({ name: name });
    res.json({ message: "User deleted" });
});

router.put("/update", async (req: Request, res: Response) => {
    const name = req.body.name;
    const todo = req.body.todo.trim();
    
    const user = await User.findOne({ name: name });
    if (user) {
        user.todos = user.todos.filter((t: any) => t.todo !== todo);
        await user.save();
        res.json({ message: "Todo deleted successfully." });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

router.put("/updateTodo", async (req: Request, res: Response) => {
    const name = req.body.name;
    const todo = req.body.todo;
    const checked = req.body.checked;
    
    const user = await User.findOne({ name: name });
    if (user) {
        const todoItem = user.todos.find((t: any) => t.todo === todo);
        if (todoItem) {
            (todoItem as any).checked = checked;
            await user.save();
            res.json({ message: "Todo updated" });
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

router.get("/api/users/populate", async (req: Request, res: Response) => {
    for (let i = 0; i < populateUsers.length; i++) {
        const user: IUser =  new User({
            name: populateUsers[i].name,
            todos: populateUsers[i].todos
        })
        await user.save()
    }
    console.log("Database populated")
    res.json({Message: "Database populated"})
})

export default router
