var Generator = require('yeoman-generator');
const readJson = require('../../util/json-reader');
const prompts = require('./prompt');
const nexusConnector = require('../../nexus-connector/nexus-util');
const { nexus_downlaod } = require('../../nexus-connector/nexus-util'); 
const createFolders = require('../../util/files-util');
const zipGenerator = require('../../util/zip-generator');
const createYml = require('../../docker-compose/generate-docker-compose');
const Constants = require('../../util/constants');


module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {

      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
      // This method adds support for a `--skip` flag
      this.option("skip");

      // Get json file path.
      this.argument("jsonPath", { type: String, required: true });

    }

    // If given --skip,skip the prompt and read json using json file path
    _readJson() {
        try{
            return{
                askQuestions: prompts.askQuestions
              };
        }catch(err){
            console.log('erro read json => '+err);
        }
    }

    get readJson() {
        try{
            if(this.options.skip){
                this.jsonReader = readJson.readJsonFile(this.options.jsonPath);
            }
            else{
                return this._readJson();
            }
        }catch(errr){
            console.log('error invoking read json => '+err);
        }
    }

    // Create folder structure using projectName --> environment
    _createFolders(){
        try{
            return{
                create_folder: createFolders.create_folder(Constants.DOCKER_COMPOSE_FOLDER_PATH),
                create_folder: createFolders.create_folder(Constants.DOCKER_COMPOSE_ZIP_FOLDER_PATH)
            };
        }catch(err){
            console.log('error creating folder => '+err);
        }
    }

    get createFolders(){
        this._createFolders();
    }

    // Download tar files from nexus server and calling function to start generate zips
    nexusDownloading(){
        nexus_downlaod(this.jsonReader)
        .then(res=>this._generateZip(this.jsonReader))
        .catch(err => console.log(`error zipping files -> ${err}`));
    }

    //Generate docker starter file
    _createDockerStarterScript(file, arr){
        try{
            return{
                createDockerStarterScript: createFolders.writeFile(file, arr)
            };
        }catch(err){
            console.log('error create sh => '+err);
        }
    }

    get createDockerStarterScript(){
        //Finding the docker component names.
        var dockerStarterCmds = [];
        var dockerComposeDeploymentEle = this.jsonReader.dockerComposeDeployments;
        for(var i = 0; i < dockerComposeDeploymentEle.length; i++){
            var tarBallName = dockerComposeDeploymentEle[i].fileName;
            dockerStarterCmds.push(Constants.DOCKER_LOAD + ' ' + tarBallName);
        }

        dockerStarterCmds.push(Constants.START_DOCKER_COMPOSE);
        this._createDockerStarterScript(Constants.DOCKER_STARTER_SCRIPT, dockerStarterCmds);
    }


    // Generate yml file
    _generateYml(){
        try{
            return{
                createYaml: createYml.createYaml(this.jsonReader)
            };
        }catch(err){
            console.log('error generating yml => '+err);
        }
    }

    get generateYml(){
        this._generateYml();
    }


    // Generate zip folder
    _generateZip(){
        try{
            return{
                generateZip: zipGenerator.generateZip(this.jsonReader)
            };
        }catch(err){
            console.log('error generating zip => '+err);
        }
    }
};
