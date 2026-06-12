#!/bin/bash
# Pobierz zdjecia z Unsplash dla kazdego dnia
# Aby zmienic zdjecie: zamien ID i uruchom ponownie
# ID pochodzi z URL unsplash.com/photos/{ID}

DIR="public/images"
mkdir -p "$DIR"

download() {
  local name="$1" id="$2"
  local file="$DIR/$name.jpg"
  if [ -f "$file" ]; then
    echo "Pomijam $name (juz istnieje)"
  else
    echo "Pobieram $name (ID: $id)..."
    curl -sL -o "$file" "https://images.unsplash.com/photo-${id}?w=800&q=80&fit=crop&h=400"
  fi
}

download day0  "PI0mFU7wlok"    # Czeski Krumlov / droga
download day1  "GGJoejbTQmg"    # Czeski Krumlov aerial
download day2  "kVrIqcRiKUU"    # Hallstatt church beside water
download day3  "rZK9yr6ChFo"    # Grossglockner aerial mountain
download day4  "T7K4aEPoGGk"    # Lago di Braies wooden boats
download day5  "1HsON8ublZA"    # Tre Cime sunset
download day6  "OQXjNQKR5iQ"    # Lake Sorapis turquoise
download day7  "ELZleqyQcQE"    # Lake Garda village
download day8  "cYrMQA7a3Wc"    # Vernazza aerial sunset
download day9  "HIiD0HZu8R8"    # Monterosso beach umbrellas
download day10 "eDTV2yPpbYU"    # San Gimignano brown houses tuscany
download day11 "qf2Lg1ZtxDc"    # Siena aerial drone
download day12 "yVgQJZ0_530"    # Tuscany landscape
download day13 "h66Vlx8MHmo"    # Mountain road
download day14 "jplF4B0ymaE"    # Gdansk/lake

echo ""
echo "Gotowe! Sprawdz zdjecia w $DIR/"
echo "Jesli ktores nie pasuje - zamien ID powyzej i uruchom ponownie."