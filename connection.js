const mongoose = require('mongoose')
// Add your Own Mongoose URL
mongoose.connect(url2,{ useCreateIndex : true , useUnifiedTopology : true , useNewUrlParser : true}).then(() =>{
    console.log('DB Connected')
}).catch((e) => {
    console.log(e)
})
