const fs = require('fs');
const yaml2 = require('json2yaml');
const constants = require('../util/constants');

const createYaml = (jsonReader) => {
    try{
        var obj = {};
        var serviceTemplate = {};

        obj.version = constants.YAML_VERSION;

        for(var i = 0; i < jsonReader.dockerComposeDeployments.length; i++){
            var envKey = [];

            var container_name = jsonReader.dockerComposeDeployments[i].host;
            var image = jsonReader.dockerComposeDeployments[i].image;
            for(var j = 0; j < jsonReader.dockerComposeDeployments[i].configs.length; j++){

                var configKey = jsonReader.dockerComposeDeployments[i].configs[j].key.toString();
                var configValue = jsonReader.dockerComposeDeployments[i].configs[j].value.toString();
                var concatConfig = configKey+"="+configValue;
                envKey.push(concatConfig.toString());
            }
            var containerConfigs = {
                container_name: container_name.toString(),
                image: image.toString(),
                ports:[
                    jsonReader.dockerComposeDeployments[i].port+":"+jsonReader.dockerComposeDeployments[i].port
                ],
                environment:envKey
            };
            
            serviceTemplate[jsonReader.dockerComposeDeployments[i].host] = containerConfigs;
            obj[constants.YAML_SERVICE] = serviceTemplate;
        }

        let data = {...obj};

        ymlText = yaml2.stringify(data);
        console.log(ymlText);

        fs.writeFileSync(constants.YAML_PATH, ymlText, 'utf8');
    }catch(err){
        console.log('error while creating yml => '+err);
    }
}

module.exports = {
    createYaml
}