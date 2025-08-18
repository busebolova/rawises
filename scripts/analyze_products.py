import pandas as pd
import requests
from io import StringIO

# Fetch the CSV data
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv"
response = requests.get(csv_url)
csv_data = StringIO(response.text)

# Read the CSV
df = pd.read_csv(csv_data)

print("=== ÜRÜN VERİSİ ANALİZİ ===")
print(f"Toplam ürün sayısı: {len(df)}")
print(f"Toplam sütun sayısı: {len(df.columns)}")

print("\n=== MARKA DAĞILIMI ===")
brand_counts = df['Marka'].value_counts().head(10)
print(brand_counts)

print("\n=== KATEGORİ DAĞILIMI ===")
# Kategorileri ayır ve analiz et
categories = df['Kategoriler'].str.split('>').str[-1]  # Son kategoriyi al
category_counts = categories.value_counts().head(10)
print(category_counts)

print("\n=== FİYAT ANALİZİ ===")
df['Satış Fiyatı'] = pd.to_numeric(df['Satış Fiyatı'], errors='coerce')
df['İndirimli Fiyatı'] = pd.to_numeric(df['İndirimli Fiyatı'], errors='coerce')

print(f"Ortalama satış fiyatı: {df['Satış Fiyatı'].mean():.2f} TL")
print(f"Ortalama indirimli fiyat: {df['İndirimli Fiyatı'].mean():.2f} TL")

# İndirim oranını hesapla
df['İndirim Oranı'] = ((df['Satış Fiyatı'] - df['İndirimli Fiyatı']) / df['Satış Fiyatı'] * 100).round(2)
print(f"Ortalama indirim oranı: %{df['İndirim Oranı'].mean():.2f}")

print("\n=== EN POPÜLER ÜRÜNLER ===")
popular_products = df[['İsim', 'Marka', 'Satış Fiyatı', 'İndirimli Fiyatı', 'İndirim Oranı']].head(10)
print(popular_products.to_string(index=False))

print("\n=== STOK DURUMU ===")
# Ana depo stok durumu
df['Ana Depo Stok'] = pd.to_numeric(df['Stok:Ana Depo'], errors='coerce')
stok_durumu = df['Ana Depo Stok'].describe()
print(stok_durumu)
