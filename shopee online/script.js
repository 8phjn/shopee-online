let users = [];
let cart = [];
let productsList = [
  {id:1, name:"สินค้า A", price:100, img:"https://via.placeholder.com/100"},
  {id:2, name:"สินค้า B", price:200, img:"https://via.placeholder.com/100"},
  {id:3, name:"สินค้า C", price:150, img:"https://via.placeholder.com/100"}
];

// แสดงสินค้า
function showProducts() {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "";
  productsList.forEach(p => {
    productsDiv.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <p>${p.name}</p>
        <p>${p.price} บาท</p>
        <button onclick="addToCart(${p.id})">ใส่ตะกร้า</button>
      </div>
    `;
  });
}

// ตะกร้า
function addToCart(id) {
  let product = productsList.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const cartDiv = document.getElementById("cart");
  const totalSpan = document.getElementById("total");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    cartDiv.innerHTML += `<p>${item.name} - ${item.price} บาท <button onclick="removeCart(${index})">ลบ</button></p>`;
    total += item.price;
  });
  totalSpan.innerText = total;
}

function removeCart(index) {
  cart.splice(index,1);
  updateCart();
}

// ระบบ login/register
function showRegister() {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("register-page").style.display = "block";
}

function showLogin() {
  document.getElementById("register-page").style.display = "none";
  document.getElementById("login-page").style.display = "block";
}

function register() {
  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;
  if(username && password){
    users.push({username,password});
    alert("ลงทะเบียนสำเร็จ");
    showLogin();
  } else {
    alert("กรอกข้อมูลให้ครบ");
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  let user = users.find(u => u.username === username && u.password === password);
  if(user){
    document.getElementById("login-page").style.display = "none";
    document.getElementById("shop-page").style.display = "block";
    showProducts();
  } else {
    alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }
}

function logout() {
  cart = [];
  document.getElementById("shop-page").style.display = "none";
  document.getElementById("login-page").style.display = "block";
}

function checkout() {
  if(cart.length === 0){
    alert("ตะกร้าว่าง");
    return;
  }
  alert("ชำระเงินสำเร็จ จำนวนทั้งหมด: "+document.getElementById("total").innerText+" บาท");
  cart = [];
  updateCart();
}
