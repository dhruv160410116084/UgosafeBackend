let mongoose = require('mongoose');

let rentSchema = new mongoose.Schema({
    rentStartDate:{
        type:String,
        required:true
    },
    rentEndDate:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    },
    ownerIdEnd:{
        type:String,
        required:true
    },
    startCity:{
        type:String,
        
        required:true
    },
    endCity:{
        type:String,
        required:true
    },
    isRequestAccepted:{
        required:true,
        type:String,
    },
    cost:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    isCarpool:{
        type:Boolean,
        required:true
    },
    carpoolUsers:{
        type:Array
    },
    equipments:[{
        type:String,
        required:true
}],
    isHomeDelivery:{
    type:Boolean,
    required:true
    },
    driver:{
        type:Boolean,
        required:true
    },
    feedback:{
        type:String
    },
    location:{
        type:Object,
        lat:String,
        lon:String,
        required:true
    }
});

let rent = mongoose.model('rent',rentSchema);


exports.insertRent = (rentObj)=>{
    // console.log(rentObj);
    return new Promise((resolve,reject)=>{
            rent.create(rentObj).then(document =>{
                    // console.log(document);
                    console.log('rent inserted');
                    resolve('rent inserted');
            }).catch((err)=>{
                console.log('rent insertion error');
                reject(err);
            });
            
    });
};

exports.updateRent = (rentObj,newObj)=>{
    return new Promise((resolve,reject)=>{
        rent.update(rentObj,{$set:newObj}).then(document =>{
                // console.log(document);
                console.log('rent Updated');
                resolve(document);
        }).catch((err)=>{
            console.log('rent updation error');
            reject(err);
        });      
});
}

exports.addCarpoolUsers = (rentObj,user)=>{
    console.log(rentObj,user);
    return rent.update(rentObj,{$addToSet:{carpoolUsers:user}}).then((document) =>{
        // console.log('in add car pool');
        // console.log(document);
        return document;
    }).catch(err =>{
        console.log(err);
    });
}


exports.findRent = (rentObj)=>{
    return new Promise((resolve,reject)=>{
        rent.find(rentObj).then(document =>{
                // console.log(document);
                console.log('rent finded');
                resolve(document);
        }).catch((err)=>{
            console.log('rent  find error');
            reject(err);
        });     
});
};


exports.rent = rent;