DROP TABLE IF EXISTS chapters;

CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  word TEXT NOT NULL,
  definition TEXT NOT NULL
);

INSERT INTO words (word, definition) VALUES
