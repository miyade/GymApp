const User = require('../models/User');
const bcrypt = require('bcrypt');
module.exports={
    async store(req,res){
        try {
           const {firstName, lastName, password, email} = req.body;
           const existingUser = await User.findOne({email});
           if(!existingUser){
               const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                firstName:firstName,
                lastName:lastName,
                password:hashedPassword,
                email:email
               });
               return res.json(user);
           }
          return res.status(400).json({
              message: 'User already exists! Do you want to login instead?'
          });
        } catch (error) {
            throw Error(`Error while registering new user : ${error}`)
        }
    }
}