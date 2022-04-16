const express = require('express');
const partnerRouter = express.Router();
const Partner = require('../models/partner');


partnerRouter.route('/')
.get((req, res, next) => {
    Partner.find()
    .then(partners => {
        res.status = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(partners);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Partner.create(req.body)
    .then(partner => {
        res.status = 200;
        res.header('Content-type', 'application/json')
        res.json(partners);
    })
    .catch(err => next(err));
})
.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites`);
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Partner.deleteMany()
    .then(partners => {
        res.status = 200;
        res.header('Content-type', 'application/json')
        res.json(partners);
    })
    .catch(err => next(err));
});


partnerRouter.route('/:partnerId')
.get((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner =>{
        res.statusCode = 200;
        res.header('Content-type', 'application/json')
        res.json(partners);
    })
    .catch(err => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsite${req.params.campsiteId}`);
})
.put(authenticate.verifyUser, (req, res) => {
   Partner.findByIdAndUpdate(req.params.partnerId, {
       $set: req.body
   }, {new: true})
   .then(partner =>{
    res.statusCode = 200;
    res.header('Content-type', 'application/json')
    res.json(partner);
})
    .catch(err => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(partner =>{
        res.statusCode = 200;
        res.header('Content-type', 'application/json')
        res.json(partner);
    })
    .catch(err => next(err));
});

module.exports = partnerRouter