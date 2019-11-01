let mongoose = require('mongoose');
let rentModal = require('./rent');

let carpoolSchema = new mongoose.Schema({
        rentId:{
            type:String,
            required:true
        },
        mainCustomerId:{
            type:String,
            required:true
        },
        requestedUsers:{
            type:Array,
            required:true
        },
        startPosition:{
            type:Object,
            lat:String,
            lon:String
        },
        endPosition:{
            type:Object,
            lat:String,
            lon:String
        }
});

let carpool = mongoose.model('carpool',carpoolSchema);

exports.addCarpool = (obj)=>{
  return   carpool.create(obj).then(document =>{
        console.log('success in carpool create');
            return document;
    }).catch(err =>{
        console.log('err in carpool');
        console.log(err);
        return err;
    });

};

exports.addRequestedUser = (obj,email) =>{
    console.log('in addRequestedUser ');
    return carpool.update(obj,{$addToSet:{requestedUsers:email}}).then(document =>{
            console.log(document);
            return document;
    }).catch(err =>{
        console.log(err);
        return err;
    })
};

exports.acceptCarpoolRequestForUser = (obj,email)=>{
    console.log('in accept request');

       return  carpool.update(obj,{$pull:{requestedUsers:email}}).then( document =>{
                console.log(document.nModified);
                return rentModal.addCarpoolUsers({_id:obj.rentId},email);
        }).then((document)=>{
                console.log(document);
                return document;
        }).catch(err =>{
            console.log(err);
            return err;
        })
};

exports.getRequestForRent = (rentId)=>{
    console.log('in getREquestForRent');
    return carpool.find({rentId : rentId}).then(document =>{
            return document;
    }).catch(err =>{
        return err;
    });
};

exports.find=(obj)=>{
    console.log('in find');
    return carpool.find({endPosition:obj}).then(document =>{
        return document;
    }).catch(err =>{
        return err;
    });
};