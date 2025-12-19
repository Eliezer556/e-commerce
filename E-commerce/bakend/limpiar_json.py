import json

# Leer el archivo detectando la codificación problemática
try:
    with open('data.json', 'rb') as f:
        content = f.read()
    
    # Intentamos decodificar ignorando los caracteres basura (invalid bytes)
    decoded_content = content.decode('utf-8', errors='ignore')
    
    # Lo cargamos como objeto JSON para asegurar que la estructura es válida
    data = json.loads(decoded_content)
    
    # Lo volvemos a guardar en un archivo limpio
    with open('data_limpia.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("Archivo 'data_limpia.json' creado con éxito. Intenta el loaddata con este nuevo archivo.")

except Exception as e:
    print(f" Error al procesar: {e}")