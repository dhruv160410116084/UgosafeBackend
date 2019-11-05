let usersModal = require('../modals/users');

let usersLocation = new Map();

let addUserForLocation = ()=>{ 
        console.log('add user for location');
        return new Promise ((resolve,reject)=>{
                  usersModal.findUser({isOwner:false},{_id:0,email:1}).then(documents => {
                documents.forEach(email => {
                        // console.log(email);
                        usersLocation.set(email.email,{lon:1.1,lan:1.1});
                });
                
            console.log(usersLocation);
            resolve();

            }).catch(err =>{
                    console.log(err);
                    reject(err);
            })
        });
        };

        addUserForLocation();
exports.setLiveLocation = (req,res)=>{
        console.log('-------------set----------------');
        usersLocation.set(req.body.email,req.body.location);
        res.send({result:'ok'});
};

exports.getLiveLocation = (req,res)=>{
    console.log('--------------get---------------');
   res.send( usersLocation.get(req.params.email));
};

exports.addUserForLocation=addUserForLocation;