let usersModal = require('../modals/users');

let usersLocation = new Map();
let panicMap = new Map();

let addUserForLocation = ()=>{ 
        console.log('add user for location');
        return new Promise ((resolve,reject)=>{
                  usersModal.findUser({isOwner:false},{_id:0,email:1}).then(documents => {
                documents.forEach(email => {
                        // console.log(email);
                        usersLocation.set(email.email,{lon:77.24,lan:22.72});
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
        panicMap.set(req.params.email,usersLocation.get(req.params.email));
        res.send({result:'ok'});
};

exports.getLiveLocation = (req,res)=>{
    console.log('--------------get---------------');
   res.send( usersLocation.get(req.params.email));
};

exports.panicAdd=(req,res)=>{
        console.log('in panic add');
        panicMap.set(req.params.email,usersLocation.get(req.params.email));
        console.log(panicMap);
        res.send({status:"ok"});
}

exports.panicRemove=(req,res)=>{
        console.log('in panic remove');
        panicMap.delete(req.params.email);
        console.log(panicMap);
        res.send({status:"ok"});
}


exports.addUserForLocation=addUserForLocation;