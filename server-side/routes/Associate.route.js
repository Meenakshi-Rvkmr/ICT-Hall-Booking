let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()

// Associate Model
let AssociateSchema = require('../models/Associate')

// CREATE Associate
router.route('/create-Associate').post((req, res, next) => {
  AssociateSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})

// READ Associates
router.route('/').get((req, res) => {
  AssociateSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Associate
router.route('/edit-Associate/:id').get((req, res) => {
  AssociateSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Associate
router.route('/update-Associate/:id').put((req, res, next) => {
  AssociateSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Associate updated successfully !')
      }
    },
  )
})

// Delete Associate
router.route('/delete-Associate/:id').delete((req, res, next) => {
  AssociateSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router
