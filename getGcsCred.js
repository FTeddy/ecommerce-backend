'use strict'

const fs = require('fs');

const dotEnvVerify = fs.existsSync('fancy-to-do-684a7e877064.json')
if (dotEnvVerify) {
  console.log('Creds exist');
  process.exit();
}

const storage = require('@google-cloud/storage')()

const bucketName = `dotenv.fancy-to-do.teddydevstack.com`
console.log(`Downloading Creds from bucket "${bucketName}"`)
storage
  .bucket(bucketName)
  .file('fancy-to-do-684a7e877064.json')
  .download({ destination: 'fancy-to-do-684a7e877064.json' })
  .then(() => {
    console.info('Creds downloaded')
  })
  .catch(err => {
    console.log(err);
  })
