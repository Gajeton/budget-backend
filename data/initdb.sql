# create databases
CREATE DATABASE IF NOT EXISTS `shadowbudget`;
GRANT ALL ON `shadowbudget`.* TO 'budget'@'%';