var zipFolder = require('zip-folder');
const constants = require('../util/constants');

var fs = require('fs');
var archiver = require('archiver');

exports.generateZip = async (jsonReader) => {
    projectName = jsonReader.projectName;
    environment = jsonReader.environment;

    if(jsonReader.dockerComposeDeployments.length > 0){
        var output = fs.createWriteStream(`./${constants.DOCKER_COMPOSE_ZIP_FOLDER_PATH}/${projectName}-${environment}.zip`);
        var archive = archiver('zip',{ zlib: { level: 9 }});

        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        archive.on('error', function(err){
            console.log(err);
            throw err;
        });

        archive.pipe(output);

        archive.directory(`./${constants.DOCKER_COMPOSE_FOLDER_PATH}/`,false);

        archive.finalize();
    }
    else if(jsonReader.jarDeployments.length > 0){
        var output = fs.createWriteStream(`./${constants.JARS_ZIP_FOLDER_PATH}/${projectName}-${environment}.zip`);
        var archive = archiver('zip',{ zlib: { level: 9 }});

        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized and the output file descriptor has closed.');
        });

        archive.on('error', function(err){
            console.log(err);
            throw err;
        });

        archive.pipe(output);

        archive.directory(`./${constants.JARS_FOLDER_PATH}/`,false);

        archive.finalize();
    }
    else{
        console.log("json type error --> error zipping");
    }
    
}
