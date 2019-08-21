import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = mongoose.connection;

mongoose.connect('mongodb+srv://admin:admin@quakekids-vidtr.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () =>  console.log('DATABASE INIT'));

export default db