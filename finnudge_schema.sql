CREATE DATABASE IF NOT EXISTS finnudge;
USE finnudge;

CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100),
   email VARCHAR(150) UNIQUE,
   phone VARCHAR(15),
   password_hash VARCHAR(255),
   monthly_income DECIMAL(12,2),
   household_id INT DEFAULT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE households (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100),
   created_by INT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Adding foreign key for household_id in users table after households table is created
ALTER TABLE users
ADD CONSTRAINT fk_household
FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE SET NULL;

CREATE TABLE transactions (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   amount DECIMAL(12,2),
   description VARCHAR(255),
   category ENUM('food','transport','entertainment','housing','groceries','subscriptions','investment','other'),
   source ENUM('manual','sms','pdf'),
   transaction_date DATE,
   is_credit BOOLEAN DEFAULT FALSE,
   fingerprint VARCHAR(255),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE fixed_expenses (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   name VARCHAR(100),
   amount DECIMAL(12,2),
   due_day INT,
   category VARCHAR(50),
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE savings_goals (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   goal_name VARCHAR(100),
   target_amount DECIMAL(12,2),
   current_saved DECIMAL(12,2) DEFAULT 0,
   deadline DATE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE loans (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   loan_type VARCHAR(50),
   outstanding_amount DECIMAL(12,2),
   interest_rate DECIMAL(5,2),
   monthly_emi DECIMAL(12,2),
   due_day INT,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE fixed_deposits (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   bank_name VARCHAR(100),
   principal DECIMAL(12,2),
   interest_rate DECIMAL(5,2),
   maturity_date DATE,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE stocks (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   stock_name VARCHAR(100),
   symbol VARCHAR(20),
   quantity INT,
   purchase_price DECIMAL(12,2),
   current_price DECIMAL(12,2),
   last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE subscriptions (
   id INT AUTO_INCREMENT PRIMARY KEY,
   user_id INT,
   name VARCHAR(100),
   monthly_cost DECIMAL(10,2),
   next_renewal DATE,
   last_used DATE NULL,
   is_cancelled BOOLEAN DEFAULT FALSE,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE nudges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(50),
    message TEXT,
    is_dismissed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE copilot_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role ENUM('user','assistant'),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
