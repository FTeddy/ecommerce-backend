'use strict'

const fs = require('fs');

const dotEnvVerify = fs.existsSync('.env')
if (dotEnvVerify) {
  console.log('dotenv exist');
  process.exit();
}

const storage = require('@google-cloud/storage')()

const bucketName = `dotenv.fancy-to-do.teddydevstack.com`
console.log(`Downloading .env from bucket "${bucketName}"`)
storage
  .bucket(bucketName)
  .file('.env')
  .download({ destination: '.env' })
  .then(() => {
    console.info('dotenv downloaded')
  })
  .catch(err => {
    console.log(err);
  })
