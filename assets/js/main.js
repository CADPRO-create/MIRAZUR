const orderEmail = "contact@mirazur.com"; // Remplacer par l'email de commande réel avant la mise en ligne.
const cartKey = "mirazur_static_cart";
const clubKey = "mirazur_club_preinscriptions";
const maxQuantity = 10;

const colorMeta = {
  black: { label: "noir profond", swatch: "#12100c" },
  cream: { label: "crème", swatch: "#fffaf0" },
  gold: { label: "gold", swatch: "#d8aa45" },
  midnight: { label: "bleu nuit", swatch: "#10284d" },
  sand: { label: "sable", swatch: "#d9c4a2" },
  sky: { label: "bleu ciel", swatch: "#91c4d7" },
  terracotta: { label: "terracotta", swatch: "#b85d3f" }
};

const products = [
  {
    id: "hakimi-2",
    name: "Atlas 02",
    price: 76,
    collection: "Atlas Energy",
    image: "assets/images/mockup-hakimi.webp",
    alt: "T-shirt Atlas 02 couleur sable avec graphisme floral football",
    badge: "Drop limité",
    colors: ["sand", "cream"],
    sizes: ["S", "M", "L", "XL"],
    description: "Une pièce sable et gold, pensée pour porter l'énergie de l'Atlas avec une coupe ample, un tombé net et un visuel statement."
  },
  {
    id: "lamine-yamal-19",
    name: "Riviera 19",
    price: 78,
    collection: "Riviera FC",
    image: "assets/images/mockup-yamal.webp",
    alt: "T-shirt Riviera 19 crème avec décor rouge et mosaïques méditerranéennes",
    badge: "Nouveau",
    colors: ["cream", "terracotta"],
    sizes: ["S", "M", "L", "XL"],
    description: "Un modèle solaire, inspiré des façades méditerranéennes, des mosaïques et des grandes soirées de football."
  },
  {
    id: "bellingham-10",
    name: "Golden 10",
    price: 82,
    collection: "Golden 10",
    image: "assets/images/mockup-bellingham.webp",
    alt: "T-shirt Golden 10 noir avec graphisme gold et roses rouges",
    badge: "Best-seller",
    colors: ["black", "gold"],
    sizes: ["S", "M", "L", "XL"],
    description: "Noir profond, détails gold et énergie numéro 10 pour une silhouette statement, premium et nocturne."
  },
  {
    id: "cr7-7",
    name: "Serpent 07",
    price: 79,
    collection: "Serpent Seven",
    image: "assets/images/mockup-cr7.webp",
    alt: "T-shirt Serpent 07 blanc avec serpent, numéro 7 et détails gold",
    badge: "Drop limité",
    colors: ["cream", "terracotta", "sky"],
    sizes: ["S", "M", "L", "XL"],
    description: "Un blanc Riviera relevé de rouge, de serpent et de détails gold pour une pièce forte sans perdre l’élégance."
  },
  {
    id: "mbappe-10",
    name: "Dynasty 10",
    price: 82,
    collection: "Blue Dynasty",
    image: "assets/images/mockup-mbappe.webp",
    alt: "T-shirt Dynasty 10 noir avec lys blancs et numéro bleu profond",
    badge: "Drop limité",
    colors: ["black", "midnight"],
    sizes: ["S", "M", "L", "XL"],
    description: "Noir, bleu nuit et lys blancs pour une lecture plus froide, plus royale, plus match de gala."
  }
];

const state = {
  activeProduct: null,
  color: "",
  size: "",
  quantity: 1,
  cart: []
};

