import User from '../models/User';


class UserController{

    async index(req, res){
        
        try{
            const users = User.find()

           return res.json(users)
        } catch{
            return res.status(400).json({ error: 'Error Loading users'})
        }
    }

    async store(req, res){

        const { email } = req.body

        const userExists = await User.findOne({email})
        
        if(userExists)
            return res.status(400).json({ error: 'User aready exists. '})

        try{
            const user = await User.create(req.body)

            user.password = undefined;
            
            return res.json(user)
        }catch{
            return res.status(400).json({ error: 'Registration failed.'})
        }
    }

    async update(req, res){

        const {oldpassword, email, password, name} = req.body;

        const user = await User.findById(req.userId).select('+password')

        
        if(name &&(name !== user.name)){
            user.name = name;
        }

        if (email !== user.email){

            const userExists = await User.findOne({ email })

            if(userExists){
                return res.status(401).json({ error: 'User alredy exists.'});
            }

            user.email = email;
        }

        
        if(oldpassword){
            if(!(await user.checkPassword(oldpassword)))
                return res.status(401).json({ error: 'Password does not match.'});
            else{
                try {
                    user.password = password

                }
                catch{
                    return res.status(401).json({ error: 'failed to update the user'})
                }
            }
        }


        await user.save() 

        const { id } = user;
        
        return res.json({
            id,
            name,
            email,
        })
    }
}

export default new UserController();