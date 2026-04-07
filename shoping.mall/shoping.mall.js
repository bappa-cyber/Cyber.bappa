const BASE_URL = "https://cyber-bappa.onrender.com";

const socket = io(BASE_URL);

// Product list
let products = ["Rice", "Milk", "Bread", "Egg"];

// Render products
function render() {
  let div = document.getElementById("products");
  div.innerHTML = "";

  products.forEach(p => {
    div.innerHTML += `
      <p>${p}
      <button onclick="order('${p}')">Order</button>
      </p>
    `;
  });
}

// Login
function login() {
  fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    if (data.role === "user") {
      alert("User Login Success");
    }
  });
}

// GPS
function getLocation() {
  navigator.geolocation.getCurrentPosition(pos => {

    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;

    console.log("Location:", lat, lng);

    fetch(BASE_URL + "/shops/nearest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lat, lng })
    })
    .then(res => res.json())
    .then(shop => {
      console.log("Nearest Shop:", shop);
      showProducts(shop.products);
    });

  });
}

// Show products
function showProducts(products) {
  let div = document.getElementById("products");
  div.innerHTML = "";

  products.forEach(p => {
    div.innerHTML += `
      <p>${p}
      <button onclick="order('${p}')">Order</button>
      </p>
    `;
  });
}

// Order
function order(product) {
  fetch(BASE_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      product: product,
      location: "GPS"
    })
  });
}

// Run
getLocation();
render();
