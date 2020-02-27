var fs = require('fs');
const request = require('superagent');
const constants = require('../util/constants');

 exports.httpUtil = (jsonReader) =>{
      //tarFile = jsonReader.dockerComposeDeployments[0].fileName;
      return new Promise((resolve,reject) => {
        source = jsonReader.nexusConfig.host+':'+jsonReader.nexusConfig.port+jsonReader.nexusConfig.context;
        projectName = jsonReader.projectName;
        environment = jsonReader.environment;
        let calls = [];

        if(jsonReader.dockerComposeDeployments.length > 0){
            for(var i = 0; i < jsonReader.dockerComposeDeployments.length; i++){
                const tarFile = `./${constants.DOCKER_COMPOSE_FOLDER_PATH}/${jsonReader.dockerComposeDeployments[i].fileName}`;
                const sourcePath = `${source+jsonReader.dockerComposeDeployments[i].downloadPath}`;
                calls.push(_looping(tarFile, sourcePath));
    
            }
            Promise.all(calls).then(res =>{
                var status = true
                res.forEach(el => {
                    if(el.status !== true){
                        status = false;
                        reject("fail");
                        console.log("fail");
                    }
                    else{
                        resolve("success");
                        console.log("success");
                    }
                });
            }).catch(function(err) {
                console.log(err.message);
            });
        }
        else if(jsonReader.jarDeployments.length > 0){
            for(var i = 0; i < jsonReader.jarDeployments.length; i++){
                const jarFile = `./${constants.JARS_FOLDER_PATH}/${jsonReader.jarDeployments[i].fileName}.jar`;
                const sourcePath = `${source+jsonReader.jarDeployments[i].downloadPath}`;
                calls.push(_looping(jarFile, sourcePath));
    
            }
            Promise.all(calls).then(res =>{
                var status = true
                res.forEach(el => {
                    if(el.status !== true){
                        status = false;
                        reject("fail");
                        console.log("fail");
                    }
                    else{
                        resolve("success");
                        console.log("success");
                    }
                });
            }).catch(function(err) {
                console.log(err.message);
            });
        }
        else{
            console.log("json type error --> error downloading");
        }
    })    
}

function _looping(downloadFiles,sourcePath){
    return new Promise((resolve,reject) => {
        request
            .get(sourcePath)
            .on('error', function(error) {
                reject({
                    status: false,
                    fileName: downloadFiles
                })
            })
            .pipe(fs.createWriteStream(downloadFiles))
            .on('finish', function() {
                resolve({
                    status:true,
                    fileName: downloadFiles
            })
        });
    });
}
