INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'george washington','gwashington@gmail.com','2',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'john adams','jadams@gmail.com','3',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'thomas jefferson','tjefferson@gmail.com','4',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'james madison','jmadison@gmail.com','5',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'james monroe','jmonroe@gmail.com','6',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat)  SELECT 'andrew jackson','ajackson@gmail.com','7',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'andrew johnson','ajohnson@gmail.com','8',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'abraham lincoln','alincoln@gmail.com','9',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO users(full_name, email, user_id, is_admin, has_paid, picture_url, createdAt, updatedat) SELECT 'john kennedy','jkennedy@gmail.com','10',0,0,'',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;


INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '2', 'george washington team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '2', 'george washington team 2', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '2', 'george washington team 3', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '2', 'george washington team 4', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '3', 'john adams team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '3', 'john adams team 2', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '3', 'john adams team 3', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '4', 'thomas jefferson team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '5', 'james madison team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '5', 'james madison team 2 ', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '5', 'james madison team 3', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '5', 'james madison team 4', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '5', 'james madison team 5', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '6', 'james monroe team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '6', 'james monroe team 2', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '7', 'andrew jackson team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '8', 'andrew johnson team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '9', 'abraham lincoln team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;
INSERT INTO playerteams(user_id, team_name, is_active, has_paid, createdAt, updatedat) SELECT '10', 'john kennedy team', 1, 0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP;



INSERT INTO teamstreaks(user_id, team_id, total, current, createdAt, updatedat) SELECT user_id, team_id, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM playerteams where team_id > 24



INSERT INTO teampicks(week, user_id, team_id, team_name, game_id, createdAt, updatedat) SELECT 4, user_id, team_id, 'Broncos', 57223, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM playerteams where team_id > 24