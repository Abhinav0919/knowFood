const BASE_URL = "https://world.openfoodfacts.org";

let barcodeInput = document.querySelector("#barcode");
let getDetail = document.querySelector("#btn");
let statusE1 = document.querySelector("#status");
let result = document.querySelector(".result");

async function fetchdata(barcode) {
    const url = `${BASE_URL}/api/v3.6/product/${barcode}.json`;
    const response = await axios.get(url);
    return response.data;
}
function buildFacts(product){
  const facts = [];
  const name = product.product_name || "This product";
  const n = product.nutriments || {};

 if (product.brands)
  facts.push({ label: "Brand", value: product.brands });
if (product.quantity)
  facts.push({ label: "Quantity", value: product.quantity });
if (n["energy-kcal_100g"] != null)
  facts.push({ label: "Calories", value: n["energy-kcal_100g"] + " kcal / 100 g" });
if (n.sugars_100g != null)
  facts.push({ label: "Sugar", value: n.sugars_100g + " g / 100 g" });
if (n.fat_100g != null)
  facts.push({ label: "Fat", value: n.fat_100g + " g / 100 g" });
if (n.proteins_100g != null)
  facts.push({ label: "Protein", value: n.proteins_100g + " g / 100 g" });
if (n.salt_100g != null)
  facts.push({ label: "Salt", value: n.salt_100g + " g / 100 g" });
if (product.categories)
  facts.push({ label: "Categories", value: product.categories });
if (product.ingredients_text)
  facts.push({ label: "Ingredients", value: product.ingredients_text });
  return facts;

}

function showResult(product, facts){
     result.innerHTML = "";
    
    if(product.image_front_small_url || product.image_url) {
    const img = document.createElement("img");
    img.src = product.image_front_small_url || product.image_url;
    img.alt = product.product_name || "Product image";
    result.appendChild(img);
  }
  const h2 = document.createElement("h2");
  h2.textContent = product.product_name || "Unnamed product";
  result.appendChild(h2);

  const brand = document.createElement("p");
  brand.className = "brand";
  brand.textContent = product.brands || "Unknown brand";
  result.appendChild(brand);

  if (product.nutriscore_grade) {
    const badges = document.createElement("div");
    badges.className = "badges";
    const grade = product.nutriscore_grade.toLowerCase();
    const b = document.createElement("span");
    b.className = `badge ${grade}`;
    b.textContent = `Nutri-Score ${grade.toUpperCase()}`;
    badges.appendChild(b);
    result.appendChild(badges);
  }
   const grid = document.createElement("div");
grid.className = "details-grid";

facts.forEach(function(item){
  const card = document.createElement("div");
  card.className = "detail-card";
  if (item.label === "Ingredients") card.classList.add("wide");

  const label = document.createElement("span");
  label.className = "detail-label";
  label.textContent = item.label;

  const value = document.createElement("strong");
  value.textContent = item.value;

  card.appendChild(label);
  card.appendChild(value);
  grid.appendChild(card);
});

  result.appendChild(grid); 
  result.classList.remove("hidden")
};

async function details() {
  const barcode = barcodeInput.value.trim();
if (barcode.length < 8 || barcode.length > 14 || isNaN(barcode)) {
  statusE1.textContent = "Please enter a valid barcode.";
  result.classList.add("hidden");
  statusE1.className = "status error";
  statusE1.textContent = "Please enter a valid barcode.";
  return;
  
}

  getDetail.disabled = true;
  statusE1.className = "status";
  statusE1.textContent = "Loading...";
  result.classList.add("hidden");

try{
const data = await fetchdata(barcode);
    if (data.status !== "success" || !data.product) {
      statusE1.textContent = "Product not found for this barcode.";
      statusE1.className = "status error";
      return;
    }
    const facts = buildFacts(data.product);
    if (facts.length === 0) {
      statusE1.textContent = "This product has no facts available.";
      statusE1.className = "status error";
      return;
    }
    statusE1.textContent = "";
    showResult(data.product, facts);
}  catch (error) {
    statusE1.className = "status error";
    if (error.response) {
      statusE1.textContent = `Server error (${error.response.status}).`;
    } else if (error.request) {
      statusE1.textContent = "No response. Check your internet connection.";
    } else {
      statusE1.textContent = `Error: ${error.message}`;
    }
  } finally {
    getDetail.disabled = false;
  }
};
getDetail.addEventListener("click",details);
barcodeInput.addEventListener("keydown", function(event){
  if (event.key === "Enter") {
    details();
  }
});