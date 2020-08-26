import mongoose from '../../database';


const CategorySchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
  
},{
    timestamps : true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    versionKey: false
})


const Category = mongoose.model('Category', CategorySchema);

export default Category;