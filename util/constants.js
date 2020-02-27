const DOCKER_LOAD = 'docker load --input';
const START_DOCKER_COMPOSE = 'docker-compose up && docker-compose rm -fsv';
const DOCKER_STARTER_SCRIPT = './docker-compose/files/start.sh';
const YAML_PATH = './docker-compose/files/docker-compose.yaml';
const YAML_VERSION = '3.3';
const YAML_SERVICE = 'services';
const DOCKER_COMPOSE_FOLDER_PATH = "docker-compose/files";
const DOCKER_COMPOSE_ZIP_FOLDER_PATH = "docker-compose";
const JARS_ZIP_FOLDER_PATH = "jar";
const JARS_FOLDER_PATH = "jar/files";
const JARS_STARTER_SCRIPT_PATH = "./jar/files/";
const JSON_DOCKER_COMPOSE_OBJECT = "dockerComposeDeployments";
const JAR_LOAD = "java -jar";

module.exports = {
    DOCKER_LOAD,
    START_DOCKER_COMPOSE,
    DOCKER_STARTER_SCRIPT,
    YAML_PATH,
    YAML_VERSION,
    YAML_SERVICE,
    DOCKER_COMPOSE_FOLDER_PATH,
    JARS_FOLDER_PATH,
    JSON_DOCKER_COMPOSE_OBJECT,
    JAR_LOAD,
    JARS_STARTER_SCRIPT_PATH,
    JARS_ZIP_FOLDER_PATH,
    DOCKER_COMPOSE_ZIP_FOLDER_PATH
}
