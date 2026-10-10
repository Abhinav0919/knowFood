<img width="1920" height="1080" alt="Screenshot (150)" src="https://github.com/user-attachments/assets/8232b02d-e078-4c07-a91f-8a050b951863" />
<img width="1920" height="1080" alt="Screenshot (149)" src="https://github.com/user-attachments/assets/c7aef9df-b886-4469-a3ec-42e90773b92b" />
# KnowFood

Know your food better. Type the barcode of any packed food and see its Nutri-Score, calories, sugar, fat, protein and ingredients in one place.

## Features

- Search a product by its barcode
- Press **Enter** or click **Get Details**
- Nutri-Score badge with color (A = best, E = worst)
- Nutrition details shown as easy info cards
- Input check with a clear error message for a wrong barcode
- Loading, "not found" and "no internet" messages
- Sidebar with Home, GitHub and LinkedIn links
- Responsive design: the sidebar moves to the top on small screens

## Built with

- HTML
- CSS
- JavaScript
- [Axios](https://axios-http.com/) for API requests
- [Open Food Facts API](https://openfoodfacts.github.io/openfoodfacts-server/api/) for product data

## How to run

1. Download or clone this repository:
   ```
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   ```
2. Open the folder in VS Code.
3. Open `index.html` with the Live Server extension (or just open it in your browser).
4. Type a barcode and click **Get Details**.

You need an internet connection, because the data comes from the API.

## Try these barcodes

- `3017620422003`
- `8901262151306`

## How it works

1. You type a barcode and click the button (or press Enter).
2. The app checks that the barcode is valid (8 to 14 digits).
3. It sends a request to the Open Food Facts API with Axios.
4. The details are put in a list (`buildFacts`).
5. The page shows the product image, name, brand, Nutri-Score and the info cards (`showResult`).

## Things I learned

- Fetching data from an API with `async` / `await`
- Handling errors with `try` / `catch`
- Building page elements with JavaScript (`createElement`, `appendChild`)
- Using `forEach` to show a list of items
- Making a responsive layout with `@media`

## Note

Open Food Facts is filled in by volunteers, so some products have missing information. If a detail is missing, its card is not shown.

## Credits

Product data is from [Open Food Facts](https://world.openfoodfacts.org) and is available under the Open Database License (ODbL).

## Author

ABHINAV PANDEY

- GitHub: https://github.com/Abhinav0919
- LinkedIn: https://www.linkedin.com/in/abhinav-pandey19
