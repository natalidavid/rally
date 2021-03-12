DROP TABLE IF EXISTS owners CASCADE;
CREATE TABLE owners (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE
);
ALTER TABLE owners OWNER TO labber;