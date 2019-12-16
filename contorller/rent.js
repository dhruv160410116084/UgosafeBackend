let rentModal = require('../modals/rent');

exports.createRent = (req, res) => {
    rentModal.insertRent(req.body).then(document => {
        res.send({ status: 'success' });
    }).catch(err => {
        res.send(err);
    });

};

exports.fetchRent = (req, res) => {
    // console.log(req.route.path);
    let rentObj = {};
    if (req.route.path === "/:rentId" && req.params.rentId !== 'all')
        rentObj._id = req.params.rentId;
    if (req.route.path === "/owner/:ownerId"){

        rentObj.ownerId = req.params.ownerId;
        rentObj.isRequestAccepted = "pending";
    }
    if (req.route.path === "/customer/:customerId"){
        rentObj.customerId = req.params.customerId;
        rentObj.status = {$ne:"finished"}
    }

    rentModal.findRent(rentObj).then(document => {
        if (document.length > 0) {
            res.send({rents:document});
        }
        else {
            res.send({ status: 'no record found' });
        }
    }).catch(err => {
        res.send(err);
    });
};

exports.fetchRentHistory = (req, res) => {
    // console.log(req.route.path);
    console.log("history");
    let rentObj = {};
    // if (req.route.path === "/:rentId" && req.params.rentId !== 'all')
    //     rentObj._id = req.params.rentId;
    // if (req.route.path === "/owner/:ownerId"){

    //     rentObj.ownerId = req.params.ownerId;
    //     rentObj.isRequestAccepted = "pending";
    // }
    //if (req.route.path === "/customer/:customerId")
        rentObj.customerId = req.params.customerId;
    rentObj.status="finished";
    rentModal.findRent(rentObj).then(document => {
        if (document.length > 0) {
            res.send({rents:document});
        }
        else {
            res.send({ status: 'no record found' });
        }
    }).catch(err => {
        res.send(err);
    });
};


exports.fetchRentOwnerHistory = (req,res)=>{
        let rentObj = {ownerId:req.params.ownerId,status:"finished"};
        rentModal.findRent(rentObj).then(document => {
            if(document.length > 0)
                res.send({rents:document});
            else 
                res.send({status:'no record found'});
        }).catch(err =>{
            res.send(err);
        })
}

exports.fetchAcceptedRent = (req, res) => {
    // console.log(req.route.path);
    let rentObj={};
    rentObj.isRequestAccepted = "accepted";
    rentObj.ownerId = req.params.ownerId;

        console.log(rentObj);
    rentModal.findRent(rentObj).then(document => {
        if (document.length > 0) {
            res.send({rents:document});
        }
        else {
            res.send({ status: 'no record found' });
        }
    }).catch(err => {
        res.send(err);
    });
};


exports.modifyRent = (req, res) => {
    rentModal.updateRent(req.body.selection, req.body.update).then(document => {
        res.send({ nModified: document.nModified });
    }).catch(err => {
        res.send(err);
    });
};

exports.addCarpoolUser =(req,res) => {
        rentModal.addCarpoolUsers(req.body.selection,req.body.update).then( document =>{
            console.log('in carpool controller');
            console.log(document);
            
            res.send({result:"success"})
        }).catch(err => {
            console.log(err);
            res.send({result:"failure"});
        });
};

exports.addFeedBack = (req,res) =>{
    rentModal.updateRent({_id:req.body.rentId},{feedback:req.body.feedback}).then(document =>{
        res.send({nModified : document.nModified});
    }).catch(err => {
        res.send(err);
    })
}

