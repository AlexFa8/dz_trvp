CREATE TABLE bilbord(
    id SERIAL PRIMARY KEY,
    addres VARCHAR(255)
)

CREATE TABLE request(
    id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    date_st DATE,
    date_fn DATE,
    bilbord_id INTEGER,
    FOREIGN KEY (bilbord_id) REFERENCES bilbord (id)
)