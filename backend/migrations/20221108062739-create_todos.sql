-- +migrate Up
CREATE TABLE IF NOT EXISTS todos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  text varchar(128)
);

-- +migrate Down
DROP TABLE IF EXISTS todos;
