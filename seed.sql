-- Make new table and drop if it already exist
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerk_id TEXT,
    content TEXT
);

DROP TABLE IF EXISTS profiles;
CREATE TABLE profiles (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clerk_id TEXT,
    username TEXT,
    bio TEXT
);

-- insert dummy data
INSERT INTO profiles (clerk_id, username, bio)
VALUES 
    ('clerk1', 'user1', 'Bio for user1'),
    ('clerk2', 'user2', 'Bio for user2'),
    ('clerk3', 'user3', 'Bio for user3');

    insert into
  posts (clerk_id, content)
values
  ('clerk1', 'This is the first post by user1.'),
  ('clerk1', 'Another insightful post by user1.'),
  ('clerk2', 'Post by user2 sharing some thoughts.'),
  ('clerk3', 'User3''s first post!');


  ALTER TABLE posts
ADD COLUMN createdAt TIMESTAMP DEFAULT NOW();

UPDATE posts
SET timestamp = NOW()
WHERE timestamp IS NULL;


SELECT posts.id, posts.content, profiles.username, posts.clerk_id
FROM posts
INNER JOIN profiles ON posts.clerk_id = profiles.clerk_id
ORDER BY posts.timestamp DESC
