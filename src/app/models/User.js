import mongoose from '../../database';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    is_superuser: {
        type: Boolean,
        default: false
    },
  
},{
    timestamps : true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    versionKey: false
})

UserSchema.methods.checkPassword = async function(password){
    return bcrypt.compare(password, this.password)
}


UserSchema.pre('save',  async function (next){
    const hash = await  bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
} )


const User = mongoose.model('User', UserSchema);

export default User;