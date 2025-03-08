const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();
require('dotenv').config();

const config = {
  user: process.env.FTP_USER || 'alanyavilla_',
  password: process.env.FTP_PASSWORD || 'PkfYe71Bb3C33BHX',
  host: process.env.FTP_HOST || '104.247.182.58',
  port: 21,
  localRoot: __dirname + '/../',
  remoteRoot: '/public_html/',
  include: [
    '.next/**',
    'public/**',
    'node_modules/**',
    'package.json',
    '.env.production',
    'next.config.js'
  ],
  exclude: [
    'node_modules/\\.bin/**',
    '.git/**',
    '.github/**',
    '.vscode/**',
    'scripts/**',
    '.env',
    '.env.local',
    '.gitignore',
    'README.md'
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then(res => console.log('Deployment finished:', res))
  .catch(err => console.error('Deployment error:', err)); 