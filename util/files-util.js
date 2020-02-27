const mkdirp = require('mkdirp');
const fs = require('fs');
const constants = require('../util/constants');

const create_folder = (filePath) => {
    mkdirp.sync(filePath);
}

const writeFile = (filePath, arr) => {
    var writeStream = fs.createWriteStream(filePath);

    const pathName = writeStream.path;
    // write each value of the array on the file breaking line
    arr.forEach(value => writeStream.write(`${value}\n`));

    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
    });

    // handle the errors on the write process
    writeStream.on('error', (err) => {
        console.error(`There is an error writing the file ${pathName} => ${err}`)
    });

    // close the stream
    writeStream.end();
}

const writeJarFile = (filePath, arr) => {

    for(let i = 0; arr.length > i; i++){
        var writeStream = fs.createWriteStream(filePath+arr[i]+'.sh');

        const pathName = writeStream.path;

        // write each value of the array on the file breaking line
        writeStream.write(`${constants.JAR_LOAD} ${arr[i]}.jar`);

        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish', () => {
        console.log(`wrote all the array data to file ${pathName}`);
        });

        // handle the errors on the write process
        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file ${pathName} => ${err}`)
        });

        // close the stream
        writeStream.end();
    }

    var writeStream = fs.createWriteStream(filePath+'start.sh');

    const pathName = writeStream.path;
    // write each value of the array on the file breaking line
    arr.forEach(value => writeStream.write(`sh ./${value}.sh\n`));

    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
    });

    // handle the errors on the write process
    writeStream.on('error', (err) => {
        console.error(`There is an error writing the file ${pathName} => ${err}`)
    });

    // close the stream
    writeStream.end();
    
}

module.exports = {
    create_folder, writeFile, writeJarFile
}