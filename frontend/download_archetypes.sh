#!/bin/bash
# Mapeo: número en 13lunas.net -> nombre de archivo local
declare -A MAP=(
  ["1"]="dragon"
  ["2"]="wind"
  ["3"]="night"
  ["4"]="seed"
  ["5"]="serpent"
  ["6"]="worldbridger"
  ["7"]="hand"
  ["8"]="star"
  ["9"]="moon"
  ["10"]="dog"
  ["11"]="monkey"
  ["12"]="human"
  ["13"]="skywalker"
  ["14"]="wizard"
  ["15"]="eagle"
  ["16"]="warrior"
  ["17"]="earth"
  ["18"]="mirror"
  ["19"]="storm"
  ["20"]="sun"
  ["21"]="hunabKu"
)

DEST="/Users/manu/Desktop/TU ENERGIA MAYA/TuEnergiaMaya/frontend/public/assets/archetypes"

# El nº 1 está en la carpeta avataresweb, el resto en meditaciones/arquetipos
echo "Descargando imagen 1 (dragon) desde avataresweb..."
curl -sL "https://www.13lunas.net/avataresweb/1.html" -o "$DEST/dragon_tmp.html"
# La URL real de la imagen del nº1 debe buscarse, vamos a probar directamente con la imagen
curl -sL "https://www.13lunas.net/meditaciones/arquetipos/1.jpg" -o "$DEST/dragon.jpg"

# Verificar si descargó algo
size=$(wc -c < "$DEST/dragon.jpg")
if [ "$size" -lt 1000 ]; then
  echo "Fallback: probando URL alternativa para 1..."
  curl -sL "https://www.13lunas.net/avataresweb/1.jpg" -o "$DEST/dragon.jpg"
fi

# Descargar del 2 al 21
for num in $(seq 2 21); do
  name="${MAP[$num]}"
  if [ -n "$name" ]; then
    echo "Descargando imagen $num -> $name..."
    curl -sL "https://www.13lunas.net/meditaciones/arquetipos/${num}.jpg" -o "$DEST/${name}.jpg"
    size=$(wc -c < "$DEST/${name}.jpg")
    echo "  Tamaño: $size bytes"
  fi
done

echo "¡Descarga completada!"
ls -la "$DEST/"
