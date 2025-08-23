-- Create products table with proper structure
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- Create stock_movements table for inventory tracking
CREATE TABLE IF NOT EXISTS public.stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL, -- 'in', 'out', 'adjustment'
  quantity INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create discount_settings table
CREATE TABLE IF NOT EXISTS public.discount_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  discount_percentage DECIMAL(5,2) NOT NULL,
  is_active BOOLEAN DEFAULT false,
  applies_to TEXT DEFAULT 'members', -- 'members', 'all', 'category'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for public access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is an e-commerce site)
-- Products - public read, admin write
CREATE POLICY "Allow public read access to active products" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow all operations on products" ON public.products
  FOR ALL USING (true);

-- Categories - public read
CREATE POLICY "Allow public read access to categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations on categories" ON public.categories
  FOR ALL USING (true);

-- Orders - public insert, admin read/update
CREATE POLICY "Allow public insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all operations on orders" ON public.orders
  FOR ALL USING (true);

-- Order items - public insert, admin read
CREATE POLICY "Allow public insert order_items" ON public.order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all operations on order_items" ON public.order_items
  FOR ALL USING (true);

-- Stock movements - admin only
CREATE POLICY "Allow all operations on stock_movements" ON public.stock_movements
  FOR ALL USING (true);

-- Discount settings - public read, admin write
CREATE POLICY "Allow public read access to discount_settings" ON public.discount_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations on discount_settings" ON public.discount_settings
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);
CREATE INDEX IF NOT EXISTS idx_stock_movements_product_id ON public.stock_movements(product_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discount_settings_updated_at BEFORE UPDATE ON public.discount_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
