
//const { JSON } = require('sequelize');
const Expense = require('../models/expenses');
const User = require('../models/users');
const sequelize = require('../util/database');

const S3Service=require('../services/S3services')
const UserServices=require('../services/userservices')

const Download = require('../models/download');

const addexpense =async (req, res) => {
    const t=await sequelize.transaction();
    try{
    const { expenseamount, description, category } = req.body;

   
    const expense=await Expense.create({ expenseamount, description, category, userId:req.user.id},{transaction:t})
       
        let TExpence=Number(expenseamount)+Number(req.user.totalExpences)
        console.log(TExpence)
       await User.update({totalExpences:TExpence},
            {
             where: { id:req.user.id},
            transaction:t
        })
        await t.commit();
        return res.status(201).json({expense:expense, success: true } );
        
    }
   

catch (err){
    console.log(err);
    await t.rollback();
    return res.status(500).json({success : false, error: err})
    
}
}



const getexpenses = async (req, res) => {
  
    const ITEMS_PER_PAGE = +req.query.pageSize || 3
    const page = +req.query.page ||1
    console.log('present page',page)
    const offset = (page - 1) * ITEMS_PER_PAGE;
  console.log('off set value  ' ,offset)
    try {
      const totalCount = await Expense.count({ where: { userId: req.user.id } });
      console.log(totalCount)
      const expenses = await Expense.findAll({
        where: { userId: req.user.id },
        offset,
        limit: ITEMS_PER_PAGE
      });
  console.log('values',expenses)
      const lastPage = Math.ceil(totalCount / ITEMS_PER_PAGE);
  
      res.status(200).json({
        expenses,
        pageData: {
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalCount,
          nextPage: page + 1,
          hasPreviousPage: page > 1,
          previousPage: page - 1,
          lastPage: lastPage
        },
        success: true
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err, success: false });
    }
  };
  
  


const deleteexpense = async (req, res) => {
    try{
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
   await Expense.destroy({where: { id: expenseid, userId:req.user.id}}).then((noofrows) => {
        if(noofrows === 0){
            return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
        }
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    })}
    catch(err ) {
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    }
}

const downloadExpenses =  async (req, res) => {
  try {
    const expenses = await UserServices.getExpenses(req);
    console.log(expenses);
    const stringifiedExpenses = JSON.stringify(expenses);
    const filename = `Expense${req.user.id}/${new Date()}.txt`;

    const fileUrl = await S3Service.uploadToS3(stringifiedExpenses, filename);
    console.log(fileUrl);
   // res.status(200).json({ fileUrl: fileUrl, success: true });
    await Download.create({
      fileUrl: fileUrl,
      downloadDate: new Date(),
      userId: req.user.id,
    });

    // Return the file URL in the response
    res.status(200).json({ fileUrl: fileUrl, success: true });
  } catch (err) {
    console.log(err);
    // Handle the error and send an appropriate response
    res.status(200).json({ fileUrl: '', success: false, error: err.message });
  }
};

const downloadfile= async (req, res) =>{
    try {
        const downloads = await Download.findAll({ where: { userId: req.user.id }, attributes: ['fileUrl'] });
    
        const fileUrls = downloads.map((download) => download.fileUrl);
    console.log(fileUrls)
        return res.status(200).json({ fileUrls, success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ fileUrls: [], success: false, error: error.message });
      }
}



module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    downloadExpenses ,
   downloadfile,
  
}
