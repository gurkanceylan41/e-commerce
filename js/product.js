export async function fetchProduct() {
  try {
    //Fetch ile db.jsona istek attık
    const response = await fetch("db.json");
    //Hata oluşturduk
    if (!response.ok) {
      throw new Error("Url yanlış");
    }
    //Gelen cevabı json formatına çevirdik product dizisinin içine atadık
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

//*Ürünleri sayfaya render eden fonksiyonu tanımlıyoruz
export function renderProduct(products, addToCartCallback) {
  //* HTML dosyasından ürünlerin listeleniceği elementi seçeriz.
  const productList = document.getElementById("productList");
  //*Ürünlerin HTML formatında listeye eklenmesi için products dizisini dönüp her bir product için ekrana prdouct cartını aktardık.
  productList.innerHTML = products
    .map(
      (product) => `
  <div class="product">
          <img
            src="${product.image}"
            alt=""
            class="product-img"
          />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a href="#" class="add-to-cart" data-id="${product.id}">Add to cart</a>
          </div>
        </div>
        
  
  `
    )
    .join("");

  //*Add to cart butonları seciliyor
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  //*Her bir "Add to cart " butonuna tıklama olayı ekliyor
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartCallback);
  }
}
