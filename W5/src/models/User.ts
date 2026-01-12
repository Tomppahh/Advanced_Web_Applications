import mongoose, {Document, Schema} from 'mongoose';

interface ITodo {
    todo: string
    checked: boolean
}

interface IUser extends Document {
    name: string
    todos: ITodo[]
}

let userSchema: Schema = new Schema({
    name: {type: String, required: true},
    todos:[{
        todo: {type: String, required: false},
        checked: {type: Boolean, default: false}
    }] 
})

const User: mongoose.Model<IUser> =  mongoose.model<IUser>("User", userSchema)

export {User, IUser}