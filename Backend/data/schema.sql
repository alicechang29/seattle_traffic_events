
CREATE TABLE locations(
    venue VARCHAR(150) NOT NULL PRIMARY KEY,
    zipcode VARCHAR (10) NOT NULL,
    lat DECIMAL(9,6) NOT NULL,
    long DECIMAL(9,6) NOT NULL
);


CREATE TABLE traffic_events(
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    short_name VARCHAR(250) NOT NULL,
    status_value VARCHAR(50) NOT NULL,
    status_completed BOOLEAN NOT NULL,
    venue VARCHAR (150) NOT NULL
        REFERENCES locations ON DELETE CASCADE,
    zipcode VARCHAR (10) NOT NULL
);

