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

        const id  = req.params.id;

        try{
            const product = await Product.findById(id).populate('category')
                
            if (!product){
                return res.status(400).json({ error: 'No registered product'})
            }

            return res.json(product)

        } catch(err){
            return res.status(400).json({ error: 'Error loading product'})
        }
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
        const id  = req.params.id;
        const { category } = req.body;


        const product = await Product.findOne({ _id: id});

        if (!product){
            return res.status(401).json({ error: 'product not found.'});
        }

        if(category){
            var categoryExists = await Category.findOne({ name: category });
                      
            if (!categoryExists){
                return res.status(400).json({ error: 'Category not exists'});
            }

            req.body.category = categoryExists._id;
        }

        if(category && (JSON.stringify(product.category._id) !== JSON.stringify(categoryExists._id))){

            const oldCategory = await Category.findOne(product.category)

            oldCategory.products.splice(oldCategory.products.indexOf(product._id), 1)
            
            oldCategory.save()

            product.category = categoryExists._id;

            await  product.save()

            await categoryExists.products.push(product);

            await categoryExists.save();
        }

        try{
            const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
            
            return res.json(product)
        } catch(err){
            console.log(err)
            return res.status(401).json({ error: 'Error update product.'})
        }
    }

    async destroy(req, res){

        const id = req.params.id;
        
        try{
            const product = await Product.findOneAndDelete({ _id: id})

            if (!product){
                return res.status(401).json({ error: 'product not found.'})
            }
            
            return res.json({ message: 'Product removed successful'})
        } catch{
            return res.status(401).json({ error: 'Error remove product.'})
        }

    }
}

export default new ProductController();