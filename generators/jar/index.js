var Generator = require('yeoman-generator');
const readJson = require('../../util/json-reader');
const Constants = require('../../util/constants');
const createFolders = require('../../util/files-util');
const { nexus_downlaod } = require('../../nexus-connector/nexus-util'); 
const zipGenerator = require('../../util/zip-generator');

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
            console.log('error read json => '+err);
        }
    }

    get readJson() {
        try{
            if(this.options.skip){
                this.jsonReader = readJson.readJsonFile(this.options.jsonPath);
                console.log(this.jsonReader);
            }
            else{
                return this._readJson();
            }
        }catch(err){
            console.log('error invoking read json => '+err);
        }
    }

    // Create folder structure using projectName --> environment
    _createFolders(){
        try{
            return{
                create_folder: createFolders.create_folder(Constants.JARS_FOLDER_PATH),
                create_zip_folder: createFolders.create_folder(Constants.JARS_ZIP_FOLDER_PATH)
            };
        }catch(err){
            console.log('error creating folder => '+err);
        }
    }

    get createFolders(){
        this._createFolders();
    }

    // Download jar files from nexus server and calling function to start generate zips
    nexusDownloading(){
        nexus_downlaod(this.jsonReader)
        .then(res=>this._generateZip(this.jsonReader))
        .catch(err => console.log(`error zipping files -> ${err}`));
    }

    //Generate docker starter file
    _createJarStarterScript(filePath,arr){
        try{
            return{
                createJarsStarterScript: createFolders.writeJarFile(filePath, arr)
            };
        }catch(err){
            console.log('error create sh => '+err);
        }
    }

    get createJarStarterScript(){
        //Finding the docker component names.
        var jarStarterCmds = [];
        var jarEle = this.jsonReader.jarDeployments;
        for(var i = 0; i < jarEle.length; i++){
            var jarFileName = jarEle[i].fileName;
            jarStarterCmds.push(jarFileName);
        }

        this._createJarStarterScript(Constants.JARS_STARTER_SCRIPT_PATH,jarStarterCmds);
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
