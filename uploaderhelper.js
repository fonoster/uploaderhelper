#!/usr/bin/env node
const Storage = require('@fonos/storage').default
const EventsRecvr = require('@fonos/events').EventsRecvr
const logger = require('@fonos/logger').default
const fs = require('fs')
const METADATA = process.env.METADATA || { 'Content-Type': 'audio/x-wav' }
const BUCKET = process.env.BUCKET || 'default'

if (!process.env.EVENTS_BROKERS) {
  logger.log('error', 'uploaderhelper [environment variable EVENTS_BROKERS is undefined]')
  exit(1)
}

const BROKERS = process.env.EVENTS_BROKERS.split(',')
const er = new EventsRecvr(BROKERS, process.env.EVENTS_QUEUE)
er.connect()

er.watchEvents(content => {
  const event = JSON.parse(content.toString())

  if (event.name === 'RECORDING_CREATED') {
    const pathToFile = event.data.pathToFile
    logger.log('debug', `File ${pathToFile} has been added. Pushing to bucket '${BUCKET}'`)
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
  }

})