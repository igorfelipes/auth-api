import mongoose from '../../database';
import Product from '../models/Product'


const CategorySchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
  
},{
    timestamps : true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    versionKey: false
})


CategorySchema.methods.cascadeRemove = async function (){
    this.products.map( async product =>{
        await Product.findOneAndDelete({ _id: product._id})
    })
}

const Category = mongoose.model('Category', CategorySchema);

export default Category;