const productGrid = document.querySelector("[data-product-grid]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const activeImage = document.querySelector("[data-active-image]");
const activeName = document.querySelector("[data-active-name]");
const activePrice = document.querySelector("[data-active-price]");
const activeCollection = document.querySelector("[data-active-collection]");
const activeDescription = document.querySelector("[data-active-description]");
const colorOptions = document.querySelector("[data-color-options]");
const sizeOptions = document.querySelector("[data-size-options]");
const qtyOutput = document.querySelector("[data-qty]");
const qtyMinus = document.querySelector("[data-qty-minus]");
const qtyPlus = document.querySelector("[data-qty-plus]");
const addButton = document.querySelector("[data-add]");
const formMessage = document.querySelector("[data-form-message]");
const productForm = document.querySelector("[data-product-form]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartPanel = cartDrawer?.querySelector(".cart-panel");
const cartOpen = document.querySelector("[data-cart-open]");
const cartClose = document.querySelector("[data-cart-close]");
const cartClear = document.querySelector("[data-cart-clear]");
const cartItems = document.querySelector("[data-cart-items]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartCount = document.querySelector("[data-cart-count]");
const checkoutLink = document.querySelector("[data-checkout-link]");
const clubForm = document.querySelector("[data-club-form]");
const clubMessage = document.querySelector("[data-club-message]");
const faqDetails = document.querySelectorAll(".faq-list details");

let lastFocusedElement = null;

function safeReadJSON(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function safeWriteJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function clampQuantity(value) {
  const numericValue = Number.parseInt(value, 10);
  if (Number.isNaN(numericValue)) return 1;
  return Math.min(maxQuantity, Math.max(1, numericValue));
}

function formatPrice(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function getProduct(productId) {
  return products.find((product) => product.id === productId) || products[0];
}

function getColorLabel(color) {
  return colorMeta[color]?.label || color;
}

function normalizeCart(rawCart) {
  if (!Array.isArray(rawCart)) return [];

  return rawCart.reduce((cart, item) => {
    const product = getProduct(item?.id);
    const color = product.colors.includes(item?.color) ? item.color : product.colors[0];
    const size = product.sizes.includes(item?.size) ? item.size : product.sizes[0];
    const quantity = clampQuantity(item?.quantity);
    const key = `${product.id}-${color}-${size}`;
    const existing = cart.find((cartItem) => cartItem.key === key);

    if (existing) {
      existing.quantity = clampQuantity(existing.quantity + quantity);
      return cart;
    }

    cart.push({
      key,
      id: product.id,
      name: product.name,
      collection: product.collection,
      price: product.price,
      image: product.image,
      alt: product.alt,
      color,
      size,
      quantity
    });

    return cart;
  }, []);
}

function saveCart() {
  safeWriteJSON(cartKey, state.cart);
}

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = text;
  return element;
}


function createProductTitle(name) {
  const title = document.createElement("h3");
  title.textContent = name;
  return title;
}

function createCartButton(label, datasetName, key, ariaLabel) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset[datasetName] = key;
  button.setAttribute("aria-label", ariaLabel);
  return button;
}

function renderProductCards() {
  if (!productGrid) return;

  const fragment = document.createDocumentFragment();

  products.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = `product-card${index === 0 ? " is-active" : ""}`;
    card.dataset.productCard = "";
    card.dataset.id = product.id;

    const mediaButton = document.createElement("button");
    mediaButton.type = "button";
    mediaButton.className = "product-media";
    mediaButton.dataset.productSelect = "";
    mediaButton.setAttribute("aria-label", `Sélectionner ${product.name}`);

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.alt;
    image.width = 1122;
    image.height = 1402;
    image.loading = "lazy";
    image.decoding = "async";
    mediaButton.append(image);

    const body = document.createElement("div");
    body.className = "product-card-body";
    const labelRow = document.createElement("div");
    labelRow.className = "product-label-row";
    labelRow.append(createTextElement("span", "", product.collection));

    if (product.badge) {
      labelRow.append(createTextElement("strong", "", product.badge));
    }

    const title = createProductTitle(product.name);

    const meta = document.createElement("div");
    meta.className = "product-meta";
    meta.append(createTextElement("p", "", formatPrice(product.price)));

    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.dataset.productSelect = "";
    selectButton.textContent = "Choisir";
    selectButton.setAttribute("aria-label", `Choisir ${product.name}`);
    meta.append(selectButton);

    body.append(labelRow, title, meta);
    card.append(mediaButton, body);
    fragment.append(card);
  });

  productGrid.replaceChildren(fragment);
}

function renderOptions(product) {
  if (!colorOptions || !sizeOptions) return;

  colorOptions.replaceChildren();
  sizeOptions.replaceChildren();

  product.colors.forEach((color) => {
    const button = document.createElement("button");
    const label = getColorLabel(color);

    button.type = "button";
    button.className = "color-option";
    button.dataset.color = color;
    button.style.background = colorMeta[color]?.swatch || "#fffaf0";
    button.setAttribute("aria-label", `Couleur ${label}`);
    button.setAttribute("aria-pressed", "false");
    button.title = `Couleur ${label}`;
    button.addEventListener("click", () => {
      state.color = color;
      syncFormState();
    });

    colorOptions.append(button);
  });

  product.sizes.forEach((size) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "size-option";
    button.dataset.size = size;
    button.textContent = size;
    button.setAttribute("aria-label", `Taille ${size}`);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      state.size = size;
      syncFormState();
    });

    sizeOptions.append(button);
  });
}

