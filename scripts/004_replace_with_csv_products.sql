-- Clear all existing products and replace with CSV data
-- First, delete all existing products
DELETE FROM products;

-- Reset the sequence to start from 1
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Note: The actual CSV data will be inserted via the API endpoint
-- This script just clears the existing sample products
