const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const categoryRoutes = require('./routes/categoryRoutes');


dotenv.config();

const app = express();


const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/categories', categoryRoutes);



app.get('/', (req,res)=>{
    res.json({message:"hello world"});
})


app.use('/api/admin', require('./routes/adminRoutes') );


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));