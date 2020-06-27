const axios = require('axios')

const startQuiz = async function(user){
    try{
        if(!user.role || user.role == 0){
            return {
                success : false,
                message : 'Not Authorised'
            }
        }
        const quizData = await axios.get('https://opentdb.com/api.php?amount=10')
        return quizData.data.results
    }catch(err){
        console.log('Error with Start Quiz function')
        console.log(err)
    }
}

module.exports = startQuiz