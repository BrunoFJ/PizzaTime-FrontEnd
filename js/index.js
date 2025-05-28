/* ---- 1. ESTADO DO CARRINHO ---- */
const cart = {}; // { id: { qty, price } }

/* ---- 2. REGISTRA EVENTOS ---- */
// Seleciona todos os + e – de uma só vez
document
  .querySelectorAll(".plus-btn, .minus-btn")
  .forEach((btn) => btn.addEventListener("click", handleClick));

/* ---- 3. MANIPULADOR DE CLIQUE ---- */
function handleClick(ev) {
  const isPlus = ev.currentTarget.classList.contains("plus-btn");
  const itemEl = ev.currentTarget.closest(".pizza-item, .drinks-item");

  // dados vindos do HTML data-*
  const name = itemEl.dataset.name;
  const price = parseFloat(itemEl.dataset.price); // 10.50

  /* --- atualiza carrinho --- */
  cart[name] = cart[name] || { qty: 0, price };
  cart[name].qty += isPlus ? 1 : -1;
  if (cart[name].qty <= 0) delete cart[name]; // zera / remove

  /* --- re-render UI --- */
  renderResumo();
}

function renderResumo() {
  const resumoItensDiv = document.getElementById("resumo-itens");
  resumoItensDiv.innerHTML = ""; // limpa os itens do resumo

  let subtotal = 0;

  // Lista fixa com a ordem dos itens
  const itemOrder = [
    "Pizza Margherita",
    "Pizza Pepperoni",
    "Pizza Quatro Queijos",
    "Coca-Cola",
    "Água",
    "Suco de Laranja",
  ];

  // Itera sobre os itens na ordem especificada
  itemOrder.forEach((name) => {
    if (cart[name]) {
      const item = cart[name];
      const line = document.createElement("p");
      const totalItem = item.qty * item.price;
      line.textContent = `${item.qty} × ${name} − ${totalItem.toFixed(2)} €`;
      resumoItensDiv.appendChild(line);
      subtotal += totalItem;
    }
  });

  // Atualiza o subtotal
  const subtotalEl = document.querySelector("#total .total-item .price");
  if (subtotalEl) {
    subtotalEl.textContent = subtotal.toFixed(2) + " €";
  }
}

/* ---- 4. ATUALIZA RESUMO E SUBTOTAL ---- */
function renderResumo() {
  const resumoItensDiv = document.getElementById("resumo-itens");
  resumoItensDiv.innerHTML = ""; // limpa os itens do resumo

  let subtotal = 0;

  Object.entries(cart).forEach(([name, item]) => {
    const line = document.createElement("p");
    const totalItem = item.qty * item.price;
    line.textContent = `${item.qty} × ${name} − ${totalItem.toFixed(2)} €`;
    resumoItensDiv.appendChild(line);
    subtotal += totalItem;
  });

  // Se o carrinho estiver vazio, mostra uma mensagem
  const subtotalEl = document.querySelector("#total .total-item .price");
  if (subtotalEl) {
    subtotalEl.textContent = subtotal.toFixed(2) + " €";
  }
}
