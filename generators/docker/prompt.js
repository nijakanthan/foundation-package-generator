const chalk = require('chalk');

module.exports = {
    askQuestions
};

function askQuestions() {

    const prompts = [
        {
            type: 'input',
            name: 'projectName',
            message:'Enter your project name.',
            default: 'my-project',
            store: true
        },
        {
            type: 'list',
            name: 'environment',
            message: 'What is your environment?',
            choices: [
                {
                    value: 'dev',
                    name: 'Development environment'
                },
                {
                    value: 'qa',
                    name: 'QA environment'
                },
                {
                    value: 'prod',
                    name: 'Prod environment'
                }
            ],
            default: 'dev',
            store: true
        },
        {
            type: 'list',
            name: 'serviceDiscoveryType',
            message: 'Which service discovery server do you want to use?',
            choices: [
                {
                    value: 'eureka',
                    name: 'JHipster Registry (uses Eureka, provides Spring Cloud Config support and monitoring dashboards)'
                },
                {
                    value: 'consul',
                    name: 'Consul'
                },
                {
                    value: false,
                    name: 'No service discovery'
                }
            ],
            default: 'eureka',
            store: true
        },
        {
            type: 'list',
            name: 'distributedCache',
            message: 'Which distributed cache do yoy want to use?',
            choices: [
                {
                    value: "kafka",
                    name: 'kafks distributed cache'
                },
                {
                    value: false,
                    name: 'No'
                }
            ],
            default: "kafka",
            store: true
        },
        {
            type: 'list',
            name: 'authenticationServer',
            message: 'Which authentication server do yoy want to use?',
            choices: [
                {
                    value: "JWT",
                    name: 'jwt authentication server'
                }
            ],
            default: "JWT",
            store: true
        },
        {
            type: 'confirm',
            name: 'reverseProxy',
            message: `Do you want use ${chalk.yellow('*zuul*')} as a reverse proxy?`,
            default: "YES",
            store: true
        },
        {
            type: 'confirm',
            name: 'configurationServer',
            message: `Do you want use ${chalk.yellow('*spring cloud configuration server*')} as a configuration server?`,
            default: "YES",
            store: true
        },
        {
            type: 'input',
            name: 'apiGateWay',
            message:'What is your api gateway',
            default: 'api-gateway',
            store: true
        },
        {
            type: 'confirm',
            name: 'buildServer',
            message: `Do you want use ${chalk.yellow('*jenkings*')} as a build server?`,
            default: "YES",
            store: true
        },
        {
            type: 'confirm',
            name: 'monitoring',
            message: `Do you want use ${chalk.yellow('*jhipster registry*')} for monitoring?`,
            default: "YES",
            store: true
        }
    ];

    const done = this.async();

    this.prompt(prompts).then(props => {
        this.projectName = props.projectName;
        this.environment = props.environment;
        this.authenticationServer = props.authenticationServer,
        this.serviceDiscoveryType = props.serviceDiscoveryType;
        this.distributedCache = props.distributedCache;
        this.reverseProxy = props.reverseProxy;
        this.configurationServer = props.configurationServer;
        this.apiGateWay = props.apiGateWay;
        this.buildServer = props.buildServer;
        this.monitoring = props.monitoring;
        done();
    });
}

