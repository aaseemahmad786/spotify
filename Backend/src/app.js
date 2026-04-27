const express=require ('express');
const path=require('path');
const cookieParser=require('cookie-parser');
const cors = require('cors');
const authRoutes=require('./routes/auth.routes');
const musicRoutes=require('./routes/music.routes');

 


const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..','public')));
app.use('/api/auth',authRoutes);
app.use('/api/music',musicRoutes);
 
module.exports=app;
