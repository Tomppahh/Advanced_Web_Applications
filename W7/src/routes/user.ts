import { Request, Response, Router } from "express";
import { body, Result, ValidationError, validationResult } from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"
import path from "path"

interface IUser {
    email: string
    password: string
}

const usersFilePath = path.join(__dirname, "../../../data/users.json")

function readUsers(): IUser[] {
    try {
        const data = fs.readFileSync(usersFilePath, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

function writeUsers(users: IUser[]) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users))
}

const router: Router = Router()

router.post("/register",
    body("email").trim().isLength({min: 3}),
    body("password").isLength({min: 4}),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const users = readUsers()
            let existingUser = null
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === req.body.email) {
                    existingUser = users[i]
                    break
                }
            }
            if (existingUser) {
                return res.status(403).json({message: "Email already exists"})
            }
            
            const salt: string = bcrypt.genSaltSync(6)
            const hash: string = bcrypt.hashSync(req.body.password, salt)

            const newUser: IUser = {
                email: req.body.email,
                password: hash
            }
            
            users.push(newUser)
            writeUsers(users)

            return res.status(200).json({
                email: newUser.email,
                password: newUser.password
            })

        } catch (error: any) {
            console.error(`Error during registration: ${error}`)
            return res.status(500).json({error: "Internal Server Error"})
        }
    }
)

router.post("/login",
    body("email").trim().isLength({min: 3}),
    body("password").isLength({min: 4}),
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const users = readUsers()
            let user = null
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === req.body.email) {
                    user = users[i]
                    break
                }
            }
            if (!user) {
                return res.status(401).json({message: "Invalid credentials"})
            }

            const match = bcrypt.compareSync(req.body.password, user.password)
            if (!match) {
                return res.status(401).json({message: "Invalid credentials"})
            }

            const token = jwt.sign({email: user.email}, process.env.SECRET as string)
            return res.status(200).json({token: token})

        } catch (error: any) {
            console.error(`Error during login: ${error}`)
            return res.status(500).json({error: "Internal Server Error"})
        }
    }
)
router.get("/list", async (req: Request, res: Response) => {
    try {
        const users = readUsers()
        return res.status(200).json(users)
        return res.status(200).json(users)
    } catch (error: any) {
        console.log(`Error while fetching users ${error}`)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

export default router