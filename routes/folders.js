const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);

const knex = require('../knex');

router.get('/folders', (req, res, next) => {
    knex.select('id', 'name')
      .from('folders')
      .then(results => {
        res.json(results);
      })
      .catch(err => next(err));
  });

router.get('/folders/:id', (req, res, next) => {
    const id = req.params.id;
    knex.select('id', 'name')
      .from('folders')
      .modify(queryBuilder => {
        if (id) {
          queryBuilder.where({id: id});
        }
      })
      .then(results => {
        res.json(results);
      })
      .catch(err => next(err));
  });

  router.put('/folders/:id', (req, res, next) => {
    const id = req.params.id;
    /***** Never trust users - validate input *****/
    const updateObj = {};
    const updateableFields = ['name'];
  
    updateableFields.forEach(field => {
      if (field in req.body) {
        updateObj[field] = req.body[field];
      }
    });
  
    /***** Never trust users - validate input *****/
    if (!updateObj.name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }
  
    knex
    .update(updateObj)
    .from('folders')
    .where({id: id})
    .returning(['id', 'name'])
    .then(([result]) => {
      if (result){
        res.json(result);
      } else {
        next();
      }    
    })
    .catch(err => {
      next(err);
    });
  });

  // Post (insert) an item
router.post('/folders', (req, res, next) => {
    const { name } = req.body;
  
    const newItem = { name };
    /***** Never trust users - validate input *****/
    if (!newItem.name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }
  
    knex
      .insert(newItem)
      .into('folders')
      .returning(['id', 'name'])
      .then(([result]) => {
        if (result) {
          res.location(`http://${req.headers.host}/folders/${result.id}`).status(201).json(result);
        }
      })
      .catch(err => {
        console.error(err);
      });
  
  });
  
  // Delete an item
  router.delete('/folders/:id', (req, res, next) => {
    const id = req.params.id;
  
      knex('folders')
        .where('id', id)
        .delete()
        .then(() => {res.sendStatus(204)})
        .catch(err => {
          next(err);
        });
  });

  module.exports = router;