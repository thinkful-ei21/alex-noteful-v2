'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);

const knex = require('../knex');

// Get All (and search by query)
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  knex.select('id', 'title', 'content')
    .from('notes')
    .modify(function (queryBuilder) {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .orderBy('notes.id')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
  });

  // notes.filter(searchTerm)
  //   .then(list => {
  //     res.json(list);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
    .select('notes.id', 'title', 'content')
    .from('notes')
    .modify(queryBuilder => {
    if (id) {
      queryBuilder.where({id: id});
    }
    })
    .then(([result]) => {
      res.json(result);
    })
    .catch(err => {
      next(err);
    });

  // notes.find(id)
  //   .then(item => {
  //     if (item) {
  //       res.json(item);
  //     } else {
  //       next();
  //     }
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  // let id = 40;
  //let obj = {id: 40, title: 'taco time', content: 'lets tac about tacos'};

  knex
  .update(updateObj)
  .from('notes')
  .where({id: id})
  .returning(['id', 'title', 'content'])
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

  // notes.update(id, updateObj)
  //   .then(item => {
  //     if (item) {
  //       res.json(item);
  //     } else {
  //       next();
  //     }
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  //let newObj = {title: 'shoppingList', content: 'get some milk and cheese plz'};

  knex
    .insert(newItem)
    .into('notes')
    .returning(['id', 'title', 'content'])
    .then(([result]) => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${result.id}`).status(201).json(result);
      }
    })
    .catch(err => {
      console.error(err);
    });

  // notes.create(newItem)
  //   .then(item => {
  //     if (item) {
  //       res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
  //     }
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

    knex('notes')
      .where('id', id)
      .delete()
      .then(() => {res.sendStatus(204)})
      .catch(err => {
        next(err);
      });

  // notes.delete(id)
  //   .then(() => {
  //     res.sendStatus(204);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

module.exports = router;
