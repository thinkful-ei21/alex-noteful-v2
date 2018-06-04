

--CREATE TABLE tags (
  --  id serial PRIMARY KEY,
    --name text NOT NULL
--);

--CREATE TABLE notes_tags (
  --note_id INTEGER NOT NULL REFERENCES notes ON DELETE CASCADE,
  --tag_id INTEGER NOT NULL REFERENCES tags ON DELETE CASCADE
--);

insert into tags (name) values
('work'), ('fun'), ('trending'), ('cats'), ('food');

insert into notes_tags (note_id, tag_id) values
(1,2),(1,5),(2,1),(3,4),(3,2),(3,3),(4,1),(5,2),(6,1),(7,4),(7,2),(8,1),(9,5),(9,3);