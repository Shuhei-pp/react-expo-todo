
-- +migrate Up
CREATE TABLE IF NOT EXISTS users (
  id int IS NOT NULL PRIMARY KEY AUTO_INCREMENT
  name VARCHAR(128)
  avatar VARCHAR(256)
  password VARCHAR(128)
)
-- +migrate Down
DROP TABLE IF EXISTS users
