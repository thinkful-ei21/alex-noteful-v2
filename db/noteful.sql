DROP TABLE IF EXISTS folders;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text NOT NULL
);

ALTER SEQUENCE folders_id_seq RESTART WITH 100;

INSERT INTO folders (name) VALUES
  ('Archive'),
  ('Drafts'),
  ('Personal'),
  ('Work');

INSERT INTO notes (title, content, folder_id) VALUES 
	(
		'Spaceman Eats Cheese And Saves The World', 
		'Lorem ipsum dolor sit amet,',
		100
	),
	(
		'Blah Blah Blah', 
		'Lorem ipsum dolor sit amet,',
		101
	),
	(
		'Cats Take Over The World...Again', 
		'Lorem ipsum dolor sit amet,',
		102
	),
	(
		'Turtles: All You Need To Know', 
		'Lorem ipsum dolor sit amet,',
		103
	),
	(
		'Spaaaccceeeee', 
		'Lorem ipsum dolor sit amet,',
		100
	),
	(
		'Blah', 
		'Lorem ipsum dolor sit amet,',
		101
	),
	(
		'Cats', 
		'Lorem ipsum dolor sit amet,',
		102
	),
	(
		'Turtles', 
		'Lorem ipsum dolor sit amet,',
		103
	);