-- Clear sample products and add real cosmetics/makeup products
-- Delete existing sample products
DELETE FROM products;

-- Insert real cosmetics/makeup products
INSERT INTO products (id, name, description, price, category, sku, stock_quantity, is_active, image_url) VALUES
(gen_random_uuid(), 'Maybelline Fit Me Foundation', 'Maybelline New York Fit Me Matte + Poreless Foundation 30ml', 89.99, 'Makyaj', 'MBL-FTM-30', 25, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'L''Oreal Paris Voluminous Mascara', 'L''Oreal Paris Voluminous Original Mascara Siyah', 65.99, 'Makyaj', 'LOR-VOL-BLK', 30, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'MAC Ruby Woo Lipstick', 'MAC Lipstick Ruby Woo Matte Ruj', 159.99, 'Makyaj', 'MAC-RW-MAT', 15, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'Urban Decay Naked Palette', 'Urban Decay Naked Eyeshadow Palette Far Paleti', 299.99, 'Makyaj', 'UD-NKD-PAL', 12, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'Fenty Beauty Gloss Bomb', 'Fenty Beauty Gloss Bomb Universal Lip Luminizer', 119.99, 'Makyaj', 'FTY-GB-UNI', 20, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'Charlotte Tilbury Magic Cream', 'Charlotte Tilbury Magic Cream Nemlendirici 50ml', 449.99, 'Cilt Bakımı', 'CT-MC-50', 8, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'The Ordinary Niacinamide', 'The Ordinary Niacinamide 10% + Zinc 1% Serum 30ml', 45.99, 'Cilt Bakımı', 'TO-NIA-30', 35, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'Rare Beauty Blush', 'Rare Beauty Soft Pinch Liquid Blush Allık', 139.99, 'Makyaj', 'RB-SP-BLU', 18, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'Glossier Cloud Paint', 'Glossier Cloud Paint Gel Blush Allık', 99.99, 'Makyaj', 'GLS-CP-GEL', 22, true, '/placeholder.svg?height=300&width=300'),
(gen_random_uuid(), 'Drunk Elephant Vitamin C', 'Drunk Elephant C-Firma Day Serum Vitamin C 15ml', 189.99, 'Cilt Bakımı', 'DE-CF-15', 14, true, '/placeholder.svg?height=300&width=300');

-- Update categories table with cosmetics categories
DELETE FROM categories;
INSERT INTO categories (id, name, description) VALUES
(gen_random_uuid(), 'Makyaj', 'Fondöten, ruj, maskara, far ve diğer makyaj ürünleri'),
(gen_random_uuid(), 'Cilt Bakımı', 'Nemlendirici, serum, temizleyici ve cilt bakım ürünleri'),
(gen_random_uuid(), 'Parfüm & Deodorant', 'Kadın ve erkek parfümleri, deodorant ürünleri'),
(gen_random_uuid(), 'Saç Bakımı', 'Şampuan, saç kremi, saç bakım ürünleri'),
(gen_random_uuid(), 'Kişisel Bakım', 'Diş bakımı, vücut bakımı ve hijyen ürünleri');
