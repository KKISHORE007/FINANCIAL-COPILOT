USE finnudge;

-- Clean existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE copilot_messages;
TRUNCATE TABLE nudges;
TRUNCATE TABLE subscriptions;
TRUNCATE TABLE stocks;
TRUNCATE TABLE fixed_deposits;
TRUNCATE TABLE loans;
TRUNCATE TABLE savings_goals;
TRUNCATE TABLE fixed_expenses;
TRUNCATE TABLE transactions;
TRUNCATE TABLE households;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Seed User: Ramesh Kumar (Password: Test@1234)
-- The password hash here corresponds to the bcrypt hash of Test@1234
INSERT INTO users (id, name, email, phone, password_hash, monthly_income) VALUES
(1, 'Ramesh Kumar', 'ramesh@example.com', '9876543210', '$2a$10$Z3B/OIN.yqM7VlItF0u21uyDItC6zU/lS838IOM.V4.u/vY8A.lWq', 60000.00);

-- Seed Transactions (20 mix of food, transport, entertainment etc., mostly within current and past month)
INSERT INTO transactions (user_id, amount, description, category, source, transaction_date, is_credit, fingerprint) VALUES
(1, 1500, 'Swiggy Dinner', 'food', 'sms', DATE_SUB(CURDATE(), INTERVAL 1 DAY), 0, 'f1'),
(1, 450, 'Zomato Lunch', 'food', 'sms', DATE_SUB(CURDATE(), INTERVAL 2 DAY), 0, 'f2'),
(1, 800, 'Uber Ride Home', 'transport', 'sms', DATE_SUB(CURDATE(), INTERVAL 3 DAY), 0, 'f3'),
(1, 200, 'Metro Card Recharge', 'transport', 'manual', DATE_SUB(CURDATE(), INTERVAL 5 DAY), 0, 'f4'),
(1, 2500, 'Movie & Popcorn PVR', 'entertainment', 'manual', DATE_SUB(CURDATE(), INTERVAL 7 DAY), 0, 'f5'),
(1, 15000, 'Apartment Rent', 'housing', 'pdf', DATE_SUB(CURDATE(), INTERVAL 10 DAY), 0, 'f6'),
(1, 4000, 'BigBazaar Groceries', 'groceries', 'pdf', DATE_SUB(CURDATE(), INTERVAL 12 DAY), 0, 'f7'),
(1, 899, 'Netflix Standard', 'subscriptions', 'sms', DATE_SUB(CURDATE(), INTERVAL 15 DAY), 0, 'f8'),
(1, 5000, 'Mutual Fund SIP', 'investment', 'manual', DATE_SUB(CURDATE(), INTERVAL 20 DAY), 0, 'f9'),
(1, 950, 'Dominos Pizza', 'food', 'sms', DATE_SUB(CURDATE(), INTERVAL 22 DAY), 0, 'f10'),
(1, 300, 'Auto Rickshaw', 'transport', 'manual', DATE_SUB(CURDATE(), INTERVAL 23 DAY), 0, 'f11'),
(1, 1200, 'Cafe Coffee Day', 'entertainment', 'sms', DATE_SUB(CURDATE(), INTERVAL 25 DAY), 0, 'f12'),
(1, 3200, 'Blinkit Monthly Supplies', 'groceries', 'sms', DATE_SUB(CURDATE(), INTERVAL 27 DAY), 0, 'f13'),
(1, 60000, 'Monthly Salary VMWare', 'other', 'pdf', DATE_SUB(CURDATE(), INTERVAL 28 DAY), 1, 'f14'),
(1, 1500, 'Amazon Prime Video', 'subscriptions', 'manual', DATE_SUB(CURDATE(), INTERVAL 31 DAY), 0, 'f15'),
(1, 550, 'Baskin Robbins', 'food', 'sms', DATE_SUB(CURDATE(), INTERVAL 33 DAY), 0, 'f16'),
(1, 4000, 'Flight Booking MakeMyTrip', 'transport', 'manual', DATE_SUB(CURDATE(), INTERVAL 35 DAY), 0, 'f17'),
(1, 999, 'Spotify Premium Annual', 'subscriptions', 'manual', DATE_SUB(CURDATE(), INTERVAL 40 DAY), 0, 'f18'),
(1, 2800, 'Drinks with friends', 'entertainment', 'manual', DATE_SUB(CURDATE(), INTERVAL 42 DAY), 0, 'f19'),
(1, 500, 'Miscellaneous Cash', 'other', 'manual', DATE_SUB(CURDATE(), INTERVAL 45 DAY), 0, 'f20');

-- Seed Stocks
INSERT INTO stocks (user_id, stock_name, symbol, quantity, purchase_price, current_price) VALUES
(1, 'Infosys', 'INFY', 20, 1400.00, 1450.00),
(1, 'Tata Consultancy', 'TCS', 15, 3800.00, 3750.00),
(1, 'Wipro', 'WIPRO', 50, 420.00, 470.00),
(1, 'Reliance Industries', 'RELIANCE', 10, 2400.00, 2900.00);

-- Seed Subscriptions (including 2 unused)
INSERT INTO subscriptions (user_id, name, monthly_cost, next_renewal, last_used, is_cancelled) VALUES
(1, 'Netflix', 899.00, DATE_ADD(CURDATE(), INTERVAL 15 DAY), DATE_SUB(CURDATE(), INTERVAL 2 DAY), 0),
(1, 'Hotstar', 299.00, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_SUB(CURDATE(), INTERVAL 5 DAY), 0),
(1, 'YouTube Premium', 129.00, DATE_ADD(CURDATE(), INTERVAL 20 DAY), CURDATE(), 0),
(1, 'Spotify', 119.00, DATE_ADD(CURDATE(), INTERVAL 10 DAY), DATE_SUB(CURDATE(), INTERVAL 45 DAY), 0), -- Unused > 30 days
(1, 'Amazon Music', 129.00, DATE_ADD(CURDATE(), INTERVAL 25 DAY), DATE_SUB(CURDATE(), INTERVAL 60 DAY), 0); -- Unused > 30 days

-- Seed Savings Goal
INSERT INTO savings_goals (user_id, goal_name, target_amount, current_saved, deadline) VALUES
(1, 'Goa Trip', 60000.00, 15000.00, '2026-06-01');

-- Seed Loans
INSERT INTO loans (user_id, loan_type, outstanding_amount, interest_rate, monthly_emi, due_day) VALUES
(1, 'Home Loan', 2800000.00, 8.50, 12400.00, 5);

-- Seed Fixed Deposits
INSERT INTO fixed_deposits (user_id, bank_name, principal, interest_rate, maturity_date) VALUES
(1, 'HDFC Bank', 100000.00, 7.50, '2026-12-31');

-- Seed Nudges
INSERT INTO nudges (user_id, type, message, is_dismissed) VALUES
(1, 'overspend', 'You have overspent on Food & Dining by 25% this week.', 0),
(1, 'inflation', 'Lifestyle Inflation Warning: Your non-essential spending is up 15% from last month.', 0),
(1, 'stock', 'Action Required: Your TCS stock portfolio is down by 1.3%. Check our AI suggestions to recover and rebalance.', 0);
