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
  const itemEl = ev.currentTarget.closest(".pizza-item, .drink-item");

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

/* ---- 4. ATUALIZA RESUMO E SUBTOTAL ---- */
function renderResumo() {
  const resumoDiv = document.getElementsByClassName("total-item");
  console.log(resumoDiv);
  resumoDiv.innerHTML = ""; // limpa lista

  let subtotal = 0;

  Object.entries(cart).forEach(([name, item]) => {
    const line = document.createElement("p");
    const totalItem = item.qty * item.price;
    line.textContent = `${item.qty} × ${name} − ${totalItem.toFixed(2)} €`;
    resumoDiv.appendChild(line);
    subtotal += totalItem;
  });

  // Se o carrinho estiver vazio, mostra uma mensagem
  if (subtotal === 0) {
    resumoDiv.textContent = "Carrinho vazio";
  } else {
    // Atualiza o subtotal também dentro da div total
    const subtotalEl = document.createElement("p");
    subtotalEl.textContent = "Subtotal: " + subtotal.toFixed(2) + " €";
    resumoDiv.appendChild(subtotalEl);
  }
}
