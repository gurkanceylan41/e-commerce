export function saveToLocalStorage(cart) {
  //*localStorage a veri ekleme.
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartFromLocalStorage() {
  //* localStorage da cart adında bir key varsa onları jsonformatında getir.
  //* Yoksa da boş bir dizi döndür.
  return JSON.parse(localStorage.getItem("cart")) || [];
}

//*Sepetteki ürün miktarını hesaplar
export function updateCartIcon(cart) {
  const cartIcon = document.getElementById("cart-icon");
  const i = document.querySelector(".bx-shopping-bag");

  //* iki parametre alır sum o ana kadar birikmiş toplam değeri temsil eder başlangıçta 0 olarak belirtilir.
  //*item dizideki mecvcut öğeyi temsil eder
  //*Bu şekilde, reduce metodu kullanılarak alışveriş sepetindeki toplam ürün miktarı hesaplanır ve sonuç elde edilir.
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  console.log(i);
  i.setAttribute("data-quantity", totalQuantity);
  cartIcon.setAttribute("data-quantity", totalQuantity);
}

export function calculateCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
