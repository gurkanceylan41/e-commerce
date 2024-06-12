import {
  calculateCartTotal,
  getCartFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

let cart = getCartFromLocalStorage();

//*Sepete ürün ekeleyecek fonsiyondur
export function addToCart(event, products) {
  event.preventDefault();
  //*Tıkladıgımız ürünün idsine eriştik ve idsini numbera çevirdik
  const productID = Number(event.target.dataset.id);

  //*Product dizisi içerisinden idsine ulaştıgımız ürünü bulabilmek için find metodunu kullandık.
  const product = products.find((product) => product.id === productID);
  //*Ürünü bulursak bu if çalışıcak.

  if (product) {
    //*Sepette önceden ekledigimiz ürünü bulduk.
    const exitingItem = cart.find((item) => item.id === productID);
    if (exitingItem) {
      //*Miktarını bir arttır
      exitingItem.quantity++;
    } else {
      //*Sepette bu üründen daha önce yoksa sepete yeni bir ürün ekleyeceğiz

      //*Sepet dizisine ekleyeceğimiz ürünün miktar özellgini ekledik
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem); //*Cart dizisine yeni oluşturdugumuz objeyi gönderdik
      event.target.textContent = "Added"; //Ekleme butonunun içeriğini değiştirdik
      updateCartIcon(cart);
      saveToLocalStorage(cart);
      renderCartItems();
      displayCartTotal();
    }
  }
}

//*Sepetten ürün siler
function removeFromCart(e) {
  //*Silecegimiz elemeanin id'sine ulaştık
  const productID = Number(e.target.dataset.id);
  //item id ve productID birbirine eşit oldugu için burda false dönücek filter true dönen her elemanı yeni diziye aktarır false dönen elemanıda siler
  cart = cart.filter((item) => item.id !== productID);
  //localStorage güncelle
  saveToLocalStorage(cart);
  //Sayfayı güncelle
  renderCartItems();
  displayCartTotal();
  updateCartIcon(cart);
}

function changeQuantity(event) {
  //*inputun içerisindeki değeri aldık
  const quantity = Number(event.target.value);
  //*Degisim olan ürünün idsine eriştik
  const productID = Number(event.target.dataset.id);

  if (quantity > 0) {
    console.log("calıstı");
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveToLocalStorage(cart);
      displayCartTotal();
      updateCartIcon(cart);
    }
  }
}

//*Sepetteki ürünleri ekrana renderlar
export function renderCartItems() {
  //* idsine göre HTML etiketini aldık
  const cartItemsElement = document.getElementById("cart-items");
  //*Sepetteki herbir ürün için ekrana bir tane cart-item bileşeni aktardık.
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `
          <div class="cart-item">
                <img
                  src="${item.image}"
                  alt=""
                />
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input
                  type="number"
                  min="1"
                  value="${item.quantity}"
                  class="cart-item-quantity"
                  data-id="${item.id}"
                />
              </div>
              <h2>$${item.price}</h2>
              <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
  
  
  `
    )
    .join("");

  //*Tüm silme butonlarını aldık
  const removeButtons = document.getElementsByClassName("remove-from-cart");
  //*index numarasına göre bütün silme butonlarını seçtik
  for (let index = 0; index < removeButtons.length; index++) {
    const removeButton = removeButtons[index];
    //*Herbir buton için bir olay izleyicisi ekle ve bir fonksiyon çalıştır
    removeButton.addEventListener("click", removeFromCart);
  }

  const quantityInputs = document.getElementsByClassName("cart-item-quantity");
  console.log(quantityInputs);
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    console.log(quantityInput);
    quantityInput.addEventListener("change", changeQuantity);
  }

  updateCartIcon(cart);
}

export function displayCartTotal() {
  const cartTotalElement = document.getElementById("cartTotal");
  const total = calculateCartTotal(cart);
  cartTotalElement.textContent = `total: $${total.toFixed(2)}`;
}
