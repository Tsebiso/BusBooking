--users TABLE
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  _id uuid DEFAULT uuid_generate_v4 (),
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phoneNumber VARCHAR(10) UNIQUE NOT NULL,
  accountStatus boolean NOT NULL,
  userType VARCHAR(10) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (_id)
);

DROP TABLE IF EXISTS booking CASCADE;
CREATE TABLE booking (
  bookingNo SERIAL PRIMARY KEY,
  _id UUID,
  bus_id INT,
  busName VARCHAR(255) NOT NULL,
  route VARCHAR(255) NOT NULL,
  seat VARCHAR(3) NOT NULL,
  fare VARCHAR(5) NOT NULL,
  departure VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (_id) REFERENCES users (_id),
  FOREIGN KEY (bus_id) REFERENCES users (bus_id)
);

SELECT firstName, lastName, busname, route, seat, fare, departure, status, date
FROM   users u, booking b
WHERE u._id = b._id
AND  b._id = '8c1eba85-e58e-45e3-b5a4-1b1b9c33d387'

DROP TABLE IF EXISTS account CASCADE;
CREATE TABLE account (
  accountNo REAL PRIMARY KEY,
  customerId UUID,
  balance NUMERIC NOT NULL,
  FOREIGN KEY (customerId) REFERENCES users (_id)
);

DROP TABLE IF EXISTS card CASCADE;
CREATE TABLE card(
  cardNumber VARCHAR(16) PRIMARY KEY,
  _id UUID,
  cardName VARCHAR(255) NOT NULL,
  expiaryDate VARCHAR(5) NOT NULL,
  cvvNumber VARCHAR(3) NOT NULL,
  cardStatus boolean NOT NULL,
  FOREIGN KEY (_id) REFERENCES users(_id)
);

DROP TABLE IF EXISTS transactions CASCADE;
CREATE TABLE transactions (
  transactionID SERIAL PRIMARY KEY,
  _id UUID,
  amount SMALLINT NOT NULL,
  transactiontype VARCHAR(255) NOT NULL,
  accountNo REAL,
  transactionDate TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (accountNo) REFERENCES account(accountNo),
  FOREIGN KEY (_id) REFERENCES users(_id)
);

DROP TABLE IF EXISTS bus CASCADE;
CREATE TABLE bus (
  bus_id SERIAL PRIMARY KEY,
  busName VARCHAR(255) NOT NULL,
  totTrips VARCHAR(10) NOT NULL,
  totDistance VARCHAR(10) NOT NULL
);

DROP TABLE IF EXISTS driver CASCADE;
CREATE TABLE driver (
  driver_id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  bus_id INT,
  FOREIGN KEY (bus_id) REFERENCES bus(bus_id)
);

DROP TABLE IF EXISTS routes CASCADE
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  depart VARCHAR(10) NOT NULL,
  arrive VARCHAR(10) NOT NULL,
  fare VARCHAR(5) NOT NULL,
  distance VARCHAR(10) NOT NULL,
  bus_id INT,
  FOREIGN KEY (bus_id) REFERENCES bus(bus_id)
);

SELECT id, busname, origin, destination, depart, arrive, fare, distance, firstName, lastName, r.bus_id
FROM routes r, bus b, driver d
WHERE r.bus_id = b.bus_id
AND b.bus_id = d.driver_id

