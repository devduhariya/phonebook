const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./models/userModel');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: " http://localhost:3001"
  }));
mongoose.connect('mongodb+srv://sukh:123@phonebook.nfbyo.mongodb.net/phonebook?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true }, () => {
    console.log('Db connected');
});
const isNullOrUndefined = (val) => val === null || val === undefined || val === '';

app.post('/addcontact', async(req, res) => {
    const newContact = req.body;
    if (isNullOrUndefined(newContact.name && newContact.mobile)) {
        res.status(400).send({ message: 'data missing' });
    } else {
        const cretaenewContact = new user(newContact);
        await cretaenewContact.save();
        res.send(cretaenewContact);
        
    }
});
app.get('/contacts',async(req,res)=>{
    let contacts = await user.find();
    return res.status(200).send(contacts);
});
app.patch('/contacts/:id', async(req,res)=>{
    const id  = req.params.id;
    const newDetail = req.body;
    try{
        const exixtsingContact = await user.findById({_id:id});
        if(isNullOrUndefined(newDetail.name) && isNullOrUndefined(newDetail.mobile)){
           res.status(400).send({message:"insufficient data"}); 
        }else{
            exixtsingContact.name = newDetail.name;
            exixtsingContact.mobile = newDetail.mobile;
            await exixtsingContact.save();
            res.send(exixtsingContact);
        }
    }catch(e){
        console.log(e);
        res.status(400).send({message:e.message});
    }
});
app.delete('/contact/:id', async(req,res)=>{
   const id = req.params.id;
   const result = await user.findOne({_id:id});
   if (result) {
    await user.deleteOne({ _id: id });
    res.status(200).send({ message: 'user deleted' });
} else {
    res.status(400).send({ err: 'user does not exists.' });
}
});
app.listen(9800);