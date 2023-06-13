const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const Forgotpassword = require('../models/forgotpassword');


var Sib=require('sib-api-v3-sdk')
 require('dotenv').config();
 var client=Sib.ApiClient.instance
var apiKey=client.authentications['api-key']
 apiKey. apiKey='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'
 const transEmailApi=new Sib.TransactionalEmailsApi()


const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
    
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
          throw new Error('User does not exist');
        }
    
        const id = uuid.v4();
        const forgotPasswordRow = await user.createForgotpassword({
          id,
          active: true,
         
        });

        const Sender={  
                email:'alwinwilsonalukkal@gmail.com'
            }
           const receiver=[{
               email:'renywilson@gmail.com '
            
           }]
            
          transEmailApi.sendTransacEmail( {
                Sender, // Change to your recipient
              to: receiver, // Change to your verified sender
            subject: 'Reset Password',
                textContent: 'Reset password by clicking below Link.........',
                htmlContent:`<a href="http://localhost:4500/password/resetpassword/${id}">Reset password</a>`
            })
       console.log(id)
        console.log(forgotPasswordRow)
        if (forgotPasswordRow && forgotPasswordRow.dataValues.id) {
            console.log('Email sent')
          return res.status(202).json({
            success: true,
            message: 'Link to reset password sent to your email',
          });
        } else {
          console.log('Error creating forgot password row:', forgotPasswordRow);
          return res.status(500).json({
            success: false,
            message: 'Error sending password reset email',
          });
        }
      } catch (err) {
        console.error(err);
        return res.json({ message: err, sucess: false });
      }
    };

const resetpassword =async (req, res) => {
    const id =  req.params.id;
    console.log(id)
   const forgotpasswordrequest= await Forgotpassword.findOne({ where : { id }})
    try{
        if(forgotpasswordrequest){
            console.log(forgotpasswordrequest)
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
          
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>
          `
                                )
                                console.log(forgotpasswordrequest)
            res.end()
                                    
        }
    }
    catch(err){ 
          console.log(err)
        throw new Error()
     
    }
   
   }
const updatepassword = async(req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
       await Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                                console.log('Successfuly update the new password')
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}


module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}