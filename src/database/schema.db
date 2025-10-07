CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','organizer','volunteer') DEFAULT 'volunteer',
  phone VARCHAR(30),
  birth_date DATE,
  gender ENUM('M','F','O'),
  cpf VARCHAR(14) UNIQUE,
  blood_type ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-'),
  cep VARCHAR(9),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(50),
  availability TEXT,
  skills TEXT,
  emergency_contact VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME
);

CREATE TABLE event_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(150)
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_type_id INT,
  location VARCHAR(255),
  address VARCHAR(255),
  start_at DATETIME NOT NULL,
  end_at DATETIME,
  capacity INT,
  status ENUM('draft','published','closed','cancelled') DEFAULT 'draft',
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME,
  CONSTRAINT fk_events_event_type FOREIGN KEY (event_type_id) REFERENCES event_types(id),
  CONSTRAINT fk_events_created_by FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE event_participants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT,
  role_in_event ENUM('participant','volunteer_coordinator') DEFAULT 'participant',
  status ENUM('registered','attended','no_show','cancelled') DEFAULT 'registered',
  checkin_at DATETIME,
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME,
  CONSTRAINT fk_event_participants_event FOREIGN KEY (event_id) REFERENCES events(id),
  CONSTRAINT fk_event_participants_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  actor_user_id INT,
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id INT,
  payload JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_logs_user FOREIGN KEY (actor_user_id) REFERENCES users(id)
);

CREATE TABLE event_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT,
  user_id INT NULL,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_event_views_event FOREIGN KEY (event_id) REFERENCES events(id),
  CONSTRAINT fk_event_views_user FOREIGN KEY (user_id) REFERENCES users(id)
);
