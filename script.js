// ── CART ──
let cart = [];

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartBackdrop').classList.add('open');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');
}

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
  openCart();
}

function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}

function renderCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  // Update nav button
  document.querySelector('.cart-btn').textContent = `Carrito (${totalItems})`;

  const emptyEl   = document.getElementById('cartEmpty');
  const itemsEl   = document.getElementById('cartItems');
  const footerEl  = document.getElementById('cartFooter');
  const totalEl   = document.getElementById('cartTotal');

  if (cart.length === 0) {
    emptyEl.style.display  = 'flex';
    itemsEl.innerHTML      = '';
    footerEl.style.display = 'none';
  } else {
    emptyEl.style.display  = 'none';
    footerEl.style.display = 'block';
    totalEl.textContent    = '$' + total.toLocaleString('es-CO');

    itemsEl.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${i.name}</div>
          <div class="cart-item-price">x${i.qty} — $${(i.price * i.qty).toLocaleString('es-CO')}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${i.name}')">✕</button>
      </div>
    `).join('');
  }
}

// ── SEARCH ──
function openSearch() {
  document.getElementById('searchModal').classList.add('open');
  setTimeout(() => document.getElementById('searchInput').focus(), 300);
}

function closeSearch() {
  document.getElementById('searchModal').classList.remove('open');
}

// Close with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
    closeCart();
  }
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── TICKER duplicate for seamless loop ──
const ticker = document.getElementById('ticker');
if (ticker) ticker.innerHTML += ticker.innerHTML;
