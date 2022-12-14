
-- +migrate Up
CREATE TABLE IF NOT EXISTS messages (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(128),
  user_id VARCHAR(128),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- +migrate Down
DROP TABLE IF EXISTS messages;