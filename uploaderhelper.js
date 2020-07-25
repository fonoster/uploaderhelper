#!/usr/bin/env node
const Storage = require('@fonos/storage')
const chokidar = require('chokidar')
const fs = require('fs')
const METADATA = { 'Content-Type': 'audio/x-wav' }

chokidar.watch('/data', { ignoreInitial: true }).on('add', pathToFile => {
  console.log(`File ${path} has been added. Pushing to files server`)
  const storage = new Storage()
  storage.uploadObjectSync({
    filename: pathToFile,
    bucket: process.env.BUCKET || 'default',
    metadata: process.env.METADATA || METADATA
  })

  if(process.env.REMOVE_AFTER_UPLOAD &&
    process.env.REMOVE_AFTER_UPLOAD.toLocaleLowerCase === "true") {
    fs.unlink(path)
  }
})