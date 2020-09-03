import mongoose, { mongo } from 'mongoose';


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

mongoose.connection.on(
    'error', console.error.bind(console, 'MongoDB connection error: ')
)

export default mongoose;