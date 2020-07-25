#!/usr/bin/env node
const Storage = require('@fonos/storage').default
const chokidar = require('chokidar')
const fs = require('fs')
const METADATA = process.env.METADATA || { 'Content-Type': 'audio/x-wav' }
const BUCKET = process.env.BUCKET || 'default'

console.log(`Uploader helper. Watching /data volume`)

chokidar.watch('/data', { ignoreInitial: true }).on('add', pathToFile => {
  console.log(`File ${pathToFile} has been added. Pushing to bucket '${BUCKET}'`)
  const storage = new Storage()

  storage.uploadObject({
    filename: pathToFile,
    bucket: BUCKET,
    metadata: METADATA
  }).then(result => {
    if(process.env.REMOVE_AFTER_UPLOAD &&
      process.env.REMOVE_AFTER_UPLOAD.toLocaleLowerCase === "true") {
      fs.unlink(pathToFile)
    }
  }).catch(e => console.log('Unable to upload file =>', e))
})
