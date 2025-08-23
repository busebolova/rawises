-- Insert initial categories
INSERT INTO public.categories (name, description) VALUES
('Elektronik', 'Elektronik ürünler ve aksesuarlar'),
('Giyim', 'Kadın, erkek ve çocuk giyim'),
('Ev & Yaşam', 'Ev dekorasyonu ve yaşam ürünleri'),
('Spor', 'Spor malzemeleri ve fitness ürünleri'),
('Kitap', 'Kitaplar ve eğitim materyalleri')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, description, price, category, image_url, stock_quantity, sku) VALUES
('iPhone 15 Pro', 'Apple iPhone 15 Pro 128GB', 45999.99, 'Elektronik', '/placeholder.svg?height=300&width=300', 25, 'IP15P-128'),
('Samsung Galaxy S24', 'Samsung Galaxy S24 256GB', 38999.99, 'Elektronik', '/placeholder.svg?height=300&width=300', 30, 'SGS24-256'),
('Nike Air Max', 'Nike Air Max spor ayakkabı', 2499.99, 'Spor', '/placeholder.svg?height=300&width=300', 50, 'NAM-001'),
('Zara Gömlek', 'Erkek klasik gömlek', 299.99, 'Giyim', '/placeholder.svg?height=300&width=300', 100, 'ZG-001'),
('Kahve Makinesi', 'Otomatik kahve makinesi', 1299.99, 'Ev & Yaşam', '/placeholder.svg?height=300&width=300', 15, 'KM-001')
ON CONFLICT (sku) DO NOTHING;

-- Insert initial discount setting
INSERT INTO public.discount_settings (name, discount_percentage, is_active, applies_to) VALUES
('Üye İndirimi', 15.00, true, 'members')
ON CONFLICT DO NOTHING;