function syncFormState() {
  colorOptions?.querySelectorAll("button").forEach((button) => {
    const active = button.dataset.color === state.color;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  sizeOptions?.querySelectorAll("button").forEach((button) => {
    const active = button.dataset.size === state.size;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (qtyOutput) qtyOutput.textContent = state.quantity;

  const canAdd = Boolean(state.activeProduct && state.color && state.size);
  if (addButton) addButton.disabled = !canAdd;
  if (formMessage) {
    formMessage.textContent = canAdd
      ? `Couleur ${getColorLabel(state.color)} et taille ${state.size} sélectionnées.`
      : "Choisis une couleur et une taille.";
  }
}

function selectProduct(productId, shouldScroll = true) {
  const product = getProduct(productId);
  state.activeProduct = product;
  state.color = product.colors[0] || "";
  state.size = product.sizes[0] || "";
  state.quantity = 1;

  document.querySelectorAll("[data-product-card]").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.id === product.id);
  });

  if (activeImage) {
    activeImage.src = product.image;
    activeImage.alt = product.alt;
  }
  if (activeName) activeName.textContent = product.name;
  if (activeCollection) activeCollection.textContent = product.collection;
  if (activePrice) activePrice.textContent = formatPrice(product.price);
  if (activeDescription) activeDescription.textContent = product.description;

  renderOptions(product);
  syncFormState();

  if (shouldScroll) {
    document.querySelector(".purchase")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function addToCart() {
  if (!state.activeProduct || !state.color || !state.size) return;

  const key = `${state.activeProduct.id}-${state.color}-${state.size}`;
  const existing = state.cart.find((item) => item.key === key);

  if (existing) {
    existing.quantity = clampQuantity(existing.quantity + state.quantity);
  } else {
    state.cart.push({
      key,
      id: state.activeProduct.id,
      name: state.activeProduct.name,
      collection: state.activeProduct.collection,
      price: state.activeProduct.price,
      image: state.activeProduct.image,
      alt: state.activeProduct.alt,
      color: state.color,
      size: state.size,
      quantity: state.quantity
    });
  }

  state.quantity = 1;
  saveCart();
  renderCart();
  syncFormState();
  openCart();
  if (formMessage) formMessage.textContent = "Produit ajouté au panier.";
}

function renderCart() {
  if (!cartCount || !cartTotal || !cartItems || !cartClear || !checkoutLink) return;

  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);
  cartItems.replaceChildren();
  cartClear.disabled = state.cart.length === 0;

  if (!state.cart.length) {
    const empty = createTextElement("p", "cart-empty", "Ton panier est vide. Sélectionne un modèle du drop pour préparer ta commande.");
    cartItems.append(empty);
    checkoutLink.href = "#boutique";
    checkoutLink.textContent = "Voir le drop";
    return;
  }

  state.cart.forEach((item) => {
    const row = document.createElement("article");
    row.className = "cart-item";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.alt || item.name;
    image.width = 78;
    image.height = 98;
    image.loading = "lazy";

    const content = document.createElement("div");
    const title = createTextElement("h3", "", item.name);
    const details = createTextElement("p", "", `${getColorLabel(item.color)} / ${item.size}`);
    const lineTotal = createTextElement("strong", "", formatPrice(item.price * item.quantity));

    const actions = document.createElement("div");
    actions.className = "cart-item-actions";

    const quantity = document.createElement("div");
    quantity.className = "cart-quantity";
    const decrease = createCartButton("−", "cartDecrease", item.key, `Diminuer la quantité de ${item.name}`);
    const quantityText = createTextElement("span", "", String(item.quantity));
    const increase = createCartButton("+", "cartIncrease", item.key, `Augmenter la quantité de ${item.name}`);
    increase.disabled = item.quantity >= maxQuantity;
    decrease.disabled = item.quantity <= 1;
    quantity.append(decrease, quantityText, increase);

    const remove = createCartButton("Supprimer", "cartRemove", item.key, `Supprimer ${item.name} du panier`);
    remove.className = "cart-item-remove";

    actions.append(quantity, remove);
    content.append(title, details, lineTotal, actions);
    row.append(image, content);
    cartItems.append(row);
  });

  checkoutLink.href = buildOrderMailto(total);
  checkoutLink.textContent = "Commander par email";
}

function buildOrderMailto(total) {
  const subject = encodeURIComponent("Commande MIRAZUR");
  const lines = [
    "Bonjour MIRAZUR,",
    "",
    "Je souhaite préparer une demande de commande :",
    ...state.cart.map((item) => `- ${item.name} | couleur ${getColorLabel(item.color)} | taille ${item.size} | quantité ${item.quantity} | ${formatPrice(item.price * item.quantity)}`),
    "",
    `Total estimé : ${formatPrice(total)}`,
    "",
    "Merci de me confirmer la disponibilité, le délai de préparation et le moyen de paiement avant validation.",
    "",
    "Nom du client :",
    "Téléphone :",
    "Adresse de livraison :",
    "",
    "Notes :"
  ];
  const body = encodeURIComponent(lines.join("\n"));

  return `mailto:${orderEmail}?subject=${subject}&body=${body}`;
}

function openCart() {
  if (!cartDrawer || !cartPanel) return;

  lastFocusedElement = document.activeElement;
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
  cartPanel.focus({ preventScroll: true });
}

function closeCart(shouldReturnFocus = true) {
  if (!cartDrawer?.classList.contains("is-open")) return;

  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");

  if (shouldReturnFocus) {
    const target = lastFocusedElement instanceof HTMLElement && document.contains(lastFocusedElement)
      ? lastFocusedElement
      : cartOpen;
    target?.focus();
  }
}

function closeMenu() {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  document.body.classList.remove("menu-open");
}

function changeCartQuantity(key, delta) {
  const item = state.cart.find((cartItem) => cartItem.key === key);
  if (!item) return;

  item.quantity = clampQuantity(item.quantity + delta);
  saveCart();
  renderCart();
}

function removeCartItem(key) {
  state.cart = state.cart.filter((item) => item.key !== key);
  saveCart();
  renderCart();
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'))
    .filter((element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true");
}

function trapCartFocus(event) {
  if (event.key !== "Tab" || !cartDrawer?.classList.contains("is-open") || !cartPanel) return;

  const focusableElements = getFocusableElements(cartPanel);
  if (!focusableElements.length) return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function syncDetailsAccessibility(details) {
  const summary = details.querySelector("summary");
  if (!summary) return;

  summary.setAttribute("aria-expanded", String(details.open));
}

productGrid?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const trigger = target.closest("[data-product-select]");
  const card = trigger?.closest("[data-product-card]");

  if (card instanceof HTMLElement && card.dataset.id) {
    selectProduct(card.dataset.id);
  }
});

menuToggle?.addEventListener("click", () => {
  if (!mobileMenu) return;

  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  document.body.classList.toggle("menu-open", open);
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLElement && event.target.closest("a")) closeMenu();
});

qtyMinus?.addEventListener("click", () => {
  state.quantity = clampQuantity(state.quantity - 1);
  syncFormState();
});

qtyPlus?.addEventListener("click", () => {
  state.quantity = clampQuantity(state.quantity + 1);
  syncFormState();
});

productForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  addToCart();
});

