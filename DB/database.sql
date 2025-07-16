create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    pswd VARCHAR,
    role_id INTEGER,
    token_id INTEGER,
    info_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES person_role (id),
    FOREIGN KEY (token_id) REFERENCES person_token (id),
    FOREIGN KEY (info_id) REFERENCES person_info (id)
);

create TABLE person_role(
    id SERIAL PRIMARY KEY,
    rol VARCHAR
);

create TABLE person_token(
    id SERIAL PRIMARY KEY,
    token VARCHAR
);

create TABLE person_info(
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    age INTEGER
);

create TABLE article(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    views INTEGER,
    content_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (content_id) REFERENCES article_content (id),
    FOREIGN KEY (user_id) REFERENCES person (id)
);

create TABLE article_content(
    id SERIAL PRIMARY KEY,
    img VARCHAR,
    paragraph VARCHAR
);
