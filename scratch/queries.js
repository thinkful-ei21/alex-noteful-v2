'use strict';

const knex = require('../knex');

let searchTerm;
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

// let id = 1
// knex
// .select('notes.id', 'title', 'content')
// .from('notes')
// .modify(queryBuilder => {
//   if (id) {
//     queryBuilder.where({id: id});
//   }
// })
// .then(results => {
//   console.log(JSON.stringify(results, null, 2));
// })
// .catch(err => {
//   console.error(err);
// });
let id = 40;
let obj = {id: 40, title: 'taco time', content: 'lets tac about tacos'};

knex
.update(obj)
.from('notes')
.where({id: id})
.returning(['id', 'title', 'content'])
.then(results => {
  console.log(JSON.stringify(results[0], null, 2));
})
.catch(err => {
  console.error(err);
});