cartOpen?.addEventListener("click", openCart);
cartClose?.addEventListener("click", () => closeCart());

cartClear?.addEventListener("click", () => {
  state.cart = [];
  saveCart();
  renderCart();
});

checkoutLink?.addEventListener("click", () => {
  if (checkoutLink.getAttribute("href") === "#boutique") {
    closeCart(false);
  }
});

cartDrawer?.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCart();
});

cartItems?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const decrease = target.closest("[data-cart-decrease]");
  const increase = target.closest("[data-cart-increase]");
  const remove = target.closest("[data-cart-remove]");

  if (decrease instanceof HTMLElement) changeCartQuantity(decrease.dataset.cartDecrease, -1);
  if (increase instanceof HTMLElement) changeCartQuantity(increase.dataset.cartIncrease, 1);
  if (remove instanceof HTMLElement) removeCartItem(remove.dataset.cartRemove);
});

clubForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(clubForm);
  const email = String(form.get("email") || "").trim().toLowerCase();

  if (!clubForm.checkValidity() || !email) {
    clubMessage.textContent = "Entre une adresse email valide pour rejoindre le club.";
    return;
  }

  const saved = safeReadJSON(clubKey, []);
  const nextList = [...new Set([...saved, email])];
  const savedLocally = safeWriteJSON(clubKey, nextList);

  clubMessage.textContent = savedLocally
    ? "Merci, ton email est bien noté pour la démo. Branche un outil email/CRM avant la mise en ligne."
    : "Merci. Ton navigateur bloque l’enregistrement local : branche un outil email/CRM avant la mise en ligne.";
  clubForm.reset();
});

faqDetails.forEach((details) => {
  syncDetailsAccessibility(details);
  details.addEventListener("toggle", () => syncDetailsAccessibility(details));
});

document.addEventListener("keydown", (event) => {
  trapCartFocus(event);

  if (event.key === "Escape") {
    closeCart();
    closeMenu();
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === cartKey) {
    state.cart = normalizeCart(safeReadJSON(cartKey, []));
    renderCart();
  }
});

function init() {
  renderProductCards();
  state.cart = normalizeCart(safeReadJSON(cartKey, []));
  selectProduct(products[0]?.id, false);
  renderCart();
}

init();
