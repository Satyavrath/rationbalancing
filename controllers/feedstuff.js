const express = require('express')
const api = express.Router()
const Model = require('../models/feedstuff.js')
// const LOG = require('../utils/logger.js')
// const find = require('lodash.find')
// const remove = require('lodash.remove')
// const notfoundstring = 'customer'

// get view page
api.get('/', (req, res) => {
    res.render('/view/feedstuff.ejs');
  })

// GET /details/:id
api.get('/details/:id', (req, res) => {
    // LOG.info(`Handling GET /details/:id ${req}`)
    const id = parseInt(req.params.id, 10) // base 10
    const data = req.app.locals.ingredients.query
    const item = find(data, { _id: id })
    // if (!item) { return res.end(notfoundstring) }
    // LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
    return res.render('details.ejs',
      {
        title: 'feedstuff Details',
        layout: 'details.ejs',
        customer: item
      })
  })

  module.exports = api