import requests
import csv
import json
from io import StringIO
import uuid
import re
from html import unescape

# CSV URL'sinden veri çek
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-qFIu0YFQr9s35KRY9tH4G1Rous8QSY.csv"

print("[v0] CSV dosyası indiriliyor...")
response = requests.get(csv_url)
response.encoding = 'utf-8'

if response.status_code == 200:
    print(f"[v0] CSV başarıyla indirildi. Boyut: {len(response.text)} karakter")
    
    # CSV'yi parse et
    csv_data = StringIO(response.text)
    reader = csv.DictReader(csv_data)
    
    products = []
    processed_count = 0
    
    for row in reader:
        processed_count += 1
        
        # HTML etiketlerini temizle
        def clean_html(text):
            if not text:
                return ""
            # HTML etiketlerini kaldır
            clean = re.sub('<.*?>', '', text)
            # HTML entity'lerini decode et
            clean = unescape(clean)
            # Fazla boşlukları temizle
            clean = ' '.join(clean.split())
            return clean.strip()
        
        # Fiyatları parse et
        def parse_price(price_str):
            if not price_str:
                return 0
            try:
                # Sadece sayıları al
                price = re.sub(r'[^\d.]', '', str(price_str))
                return float(price) if price else 0
            except:
                return 0
        
        # Stok hesapla
        def calculate_stock(adana_stock, ana_depo_stock):
            adana = 0
            ana_depo = 0
            try:
                adana = int(adana_stock) if adana_stock else 0
            except:
                adana = 0
            try:
                ana_depo = int(ana_depo_stock) if ana_depo_stock else 0
            except:
                ana_depo = 0
            return adana + ana_depo
        
        # Ürün verilerini map et
        name = row.get('İsim', '').strip()
        if not name:
            continue
            
        description = clean_html(row.get('Açıklama', ''))
        sale_price = parse_price(row.get('Satış Fiyatı', '0'))
        discount_price = parse_price(row.get('İndirimli Fiyatı', '0'))
        
        # İndirimli fiyat varsa onu kullan, yoksa satış fiyatını
        final_price = discount_price if discount_price > 0 else sale_price
        
        stock_adana = row.get('Stok:Adana Selahattin Eyyübi', '0')
        stock_ana_depo = row.get('Stok:Ana Depo', '0')
        total_stock = calculate_stock(stock_adana, stock_ana_depo)
        
        category = row.get('Kategoriler', '').replace('Tüm Ürünler>', '').replace('>', ' > ')
        image_url = row.get('Resim URL', '').strip()
        sku = row.get('SKU', '').strip()
        brand = row.get('Marka', '').strip()
        
        # Sadece aktif ve stokta olan ürünleri al
        is_active = row.get('Varyant Aktiflik', 'false').lower() == 'true'
        is_deleted = row.get('Silindi mi?', 'false').lower() == 'true'
        
        if not is_deleted and is_active and total_stock > 0 and final_price > 0:
            product = {
                'id': str(uuid.uuid4()),
                'name': name,
                'description': description[:500] if description else f"{brand} {name}",
                'price': final_price,
                'stock_quantity': total_stock,
                'category': category if category else 'Genel',
                'image_url': image_url if image_url else '',
                'sku': sku if sku else str(uuid.uuid4())[:8],
                'is_active': True
            }
            products.append(product)
            
            if len(products) <= 10:  # İlk 10 ürünü logla
                print(f"[v0] Ürün eklendi: {name} - {final_price} TL - Stok: {total_stock}")
    
    print(f"[v0] Toplam {processed_count} satır işlendi")
    print(f"[v0] {len(products)} geçerli ürün bulundu")
    
    # İlk 50 ürünü göster (test için)
    limited_products = products[:50]
    print(f"[v0] İlk {len(limited_products)} ürün import edilecek")
    
    # JSON olarak kaydet
    with open('/tmp/imported_products.json', 'w', encoding='utf-8') as f:
        json.dump(limited_products, f, ensure_ascii=False, indent=2)
    
    print(f"[v0] Ürünler /tmp/imported_products.json dosyasına kaydedildi")
    
    # Örnek ürünleri göster
    for i, product in enumerate(limited_products[:5]):
        print(f"[v0] Örnek ürün {i+1}: {product['name']} - {product['price']} TL")

else:
    print(f"[v0] CSV indirilemedi. HTTP Status: {response.status_code}")
