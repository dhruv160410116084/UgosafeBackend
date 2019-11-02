let userModal = require('../modals/users');
let locationContorller = require('./location');

exports.RegisterUser = (req,res)=>{
        userModal.addUser(req.body).then((user)=>{
                // console.log(user);
                locationContorller.addUserForLocation().then(()=>{
                        res.send(user);
                }).catch(err =>{
                        console.log('some error in addUserForLocation');
                        console.log(err);
                });

            }).catch((err)=>{
                res.send(err);
            });
};

exports.UserLogin = (req,res) =>{
        userModal.findUser(req.body).then((user)=>{
                if(user.length == 1)
                        res.send(user);
                else
                        res.send({status:"no user found"});
        }).catch(err =>{
            res.send(err);
        });
};

exports.updateProfile = (req,res) => {
        userModal.updateUser(req.body.selection , req.body.update).then(document => {
                // console.log(document);
                res.send(document);
        }).catch(err =>{
                // console.log(err);
                res.send(err);
        });
};

exports.UserPayment = (req,res)=>{
                userModal.payment(req.body).then(status =>{
                        res.send({status:status});
                }).catch(err =>{
                        res.send({err:err});
                });
};

exports.fetchProfile = (req,res)=>{
        console.log('in fetch profile');
                userModal.findUser({_id:req.params.id}).then(document =>{
                                res.send(document);
                }).catch(err =>{
                        console.log(err);
                                res.send(err);
                });
};

exports.fetchCenters = (req,res)=>{
        console.log('in fetch centers');
        userModal.findUser({isOwner:true},{money:0,isOwner:0,password:0,__v:0}).then(users =>{
                res.send(users);
        }).catch(err =>{
                        res.send(err);
        });
}