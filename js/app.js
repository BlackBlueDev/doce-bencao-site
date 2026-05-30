const CONTACTS = {
  whatsapp: "https://api.whatsapp.com/send/?phone=558187712609&text&type=phone_number&app_absent=0",
  instagram: "https://www.instagram.com/docebencao.oficial/"
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Doce Benção e gostaria de consultar os sabores disponíveis.";

const categoryImages = {
  "Dudu Gourmet": "assets/produtos/produto-dudu-gourmet-real.png",
  "Dudu Tradicional": "assets/produtos/produto-dudu-tradicional-real.png",
  Sobremesas: "assets/produtos/produto-sobremesas-reais.png"
};

const products = [
  {
    id: "oreo",
    name: "Oreo",
    category: "Dudu Gourmet",
    description: "Dudu gourmet cremoso com sabor Oreo.",
    price: "R$ 4,00",
    accent: "blue"
  },
  {
    id: "morango-nutella",
    name: "Morango com Nutella",
    category: "Dudu Gourmet",
    description: "Morango com creme e Nutella em uma combinação especial.",
    price: "R$ 4,00",
    accent: "blue"
  },
  {
    id: "ninho-nutella",
    name: "Ninho com Nutella",
    category: "Dudu Gourmet",
    description: "Leite Ninho com Nutella para quem gosta de sabor marcante.",
    price: "R$ 4,00",
    accent: "blue"
  },
  {
    id: "prestigio",
    name: "Prestígio",
    category: "Dudu Gourmet",
    description: "Chocolate com coco em uma versão cremosa e cheia de sabor.",
    price: "R$ 4,00",
    accent: "blue"
  },
  {
    id: "maracuja-nutella",
    name: "Maracujá com Nutella",
    category: "Dudu Gourmet",
    description: "Maracujá com Nutella, doce na medida e bem cremoso.",
    price: "R$ 4,00",
    accent: "blue"
  },
  {
    id: "coco",
    name: "Coco",
    category: "Dudu Tradicional",
    description: "Sabor tradicional leve, cremoso e muito querido.",
    price: "R$ 2,50",
    accent: "pink"
  },
  {
    id: "maracuja",
    name: "Maracujá",
    category: "Dudu Tradicional",
    description: "Dudu tradicional com o toque fresco do maracujá.",
    price: "R$ 2,50",
    accent: "pink"
  },
  {
    id: "amendoim",
    name: "Amendoim",
    category: "Dudu Tradicional",
    description: "Cremoso, encorpado e com sabor de amendoim bem presente.",
    price: "R$ 2,50",
    accent: "pink"
  },
  {
    id: "uva",
    name: "Uva",
    category: "Dudu Tradicional",
    description: "Opção frutada, delicada e refrescante.",
    price: "R$ 2,50",
    accent: "pink"
  },
  {
    id: "chocolate-banana",
    name: "Chocolate com Banana",
    category: "Dudu Tradicional",
    description: "Chocolate e banana em uma dupla familiar e irresistível.",
    price: "R$ 2,50",
    accent: "pink"
  },
  {
    id: "mousse-limao",
    name: "Mousse de limão",
    category: "Sobremesas",
    description: "Mousse leve e cremoso com toque cítrico de limão.",
    price: "R$ 4,00",
    accent: "brown"
  },
  {
    id: "mousse-maracuja",
    name: "Mousse de maracujá",
    category: "Sobremesas",
    description: "Mousse cremoso com o sabor marcante do maracujá.",
    price: "R$ 4,00",
    accent: "brown"
  },
  {
    id: "pave-chocolate-baunilha",
    name: "Pavê de chocolate com baunilha",
    category: "Sobremesas",
    description: "Camadas cremosas de chocolate e baunilha em potinho.",
    price: "R$ 4,00",
    accent: "brown"
  },
  {
    id: "pudim-coco",
    name: "Pudim de coco",
    category: "Sobremesas",
    description: "Pudim cremoso com o sabor delicado do coco.",
    price: "R$ 4,00",
    accent: "brown"
  },
  {
    id: "pudim-leite",
    name: "Pudim de leite",
    category: "Sobremesas",
    description: "Pudim de leite clássico, cremoso e irresistível.",
    price: "R$ 4,00",
    accent: "brown"
  }
];

const state = {
  category: "Todos"
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

function renderProducts() {
  if (!productGrid) return;

  productGrid.innerHTML = currentProducts()
    .map((product) => {
      const message = `Olá! Vim pelo site da Doce Benção e gostaria de consultar a disponibilidade de ${product.name} (${product.category}).`;
      return `
        <article class="product-card ${product.accent}">
          <img src="${categoryImages[product.category]}" alt="${product.name} - ${product.category}">
          <div class="product-body">
            <div class="product-topline">
              <span class="product-category">${product.category}</span>
              <strong>${product.price}</strong>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a class="consult-link" href="${whatsappUrl(message)}" target="_blank" rel="noopener">
              Consultar no WhatsApp
            </a>
          </div>
        </article>
      `;
    })
    .join("");
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

renderProducts();
configureContactLinks();
