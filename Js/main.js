var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("search");
var addProductBtn = document.getElementById("addProduct");
var updateBtn = document.getElementById("updateBtn");
var rowData = document.getElementById("rowData");
var myIndex = 0;
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProducts(productList);
} else {
  productList = [];
}
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: `Photos/${productImageInput.files[0]?.name}`,
  };
  productList.push(product);
  console.log(productList);
  localStorage.setItem("products", JSON.stringify(productList));
  clearInputs();
  displayProducts(productList);
}
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
  productImageInput.value = "";
}
function displayProducts(arr) {
  var cartoona = "";
  for (var i = 0; i < arr.length; i++) {
    cartoona += `<div class="col">
          <div class="card h-100">
            <img
              src="${arr[i].image}"
              class="card-img-top"
              alt="Product Image"
            />
            <div class="card-body">
              <h5 class="card-title">${arr[i].name}</h5>
              <p class="card-text"><strong>Category:</strong>${arr[i].category}</p>
              <p class="card-text"><strong>Description:</strong> ${arr[i].description}
              </p>
              <p class="card-text"><strong>Price:</strong>${arr[i].price}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button class="btn btn-warning" onclick="setDataToInputs(${i})">Update</button>
              <button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>`;
  }
  rowData.innerHTML = cartoona;
}
function deleteItem(index) {
  productList.splice(index, 1);
  console.log(productList);
  localStorage.setItem("products", JSON.stringify(productList));
  displayProducts(productList);
}
function searchProducts() {
  var searchProducts =[];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchProducts.push(productList[i]);
    }
  }
  displayProducts(searchProducts);
}
function setDataToInputs(index) {
  myIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;
  console.log(index);
  updateBtn.classList.remove("d-none");
  addProductBtn.classList.add("d-none");
}
function updateProduct() {
  productList[myIndex].name = productNameInput.value;
  productList[myIndex].price = productPriceInput.value;
  productList[myIndex].category = productCategoryInput.value;
  productList[myIndex].description = productDescriptionInput.value;
  localStorage.setItem("products", JSON.stringify(productList));
  displayProducts(productList);
  clearInputs();
  updateBtn.classList.add("d-none");
  addProductBtn.classList.remove("d-none");
}
