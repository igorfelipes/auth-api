import Category from '../models/Category';

class CategoryController{

    async index(req, res){
        
        try{
            const categories = await Category.find().populate('products');

            if (categories.length === 0){
                res.json({ message: 'No registered categories'})
            }

           return res.json(categories)
        } catch{
            return res.status(400).json({ error: 'Error Loading categories'})
        }
    }

    async store(req, res){
        
        const { name } = req. body;

        const categoryExists = await Category.findOne({ name })

        if (categoryExists){
            res.status(400).json({ error: 'Category already exists'})
        }

        try{
            const category = await Category.create(req.body)

            return res.json(category)

        } catch(err){
            return res.status(400).json({ error: 'Registration failed.'}) 
        }
    }

    async show(req, res){

        const id  = req.params.id;

        try{
            const category = await Category.findById(id).populate('products')
                
            if (!category){
                return res.status(400).json('No registered categories')
            }

            return res.json(category)

        } catch(err){
            return res.status(400).json({ error: 'Error loading category'})
        }
    }

    async update(req, res){
        return res.json({user: req.userId})
    }

    async destroy(req, res){
        return res.json({user: req.userId})
    }
}

export default new CategoryController();