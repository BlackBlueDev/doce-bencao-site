const CONTACTS = {
  whatsapp: "https://api.whatsapp.com/send/?phone=558187712609&text&type=phone_number&app_absent=0",
  instagram: "https://www.instagram.com/docebencao.oficial/"
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Doce Benção e gostaria de consultar os sabores disponíveis.";

const categoryImages = {
  "Dudu Gourmet": "assets/produtos/produto-dudu-gourmet-real.webp",
  "Dudu Tradicional": "assets/produtos/produto-dudu-tradicional-real.webp",
  Sobremesas: "assets/produtos/produto-sobremesas-reais.webp"
};

// Dados dinâmicos carregados do JSON
let products = [];
let whatsappMessageTemplate = "";

const state = {
  category: "Todos",
  cart: {} // productId: quantity
};

const productGrid = document.querySelector("#productGrid");
const tabs = document.querySelectorAll(".tab");
const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

function currentProducts() {
  if (state.category === "Todos") {
    return products;
  }

  return products.filter((product) => product.category === state.category);
}

function whatsappUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  const base = new URL(CONTACTS.whatsapp);
  base.searchParams.set("text", message);
  return base.toString();
}

async function loadProductsJSON() {
  try {
    const response = await fetch("js/products.json");
    if (!response.ok) throw new Error("Erro ao carregar o arquivo JSON.");
    const data = await response.json();
    products = data.products || [];
    whatsappMessageTemplate = data.whatsapp_message_template || "";

    // Renderizar e atualizar o carrinho após carregar
    renderProducts();
    updateCartBar();
  } catch (err) {
    console.error("Falha ao carregar o cardápio (products.json):", err);
    if (window.location.protocol === "file:") {
      showLocalWarning();
    }
  }
}

function showLocalWarning() {
  const warning = document.createElement("div");
  warning.style.cssText = `
    background: #ffcc00;
    color: #2d170e;
    padding: 12px 18px;
    text-align: center;
    font-weight: 800;
    font-size: 0.9rem;
    position: sticky;
    top: 0;
    z-index: 9999;
    border-bottom: 2px solid #e6b800;
    font-family: sans-serif;
    line-height: 1.4;
  `;
  warning.innerHTML = `
    ⚠️ <strong>Aviso Local:</strong> Para visualizar o cardápio editável (<code>products.json</code>) no seu computador, o site precisa rodar sob um servidor local.
    <br>Caso queira testar agora, execute <code>npx http-server</code> no terminal da pasta do projeto e abra o endereço fornecido.
    <br><em>(Observação: Quando você publicar o site na internet pelo Netlify ou GitHub, ele funcionará 100% de forma automática!)</em>
  `;
  document.body.prepend(warning);
}

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = currentProducts()
    .map((product) => {
      const qty = state.cart[product.id] || 0;
      const imgUrl = product.image || categoryImages[product.category];
      return `
        <article class="product-card ${product.accent}">
          <img src="${imgUrl}" alt="${product.name} - ${product.category}" loading="lazy">
          <div class="product-body">
            <div class="product-topline">
              <span class="product-category">${product.category}</span>
              <strong>${product.price}</strong>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="qty-selector">
              <button class="qty-btn minus" data-id="${product.id}" type="button" aria-label="Diminuir quantidade">-</button>
              <span class="qty-val" id="qty-${product.id}">${qty}</span>
              <button class="qty-btn plus" data-id="${product.id}" type="button" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function updateCartBar() {
  const cartBar = document.getElementById("cartBar");
  if (!cartBar) return;

  let totalCount = 0;
  let totalPrice = 0;

  Object.keys(state.cart).forEach((id) => {
    const qty = state.cart[id];
    if (qty > 0) {
      const product = products.find((p) => p.id === id);
      if (product) {
        const priceNum = parseFloat(product.price.replace("R$ ", "").replace(",", "."));
        totalCount += qty;
        totalPrice += priceNum * qty;
      }
    }
  });

  if (totalCount > 0) {
    cartBar.hidden = false;
    cartBar.classList.add("is-visible");

    const countSpan = document.getElementById("cartCount");
    const totalSpan = document.getElementById("cartTotal");

    if (countSpan) {
      countSpan.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'itens'}`;
    }
    if (totalSpan) {
      totalSpan.textContent = `Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}`;
    }
  } else {
    cartBar.hidden = true;
    cartBar.classList.remove("is-visible");
  }
}

function sendCartToWhatsApp() {
  if (!products.length || !whatsappMessageTemplate) return;

  let itemsText = "";
  let total = 0;
  let hasItems = false;

  const categories = ["Dudu Gourmet", "Dudu Tradicional", "Sobremesas"];

  categories.forEach((cat) => {
    const catItems = products.filter((p) => p.category === cat && state.cart[p.id] > 0);
    if (catItems.length > 0) {
      itemsText += `*${cat}*\n`;
      catItems.forEach((item) => {
        const qty = state.cart[item.id];
        const priceNum = parseFloat(item.price.replace("R$ ", "").replace(",", "."));
        const subtotal = priceNum * qty;
        total += subtotal;
        itemsText += `• ${qty}x ${item.name} (${item.price} cada)\n`;
      });
      itemsText += "\n";
      hasItems = true;
    }
  });

  if (!hasItems) return;

  const totalStr = total.toFixed(2).replace(".", ",");
  const finalMessage = whatsappMessageTemplate
    .replace("{itens}", itemsText)
    .replace("{total}", totalStr);

  const url = whatsappUrl(finalMessage);
  window.open(url, "_blank");
}

function setupCartListeners() {
  if (productGrid) {
    productGrid.addEventListener("click", (event) => {
      const btn = event.target.closest(".qty-btn");
      if (!btn) return;

      const id = btn.dataset.id;
      const isPlus = btn.classList.contains("plus");

      if (!state.cart[id]) {
        state.cart[id] = 0;
      }

      if (isPlus) {
        state.cart[id]++;
      } else {
        if (state.cart[id] > 0) {
          state.cart[id]--;
        }
      }

      const qtySpan = document.getElementById(`qty-${id}`);
      if (qtySpan) {
        qtySpan.textContent = state.cart[id];
      }

      updateCartBar();
    });
  }

  const cartSubmitBtn = document.getElementById("cartSubmitBtn");
  if (cartSubmitBtn) {
    cartSubmitBtn.addEventListener("click", sendCartToWhatsApp);
  }
}

function configureContactLinks() {
  document.querySelectorAll("[data-contact-link]").forEach((link) => {
    const type = link.dataset.contactLink;
    const message = link.dataset.whatsappMessage || DEFAULT_WHATSAPP_MESSAGE;
    const url = type === "whatsapp" ? whatsappUrl(message) : CONTACTS[type];

    if (!url) return;

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function closeMobileMenu() {
  if (!mobileMenu || !mobileMenuToggle) return;

  mobileMenu.hidden = true;
  mobileMenuToggle.setAttribute("aria-expanded", "false");
  mobileMenuToggle.setAttribute("aria-label", "Abrir menu");
}

if (tabs.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.category = tab.dataset.category;
      tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      renderProducts();
    });
  });
}

if (mobileMenu && mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = mobileMenuToggle.getAttribute("aria-expanded") === "true";
    mobileMenu.hidden = isOpen;
    mobileMenuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu.hidden && !event.target.closest(".header-inner")) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

// Inicialização
configureContactLinks();
setupCartListeners();
loadProductsJSON();
