const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
if (
  !process.env['API_APP'] ||
  !process.env['API_URL'] ||
  !process.env['API_ENV']
) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1);
}

let ambiente = process.env['API_ENV'];
let isProduction = false;
switch (ambiente) {
  case 'prod':
  case 'dev':
  case 'demo':
    isProduction = true;
    break;
}

const envDirectory = `./projects/${process.env['API_APP']}/src/environments`;
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

const targetPath = isProduction
  ? `./projects/${process.env['API_APP']}/src/environments/environment.${ambiente}.ts`
  : `./projects/${process.env['API_APP']}/src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
    production: ${isProduction},
    API_URL: "${process.env['API_URL']}"
};
`;

writeFileUsingFS(
  `./projects/${process.env['API_APP']}/src/environments/environment.ts`,
  environmentFileContent
);
writeFileUsingFS(
  `./projects/${process.env['API_APP']}/src/environments/environment.${ambiente}.ts`,
  environmentFileContent
);

// write the content to the respective file
function writeFileUsingFS(targetPath: string, environmentFileContent: string) {
  writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
      console.log(err);
    }
    console.log(`Se crean las variables en ${targetPath}`);
    console.log(
      `App generada: ${process.env['API_APP'] ? process.env['API_APP'] : 'N/A'}`
    );
    console.log(
      `En Ambiente: ${process.env['API_ENV'] ? process.env['API_ENV'] : 'N/A'}`
    );
    console.log(
      `Apuntando a: ${process.env['API_URL'] ? process.env['API_URL'] : 'N/A'}`
    );
  });
}

// writeFileUsingFS(targetPath, environmentFileContent);
