import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
            "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    },
});
/**
 * The 'models' object is provided by the Mongoose lib and stores all the registered models.
 * if a model named "User" already exists in the "models" object, it assigns that existing model
 * to the "User" variable.
 * This prevents redefining the model and ensures that existing model is reused.
 */
// next.js route is only going to be created and running for the time when it is getting called
// const User = model('User', UserSchema);
const User = models.User || model('User', UserSchema);
export default User;