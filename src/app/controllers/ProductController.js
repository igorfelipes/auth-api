import Product from '../models/Product';
import Category from '../models/Category';

class ProductController{

    async index(req, res){
        try{
            const products = await Product.find().populate('category');

            if (products.length === 0){
                res.json({ message: 'No registered products'})
            }

           return res.json(products)
        } catch{
            return res.status(400).json({ error: 'Error Loading products'})
        }
    }

    async show(req, res){

        return res.json({user: req.userId})
    }

    async store(req, res){
        
        const { name, category } = req. body;

        const productExists = await Product.findOne({ name })

        if (productExists){
            res.status(400).json({ error: 'Product already exists'})
        }

        const categoryExists = await Category.findOne({ name: category })

        if (!categoryExists){
            res.status(400).json({ error: 'Category not exists'})
        }

        console.log(categoryExists)
        req.body.category = categoryExists._id

        try{
            const product = await Product.create(req.body)

            await categoryExists.products.push(product)

            await categoryExists.save()

            return res.json(product)

        } catch{
            return res.status(400).json({ error: 'Registration failed.'}) 
        }
    }

    async update(req, res){

        return res.json({user: req.userId})
    }

    async destroy(req, res){

      return res.json({user: req.userId})
    }
}

export default new ProductController();