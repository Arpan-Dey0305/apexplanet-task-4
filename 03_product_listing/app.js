const grid = document.getElementById("grid");
const q = document.getElementById("q");
const categorySelect = document.getElementById("category");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const countSpan = document.getElementById("count");

// Fill category dropdown
function populateCategories() {
  const cats = [...new Set(window.PRODUCTS.map((p) => p.category))];
  cats.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

// Render products
function render(products) {
  grid.innerHTML = "";
  if (products.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    countSpan.textContent = "0 products";
    return;
  }

  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <p>Rating: ⭐ ${p.rating}</p>
    `;
    grid.appendChild(card);
  });
  countSpan.textContent = `${products.length} product${products.length > 1 ? "s" : ""}`;
}

// Apply filters & sorting
function applyFilters() {
  let filtered = [...window.PRODUCTS];

  // Search
  const term = q.value.toLowerCase().trim();
  if (term) {
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(term));
  }

  // Category
  if (categorySelect.value) {
    filtered = filtered.filter((p) => p.category === categorySelect.value);
  }

  // Price range
  const min = parseFloat(minPrice.value) || 0;
  const max = parseFloat(maxPrice.value) || Infinity;
  filtered = filtered.filter((p) => p.price >= min && p.price <= max);

  // Sort
  if (sortSelect.value === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortSelect.value === "rating-desc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  render(filtered);
}

// Reset filters
function resetFilters() {
  q.value = "";
  categorySelect.value = "";
  minPrice.value = "";
  maxPrice.value = "";
  sortSelect.value = "";
  render(window.PRODUCTS);
}

// Event listeners
[q, categorySelect, minPrice, maxPrice, sortSelect].forEach((el) =>
  el.addEventListener("input", applyFilters)
);
resetBtn.addEventListener("click", resetFilters);

// Init
populateCategories();
render(window.PRODUCTS);
