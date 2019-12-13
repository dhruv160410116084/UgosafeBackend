var mongoose = require('mongoose');
let rentModal = require('./rent');

var userSchema = new mongoose.Schema({
    name:{
            type:String,
            required:true
    },

    email:{
            unique:true,
            required:true,
            type:String
    },
    password:{
            type:String,
            required:true
    },
    isOwner:{
            type:Boolean,
            required:true,
    },
    money:{
            type:Number,
            default:1000
    },
    location:{
            type:Object,
            lat:String,
            lon:String
    },
});

let users=mongoose.model('users',userSchema);

exports.addUser = (userObj)=>{
        return  users.create(userObj).then(document=>{
                        console.log('successful insertion in users');
                        console.log(document);
                        return  document;
                }).catch((err)=>{
                        console.log('some error occurred');
                        console.log(err)
                       return err;
                });
     
};

exports.updateUser = (userObj,newObj)=>{
        return new Promise((resolve,reject)=>{
                users.updateOne(userObj,newObj).then(document =>{
                        if(document.nModified === 1)
                                resolve(document);
                        else 
                                reject({stauts: "can't find record for update"});
                }).catch(err => {
                        console.log('errore in update user ');
                        reject(err);
                });
        });
};

exports.findUser = (userObj,colView,isLogin)=>{
        return new Promise((resolve,reject)=>{
               
                console.log(userObj); // {isOwner:false}
                users.find(userObj,colView).then(document =>{
                        console.log(document);
                        if(isLogin)
                          resolve(document[0]);
                        else
                                resolve(document);
                }).catch(err => {
                        console.log('errore in findUser');
                        reject(err);
                });
        });
}

exports.payment = (userObj)=>{
        console.log('userObj:');
        console.log(userObj);
        return new Promise((resolve,reject)=>{
                checkBalance(userObj.sender,userObj.cost).then((user)=>{
                        console.log('after checkbalance');
                        console.log(user);
                                if(user.length > 0){
                                        rentModal.updateRent({_id : userObj.rentId,isPaid:false},{isPaid : true}).then(document =>{
                                                if(document.nModified === 1){
                                                        console.log('after update rent');
                                                        console.log(document);
                                                        users.updateOne(userObj.receiver,{$inc:{money:userObj.cost}}).then(()=>{
                                                                return  users.updateOne(userObj.sender,{$inc:{money:-userObj.cost}});
                               
                                                        }).then(()=>{
                                                                console.log('both transection finished');
                                                                resolve("success");
                                                        }).catch(err =>{
                                                                console.log(err);
                                                        })
                                                        
                                                }
                                                else
                                                        reject({status:"no such record found in rent collection for payment"});
                                        })
                                }
                                else{
                                        reject({status:"balance is low"});
                                }
                })
         .catch(err => {
                        console.log('errore in payment');
                        reject(err);
                });
        });
};

let checkBalance = (userObj,cost)=>{
        return users.find({email:userObj.email,money:{
                $gte:cost
        }});
};



