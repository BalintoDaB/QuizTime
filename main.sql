/*
CREATE DATABASE QuizTime;

CREATE TABLE `quiztime`.`users` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `username` VARCHAR(30) NOT NULL ,
    `password` VARCHAR(30) NOT NULL ,
    `email` VARCHAR(50) NOT NULL ,
    PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO `quiztime`.users (username, password, email) VALUES ('Test', 'Test', 'test@test.hu');

CREATE TABLE `quiztime`.`questions` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `quizId` INT NOT NULL,
    `question` VARCHAR(200),
    `ans1` VARCHAR(200),
    `ans2` VARCHAR(200),
    `ans3` VARCHAR(200),
    `ans4` VARCHAR(200),
    `correct` INT NOT NULL,
    PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `quiztime`.`quizzes` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `ownerId` INT NOT NULL ,
    `title` VARCHAR(50) NOT NULL ,
    PRIMARY KEY (`id`)) ENGINE = InnoDB;


-- Insert sample users
INSERT INTO `quiztime`.users (username, password, email) VALUES ('alice', 'alice123', 'alice@example.com');
INSERT INTO `quiztime`.users (username, password, email) VALUES ('bob', 'bob123', 'bob@example.com');
INSERT INTO `quiztime`.users (username, password, email) VALUES ('charlie', 'charlie123', 'charlie@example.com');

-- Insert sample quizzes
-- Assuming Alice has ID 1, Bob has ID 2, Charlie has ID 3
INSERT INTO `quiztime`.quizzes (ownerId, title) VALUES (1, 'General Knowledge Quiz');
INSERT INTO `quiztime`.quizzes (ownerId, title) VALUES (2, 'Science Quiz');
INSERT INTO `quiztime`.quizzes (ownerId, title) VALUES (3, 'History Quiz');

-- Insert questions for General Knowledge Quiz (quizId = 1)
INSERT INTO `quiztime`.questions (quizId, question, ans1, ans2, ans3, ans4, correct) VALUES
(1, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid', 1),
(1, 'Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Saturn', 2);

-- Insert questions for Science Quiz (quizId = 2)
INSERT INTO `quiztime`.questions (quizId, question, ans1, ans2, ans3, ans4, correct) VALUES
(2, 'What is the chemical symbol for water?', 'O2', 'H2O', 'CO2', 'NaCl', 2),
(2, 'What gas do plants absorb from the atmosphere?', 'Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Nitrogen', 2);

-- Insert questions for History Quiz (quizId = 3)
INSERT INTO `quiztime`.questions (quizId, question, ans1, ans2, ans3, ans4, correct) VALUES
(3, 'Who was the first President of the United States?', 'Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams', 2),
(3, 'In which year did World War II end?', '1945', '1939', '1918', '1965', 1);



CREATE TABLE `quiztime`.`hosted_servers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `hostId` INT NOT NULL,               -- references users.id
    `hostedQuizId` INT NOT NULL,         -- references quizzes.id
    `ip_address` VARCHAR(45) NOT NULL,   -- supports IPv4 and IPv6
    `port` INT NOT NULL DEFAULT 8080,    -- useful if multiple hosts run on same IP
    `status` ENUM('active', 'ended') DEFAULT 'active',
    `started_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;
*/