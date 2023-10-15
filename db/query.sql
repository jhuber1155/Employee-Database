INSERT INTO (table) (id, name, etc.)

SELECT * FROM (table) WHERE (id, name, etc) = (something)

UPDATE (table)
SET (name, id, etc)
WHERE (where on the table);

DELETE FROM (table)
WHERE (id, name, etc = your identifier);

SELECT (table), SUM(something) AS (title header) FROM (table) GROUP BY (table)

Writing a Join
SELECT * FROM (2nd table ) JOIN (1st table) ON (2nd table).(id, name, etc.) = (1st table).(id, name, etc.)

Rewritten as 

Select (firstletteroftable).(id,name,etc) AS (whatever name you want)