import {craeteDockerCompose} from '../packager/docker-package/create-docker-package' ;

const selectPackage = (deploymentType)=>{
if (deploymentType == "docker"){
    
    craeteDockerCompose;
}
}