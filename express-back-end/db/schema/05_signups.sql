DROP TABLE IF EXISTS signup CASCADE;
CREATE TABLE signup (
  id SERIAL PRIMARY KEY NOT NULL,
  approved_user_id INTEGER REFERENCES approved_users(id) ON DELETE CASCADE,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE
);
ALTER TABLE signup OWNER TO labber;