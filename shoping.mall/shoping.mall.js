const socket = io("http://localhost:3000");

// Product list
let products = ["Rice", "Milk", "Bread", "Egg"];

// Render products
function render() {
  let div = document.getElementById("products");
  let loc = document.getElementById("location").value;

  div.innerHTML = "";

  products.forEach(p => {
    div.innerHTML += `
      <p>${p}
      <button onclick="order('${p}')">Order</button>
      </p>
    `;
  });
}

function login() {

  fetch("http://localhost:3000/auth/login", {
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

// Get GPS location
function getLocation() {

  navigator.geolocation.getCurrentPosition(pos => {

    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;

    console.log("Location:", lat, lng);

    // Send to backend
    fetch("http://localhost:3000/shops/nearest", {
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

// Auto run
getLocation();
function order(product) {

  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      product: product,
      location: document.getElementById("location").value
    })
  });

}

// Auto render
render();ok
