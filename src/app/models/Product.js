import mongoose from '../../database';


const ProductSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    }
  
},{
    timestamps : true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    versionKey: false,
})


const Product = mongoose.model('Product', ProductSchema);

export default Product;