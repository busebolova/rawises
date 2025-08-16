import pandas as pd
import requests
from io import StringIO

# Fetch the new categorized CSV data
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kategorili__r_n_Listesi-iosez1Am1EvZMsqWltO3EJjvEXJu84.csv"
response = requests.get(csv_url)
csv_data = StringIO(response.text)

# Read the CSV
df = pd.read_csv(csv_data)

print("=== KATEGORİLİ ÜRÜN LİSTESİ ANALİZİ ===")
print(f"Toplam kayıt sayısı: {len(df)}")
print(f"Sütunlar: {list(df.columns)}")

print("\n=== İLK 10 KAYIT ===")
print(df.head(10).to_string(index=False))

print("\n=== KATEGORİ HİYERARŞİSİ ANALİZİ ===")
# Kategorileri > işaretine göre böl
df['Ana_Kategori'] = df['Kategori'].str.split('>').str[1]  # İkinci seviye (Ana kategori)
df['Alt_Kategori'] = df['Kategori'].str.split('>').str[2]  # Üçüncü seviye
df['Detay_Kategori'] = df['Kategori'].str.split('>').str[3]  # Dördüncü seviye

print("\n=== ANA KATEGORİLER ===")
ana_kategoriler = df['Ana_Kategori'].value_counts()
print(ana_kategoriler)

print("\n=== EN POPÜLER ALT KATEGORİLER ===")
alt_kategoriler = df['Alt_Kategori'].value_counts().head(15)
print(alt_kategoriler)

print("\n=== DETAY KATEGORİLER (İLK 20) ===")
detay_kategoriler = df['Detay_Kategori'].value_counts().head(20)
print(detay_kategoriler)

print("\n=== KATEGORİ DERINLIK ANALİZİ ===")
df['Kategori_Seviyesi'] = df['Kategori'].str.count('>') + 1
seviye_dagilimi = df['Kategori_Seviyesi'].value_counts().sort_index()
print("Kategori seviye dağılımı:")
print(seviye_dagilimi)

print("\n=== ÖRNEK KATEGORİ YAPISI ===")
print("Saç Bakımı kategorisindeki ürünler:")
sac_bakim = df[df['Ana_Kategori'] == 'Saç Bakımı']['Kategori'].unique()[:10]
for kategori in sac_bakim:
    print(f"  {kategori}")

print("\n=== ÜRÜN İSİMLERİ ANALİZİ ===")
print(f"En uzun ürün ismi: {df['Ürün'].str.len().max()} karakter")
print(f"En kısa ürün ismi: {df['Ürün'].str.len().min()} karakter")
print(f"Ortalama ürün ismi uzunluğu: {df['Ürün'].str.len().mean():.1f} karakter")

# Marka analizi (ürün isminin ilk kelimesi genelde marka)
df['Muhtemel_Marka'] = df['Ürün'].str.split().str[0]
print("\n=== EN POPÜLER MARKALAR (Ürün ismine göre) ===")
marka_dagilimi = df['Muhtemel_Marka'].value_counts().head(15)
print(marka_dagilimi)
