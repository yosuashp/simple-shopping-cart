const tombolProduk = document.querySelectorAll('.add-to-cart');
const belanja = document.getElementById('cart');
const subtotalBelanja = document.getElementById('cart-subtotal');
const totalBelanja = document.getElementById('cart-total');
const diskonVoucher = document.getElementById('promo-code');
const diskonTampil = document.getElementById('discount');
const itemBelanja = [];
let promoCode = "";

// promo
const promo = [
  {
    label: 'DISC10',
    value: 0.1,
  },
  {
    label: 'DISC50',
    value: 0.5,
  },
  {
    label: 'DISC75',
    value: 0.75,
  },
  {
    label: 'HARBOLNAS1010',
    value: 0.90,
  },
];

tombolProduk .forEach((button) => {
  button.addEventListener('click', addToCart);
});

diskonVoucher.addEventListener('input', applyPromoCode);

function addToCart(event) {
  const button = event.target;
  const productName = button.getAttribute('data-name');
  const productPrice = parseFloat(button.getAttribute('data-price'));
  itemBelanja.push({ name: productName, price: productPrice });
  displayCart();
}

function displayCart() {
  belanja.innerHTML = '';
  let subtotal = 0;
  
  itemBelanja.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${item.name} - Rp. ${item.price}`;
    belanja.appendChild(itemDiv);
    subtotal += item.price;
  });

  subtotalBelanja.textContent = `Sub Total: Rp. ${subtotal.toFixed(0)}`;

  // Calculate total with discount
  let total = subtotal;
  if (promoCode) {
    const promoData = promo.find((code) => code.label === promoCode);
    if (promoData) {
      total *= (1 - promoData.value);
      diskonTampil.textContent = `Selamat Anda Mendapatkan Discount: ${promoData.value * 100}%`;
    } else {
      diskonTampil.textContent = "Kode Promo Invalid";
    }
  } else {
    diskonTampil.textContent = "-";
  }

  totalBelanja.textContent = `Total: Rp. ${total.toFixed(0)}`;
}

function applyPromoCode() {
  promoCode = diskonVoucher.value;
  displayCart();
}
