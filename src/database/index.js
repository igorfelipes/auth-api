import mongoose, { mongo } from 'mongoose';

const uri =   'mongodb+srv://admin:admin@clusterbase-hj6e6.mongodb.net/authdb?retryWrites=true&w=majority'

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

mongoose.connection.on(
    'error', console.error.bind(console, 'MongoDB connection error: ')
)

export default mongoose;