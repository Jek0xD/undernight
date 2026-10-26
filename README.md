# UNDERNIGHT — edytowalny sklep

Responsywny frontend sklepu napisany w czystym HTML, CSS i JavaScript.
Bez płatnych bibliotek i bez wymaganego procesu budowania. Kod na licencji MIT.
Grafiki, logo i znaki towarowe nie są objęte licencją MIT.

## Uruchomienie
Otwórz `dist/index.html` w przeglądarce lub uruchom serwer:

    python -m http.server 8080 --directory dist

Następnie otwórz http://localhost:8080. Hosting statyczny: opublikuj zawartość `dist`.
Archiwum do pobrania ze strony zawiera te same pliki bez podfolderu dist — możesz
bezpośrednio otworzyć index.html lub uruchomić `python -m http.server 8080`.

## Edycja
- `dist/products.js`: katalog, ceny PLN, kroje, kolory, rozmiary i nazwy grafik.
- `dist/style.css`: układ, breakpointy i kolory w sekcji `:root`.
- `dist/index.html`: logo, teksty, nawigacja i FAQ.
- `dist/app.js`: filtry, sortowanie, okno produktu, koszyk w localStorage.
- `dist/assets/`: zoptymalizowane kopie wszystkich 9 przesłanych grafik.

## Status funkcjonalny
Działa katalog 5 produktów z wariantami kolorystycznymi, filtrowanie, sortowanie, wybór koloru i rozmiaru,
dodawanie i usuwanie produktów, zmiana ilości, suma cen i zapis koszyka.
Ceny, nazwy modeli i dostępność rozmiarów są przykładowe.
Nie ma backendu, obsługi stanów magazynowych, zamówień, kont klientów ani płatności.
Nie są zbierane dane klientów. Koszyk jest lokalny dla przeglądarki.

## Przed rozpoczęciem sprzedaży
Uzupełnij rzeczywiste ceny, skład, opisy, wymiary, rozmiary i stan magazynowy.
Dodaj dane sprzedawcy, kontakt, regulamin, politykę prywatności i zasady dostaw/zwrotów.
Podłącz backend zamówień oraz operatora płatności z serwerową walidacją cen,
weryfikacją webhooków i kontrolą magazynu. Nie umieszczaj sekretów w JavaScript.
Po integracji zastąp pokazowy komunikat w koszyku rzeczywistą ścieżką zakupową.

## Aktualizacja paczki kodu
Po edycjach odtwórz `dist/undernight-source.zip` z plików strony, assets, README i LICENSE,
bez pliku ZIP wewnątrz niego, bez .git i bez danych uwierzytelniających.

Galerie produktów: pola design i photo w products.js. Wariant image odpowiada za zdjęcie ubrania. Banner: assets/campaign-banner.webp, wygenerowany z referencji ubrań. Nowy produkt Porsche ma przykładową cenę 149 zł.
