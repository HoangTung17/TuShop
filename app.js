const express = require('express')
const Product = require('./models/Product')
const mongoose = require('mongoose')

const app = express()
app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPic
    const weight = req.body.txtWeight
    
    // if(name.length > 5){
    //     const errorMsg = "Ten qua dai!"
    //     res.render('home',{'errorMsg': errorMsg})
    //     return;
    // }

    //await Product.updateOne({'_id':id},{$set: {'name':name,'price':price,'picURL':picURL}})
    var prod = await Product.findById(id)
    prod.name=name
    prod.price = price
    prod.picURL = picURL
    prod.weight = weight
    prod.save((err)=>{
         if(!err)
            console.log("Ok")
        res.redirect("/viewAll")
     })    
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const prod = await Product.findById(id)

    res.render('edit',{'product':prod})
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})
app.post('/search',async (req,res)=>{
    const searchText = req.body.txtSearch
    const query = await  Product.find({'name':searchText})
    res.render('allProduct',{'products':query})
})
app.get('/delete',async (req,res)=>{
    const id = req.query.id
    await Product.deleteOne({'_id':id})
    res.redirect('/viewAll')
})

app.get('/viewAll', async (req,res)=>{  
    var page = req.query.page

    if(page ==1){
        const query = await  Product.find().limit(5)
        res.render('allProduct',{'products':query})
    }else if(page==2){
        const query = await  Product.find().skip(5).limit(5)
        res.render('allProduct',{'products':query})
    }else{
        const query = await  Product.find()
        res.render('allProduct',{'products':query})
    }
    
})

app.post('/newProduct',async (req,res)=>{
    const name = req.body.txtName
    const price  = req.body.txtPrice
    const picURL  = req.body.txtPic
    const weight = req.body.txtWeight
    
    // let error = new Object()
    // let flag = true
    // if(name.trim().length ==0){
    //     error["name"] = "Ten khong de trang!"
    //     flag =false
    // }
    // if(pic.trim().length < 10){
    //     error["pic"] = "Duong dan anh khong hop le"
    //     flag =false
    // }
    
    // if(flag==true){ // khong co loi
    //      let product = new Product({'name':name,'picURL': pic})
    //     await product.save()
    //     console.log("New product was saved!" + product._id)
    //      res.redirect('/')
    // }else{
    //     res.render('home',{'error':error})
    // }

    const productEntity = new Product({'name':name,'price':price,'picURL':picURL, 'weight': weight})
    await productEntity.save()
    res.redirect('/')

    
})

const PORT = process.env.PORT || 5000

app.listen(PORT)
console.log("Server is running!")
