const randomstring = require('randomstring');
exports.codeGenerate = function( username) {
    try{
        const name = username
        const userCode = randomstring.generate({
            length : 10,
            charset : name,
            readable : true
        }).replace(/\s/g, "")
        const repsonse = {
            username : name ,
            userCode : userCode
        }
        return repsonse ;
    }catch(e){
        console.log(e)
    }
}
