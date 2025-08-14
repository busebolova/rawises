import pandas as pd
import requests
from io import StringIO
from collections import defaultdict

# Fetch the CSV data
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ikas-urunler-zmnfhV8bFHFTmr603W1kIsWmJk4QiD.csv"
response = requests.get(csv_url)
csv_data = StringIO(response.text)

# Read the CSV
df = pd.read_csv(csv_data)

print("=== KATEGORİ ANALİZİ ===")
print(f"Toplam ürün sayısı: {len(df)}")
print(f"Aktif ürün sayısı: {len(df[df['Varyant Aktiflik'] == True])}")

# Kategorileri analiz et
categories_dict = defaultdict(set)
all_categories = set()

print("\n=== İLK 10 ÜRÜNÜN KATEGORİ ÖRNEKLERİ ===")
for index, row in df.head(10).iterrows():
    if pd.notna(row['Kategoriler']):
        print(f"Ürün {index+1}: {row['Kategoriler']}")

print("\n=== KATEGORİ YAPISI ANALİZİ ===")
for index, row in df.iterrows():
    if pd.notna(row['Kategoriler']) and row['Varyant Aktiflik'] == True:
        category_path = str(row['Kategoriler']).strip()
        if category_path and category_path != 'nan':
            # Kategori yolunu parçala (> ile ayrılmış)
            parts = [part.strip() for part in category_path.split('>')]
            
            if len(parts) >= 1:
                main_category = parts[0]
                all_categories.add(main_category)
                
                # Alt kategorileri topla
                if len(parts) >= 2:
                    subcategory = parts[1]
                    categories_dict[main_category].add(subcategory)

print(f"\nToplam ana kategori sayısı: {len(all_categories)}")
print(f"Ana kategoriler: {sorted(all_categories)}")

print("\n=== DETAYLI KATEGORİ LİSTESİ ===")
for main_cat in sorted(all_categories):
    main_count = len(df[(df['Kategoriler'].str.contains(main_cat, na=False, case=False)) & 
                       (df['Varyant Aktiflik'] == True)])
    print(f"\n📁 {main_cat} ({main_count} ürün)")
    
    subcats = sorted(categories_dict[main_cat])
    for subcat in subcats:
        # Her alt kategori için ürün sayısını hesapla
        count = len(df[(df['Kategoriler'].str.contains(f"{main_cat}.*{subcat}", na=False, case=False)) & 
                      (df['Varyant Aktiflik'] == True)])
        print(f"   └── {subcat} ({count} ürün)")

print("\n=== MENÜ İÇİN ÖNERİLEN YAPI ===")
print("// Bu yapıyı doğrudan kodda kullanabilirsiniz:")
print("const categories = [")

for main_cat in sorted(all_categories):
    main_count = len(df[(df['Kategoriler'].str.contains(main_cat, na=False, case=False)) & 
                       (df['Varyant Aktiflik'] == True)])
    
    if main_count >= 3:  # En az 3 ürünü olan kategorileri dahil et
        subcats = sorted(categories_dict[main_cat])
        valid_subcats = []
        
        for subcat in subcats:
            subcat_count = len(df[(df['Kategoriler'].str.contains(f"{main_cat}.*{subcat}", na=False, case=False)) & 
                                 (df['Varyant Aktiflik'] == True)])
            if subcat_count >= 1:  # En az 1 ürünü olan alt kategorileri dahil et
                valid_subcats.append(subcat)
        
        print(f'  {{')
        print(f'    name: "{main_cat}",')
        print(f'    subcategories: [')
        for subcat in valid_subcats:
            print(f'      "{subcat}",')
        print(f'    ],')
        print(f'  }},')

print("];")

print("\n=== MARKA ANALİZİ ===")
brand_counts = df[df['Varyant Aktiflik'] == True]['Marka'].value_counts().head(15)
print("En popüler 15 marka:")
for brand, count in brand_counts.items():
    print(f"  {brand}: {count} ürün")

print("\n=== GÖRSEL URL ANALİZİ ===")
total_products = len(df[df['Varyant Aktiflik'] == True])
products_with_images = len(df[(df['Varyant Aktiflik'] == True) & (df['Resim URL'].notna()) & (df['Resim URL'] != '')])
print(f"Toplam aktif ürün: {total_products}")
print(f"Görseli olan ürün: {products_with_images}")
print(f"Görseli olmayan ürün: {total_products - products_with_images}")

print("\n=== ÖRNEK GÖRSEL URL'LERİ ===")
sample_images = df[(df['Varyant Aktiflik'] == True) & (df['Resim URL'].notna()) & (df['Resim URL'] != '')]['Resim URL'].head(10)
for i, url in enumerate(sample_images, 1):
    print(f"{i}. {url}")
