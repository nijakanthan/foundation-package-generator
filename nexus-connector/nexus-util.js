const { httpUtil } = require('../util/http-util');

exports.nexus_downlaod = (jsonReader) =>{
    //call http utill
    return new Promise((resolve, reject) =>{
        httpUtil(jsonReader)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}

const nexus_upload = function(){

}