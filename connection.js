const mongoose = require('mongoose')
const url2 = 'mongodb+srv://mihir:30363542@cluster0-kdpgu.mongodb.net/Psych'
const url3 = 'mongodb+srv://mihir:30363542@cluster0-kdpgu.mongodb.net/Psych?retryWrites=true&w=majority'
mongoose.connect(url2,{ useCreateIndex : true , useUnifiedTopology : true , useNewUrlParser : true}).then(() =>{
    console.log('DB Connected')
}).catch((e) => {
    console.log(e)
})