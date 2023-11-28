CREATE TABLE IF NOT EXISTS users (
  id char(36) PRIMARY KEY NOT NULL,
  name varchar(50) NOT NULL,
  email varchar(40) NOT NULL,
  pass_hash char(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS urls (
  id char(6) PRIMARY KEY NOT NULL,
  origin_url varchar(60) NOT NULL,
  owner_id char(36) NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  deleted_at timestamp NULL,
  clicks integer NOT NULL DEFAULT 0
);

INSERT INTO users
  (id, name, email, pass_hash)
VALUES
  (
    '320d3c04-cc57-435e-92f9-d6e3f6e0a7f4',
    'Noah Henderson',
    'noahhenderson@gmail.com',
    '43a0088bbceeab1fa69770061e3d1a1fafc6b7fcce79953fcfd120fb179cf890'
  ),
  (
    '1da55e15-f253-488d-8590-e0c8a955898b',
    'Harley Jax',
    'harleyjax@gmail.com',
    '51e0f35d31854a529d90c3aa14352f344270c33789c860e60d026daf56eba3a2'
  ),
  (
    'bc169144-f3bd-440f-8f60-5b9c833eda47',
    'Jake Hurt',
    'jakehurt@gmail.com',
    '4535c73922f302a0a9e32714c1d50eba8cd9c7a455b88e04e3d60174f93b31fb'
  );

INSERT INTO urls
  (id, origin_url, owner_id, created_at, updated_at, deleted_at)
VALUES
  (
    'JLBMGT',
    'https://youtube.com',
    '320d3c04-cc57-435e-92f9-d6e3f6e0a7f4',
    TO_TIMESTAMP('2023-11-27 20:30:00', 'YYYY-MM-DD HH24:MI:SS'),
    TO_TIMESTAMP('2023-11-27 20:30:00', 'YYYY-MM-DD HH24:MI:SS'),
    NULL
  ),
  (
    '3VbxqL',
    'https://google.com',
    '320d3c04-cc57-435e-92f9-d6e3f6e0a7f4',
    TO_TIMESTAMP('2023-11-27 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
    TO_TIMESTAMP('2023-11-27 21:00:00', 'YYYY-MM-DD HH24:MI:SS'),
    NULL
  );
