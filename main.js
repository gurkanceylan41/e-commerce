import { addToCart, displayCartTotal, renderCartItems } from "./js/cart.js";
import { fetchProduct, renderProduct } from "./js/product.js";

document.addEventListener("DOMContentLoaded", async () => {
  //hangi sayfada oldugumuzu buluyoruz
  if (window.location.pathname.includes("cart.html")) {
    renderCartItems();
    displayCartTotal();
  } else {
    //*Eğer sayfa cart.html sayfasında değilse ürünleri al
    const products = await fetchProduct();

    //*Aldıktan sonra ürünleri render et ve addToCallback fonksiyonunu tanımla
    renderProduct(products, (event) => addToCart(event, products));
  }
});

//Json'dan gelen verileri atmak için boş dizi oluşturduk

let menu = document.querySelector(".navbar");
let menuIcon = document.querySelector("#menu-icon");

//*Menu İconuna tıklanıldıgında Open-menu classını ekle çıkar
menuIcon.addEventListener("click", () => menu.classList.toggle("open-menu"));