INSERT INTO routes ( origin, destination, depart, arrive, fare, distance, bus_id )
VALUES ('Johannesburg', 'Durban', '08:00', '15:00', '660', '574', 1)
  ('Johannesburg', 'Durban', '16:00', '23:20', '600', '574', 17)
  ('Johannesburg', 'Polokwane', '08:15', '14:00', '380', '320', 2),
  ('Johannesburg', 'Polokwane', '05:00', '12:00', '350', '320', 18),
  ('Johannesburg', 'Maputo', '07:20', '16:15', '720', '551', 3),
  ('Johannesburg', 'Maputo', '09:15', '18:18', '750', '551', 19),
  ('Johannesburg', 'Bloemfontein', '08:30', '16:15', '445', '398', 4),
  ('Johannesburg', 'Bloemfontein', '06:06', '13:13', '440', '398', 20),
  ('Polokwane', 'Johannesburg', '08:30', '14:30', '410', '320', 5),
  ('Polokwane', 'Johannesburg', '07:15', '13:30', '420', '320', 21),
  ('Polokwane', 'Durban', '06:00', '18:00', '1010', '878', 6),
  ('Polokwane', 'Durban', '19:10', '06:00', '1020', '878',22),
  ('Polokwane', 'Maputo', '08:00', '17:15', '600', '511', 7),
  ('Polokwane', 'Maputo', '06:06', '15:15', '550', '511', 23),
  ('Polokwane', 'Bloemfontein', '07:10', '15:15', '810', '715', 8),
  ('Polokwane', 'Bloemfontein', '16:16', '02:02', '810', '715', 24),
  ('Bloemfontein', 'Polokwane', '06:00', '14:10', '820', '715', 9),
  ('Bloemfontein', 'Polokwane', '09:09', '16:00', '800', '715', 25),
  ('Bloemfontein', 'Maputo', '05:30', '17:00', '1020', '946', 10),
  ('Bloemfontein', 'Maputo', '18:30', '05:45', '1050', '946', 26),
  ('Bloemfontein', 'Durban', '07:10', '14:30', '600', '504', 11),
  ('Bloemfontein', 'Durban', '15:30', '22:45', '550', '504', 27),
  ('Bloemfontein', 'Johannesburg', '08:00', '13:10', '450', '398', 12),
  ('Bloemfontein', 'Johannesburg', '14:10', '21:00', '420', '398', 28),
  ('Maputo', 'Johannesburg', '08:00', '17:10', '700', '551', 13),
  ('Maputo', 'Johannesburg', '20:20', '04:40', '750', '551', 29),
  ('Maputo', 'Bloemfontein', '06:10', '17:00', '1100', '946', 14),
  ('Maputo', 'Bloemfontein', '20:20', '04:45', '1150', '946', 30),
  ('Maputo', 'Polokwane', '07:15', '14:00', '550', '511', 15),
  ('Maputo', 'Polokwane', '16:00', '23:20', '580', '511', 31),
  ('Maputo', 'Durban', '07:00', '15:15', '620', '542', 16)
  ('Maputo', 'Durban', '16:16', '23:15', '670', '542', 32)


INSERT INTO driver (firstName, lastName, bus_id)
VALUES ('Adelaide', 'Mabaso', 14),
('Fihliwe', 'Sambo', 15),
('Musa', 'Nkhwashu', 16),
('Menro', 'Nkuna', 17),
('Dumisani', 'Mathevula', 18),
('Abenigo', 'Sibuyi', 19),
('Zanel', 'Vasloo', 20),
('Anele', 'Mashwama', 21),
('Retief', 'Vermulen', 22),
('Ross', 'Cotzee', 23),
('Quinton', 'De kock', 24),
('David', 'Miller', 25),
('Thembeka', 'Khoza', 26)
('Ntsako', 'Khoza', 27)
('Cliffird', 'Chibi', 28),
('Chachulani', 'Mathebula', 29),
('Thabo', 'Sodhi', 30),
('Nhlahla', 'Mavundla', 31),
('Zintle', 'Meslane', 32);

INSERT INTO bus (bus_name, totTrips, totDistance)
VALUES ('Intercape', 0, 0),
  ('Greyhound', 0, 0),
  ('Citiliner', 0, 0),
  ('IntercityXpress', 0, 0),
  ('Eagle Liner', 0, 0),
  ('Intercape', 0, 0);
  ('Greyhound', 0, 0),
  ('Citiliner', 0, 0),
  ('IntercityXpress', 0, 0),
  ('Eagle Liner', 0, 0),
  ('Intercape', 0, 0);
  ('Greyhound', 0, 0),
  ('Citiliner', 0, 0);