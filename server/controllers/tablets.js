var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let tablets = require('../models/tablets');

module.exports.ReadTabletData = async(req,res,next)=>{ //< Mark function as async
    try {
       const tabletsList = await tablets.find(); //< Use of await keyword
       res.render('tablet/list', {
          title: 'Tablets', 
          tabletsList: tabletsList
       });
       // console.log(tabletsList);
    } 
    catch(err)
    {
       console.error(err);
       //Handle error
       res.render('tablet/list', {
          error: 'Error on server'
       });
    }
 };

 module.exports.AddTablet = (req,res,next)=>{
    try{
        res.render('tablet/add',
        {
            title:'Add Tablet'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('tablet/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessAddTablet = (req,res,next)=>{
    try{
        let newTablet = tablets({
            "Name": req.body.Name,
            "Price": req.body.Price,
            "PressureSensitivityLevels": req.body.PressureSensitivityLevels,
            "Size": req.body.Size,
            "Screen": req.body.Screen,
        });
        tablets.create(newTablet).then(() =>{
            res.redirect('/tabletlist')
        })
    }
    catch(err) {
        console.error(err);
        res.render('tablet/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.EditTabletPage = async(req,res,next)=>{
    try{
    const id = req.params.id;
    const tabletToEdit = await tablets.findById(id);
    res.render('tablet/edit',
    {
        title:'Edit Tablet',
        Tablet:tabletToEdit
    })
}
catch(err){
    console.error(err);
    res.render('tablet/list',
    {
        error: 'Error on the server'
    });
}
}

module.exports.ProcessEditPage = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedTablet = tablets({
            "_id":id,
            "Name":req.body.Name,
            "Price": req.body.Price,
            "PressureSensitivityLevels": req.body.PressureSensitivityLevels,
            "Size": req.body.Size,
            "Screen": req.body.Screen,
        });
        tablets.findByIdAndUpdate(id,updatedTablet).then(()=>{
            res.redirect('/tabletlist')
        });
    }
    catch(err){
        console.error(err);
        res.render('tablet/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.DeleteTablet = async(req,res,next)=>{
    try{
        let id = req.params.id;
        tablets.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/tabletlist')
        })
    }
    catch(err) {
        console.error(err);
        res.render('tablet/list',
        {
            error: 'Error on the server'
        });
    }
}