let carpoolModal = require('../modals/carpoolRequest');

exports.addCarpool = (req,res) =>{
    carpoolModal.addCarpool(req.body).then(document =>{
        res.send(document);
    }).catch(err => {
        res.send(err);
    })
};

exports.addUserToCarpool = (req,res) =>{
    carpoolModal.addRequestedUser(req.body.selection,req.body.userEmail).then(document =>{
      
        res.send(document);
    }).catch(err =>{
        res.send(err);
    });
}

exports.acceptUserRequest = (req,res) =>{
    carpoolModal.acceptCarpoolRequestForUser(req.body.selection,req.body.email).then(document =>{
        console.log(document);
        res.send(document);
    }).catch(err =>{
            res.send(err);
    });
};

exports.showRequests = (req,res) =>{
    carpoolModal.getRequestForRent(req.params.rentId).then(document =>{
        res.send(document);
    }).catch(err =>{
        res.send(err);
    });
};

exports.fetchAvailableCarpool = (req,res)=>{
    carpoolModal.find({lat:req.params.lat,lon:req.params.lon}).then((document)=>{
        res.send(document);
    }).catch(err =>{
        res.send(document);
    });
}