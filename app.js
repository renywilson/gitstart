const path = require('path');
const fs=require('fs')
const express = require('express');
var cors = require('cors')
const https=require('https')
const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');
const Download=require('./models/download');
const helmet=require('helmet')
const compression=require('compression')
const morgan=require('morgan')
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const premiumFeatureRoutes = require('./routes/premiumFeature')
const resetPasswordRoutes = require('./routes/resetpassword')
const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
const app = express();
const dotenv = require('dotenv');
require('dotenv').config();
// get config vars
dotenv.config();
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accessLogStream}));

console.log()
app.use(cors());   

// app.use(bodyParser.urlencoded());  ////this is for handling forms


app.use(express.json());  //this is for handling jsons
const privatekey=fs.readFileSync('server.key')
const certificate=fs.readFileSync('server.cert')

app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password', resetPasswordRoutes);

User.hasMany(Expense);
 Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
User.hasMany(Download)
Download.belongsTo(User);
console.log(process.env.NODE_ENV);
sequelize.sync()
    .then(() => {
   // https.createServer({key:privatekey,cert:certificate},app).listen(process.env.PORT||4500);
   app.listen(process.env.PORT||4500);
    })
    .catch(err => {
        console.log(err);
    })