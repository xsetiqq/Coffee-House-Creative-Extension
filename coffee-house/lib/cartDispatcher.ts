import { CartItem } from "./api/products";

const LS_KEY = "cart";

function safeGetStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function safeSetStorage(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart:change", { detail: { cart } }));
  } catch (e) {
   console.log(e)
  }
}

export function dispatchCart(cart: CartItem[]) {
  safeSetStorage(cart);
}

export function replaceCart(cart: CartItem[]) {
  safeSetStorage(cart);
}


export function addItemToCart(item: CartItem) {
  const current = safeGetStorage();
  const idx = current.findIndex(
    (ci) =>
      ci.productId === item.productId &&
      ci.sizeKey === item.sizeKey &&
      JSON.stringify(ci.additives) === JSON.stringify(item.additives)
  );

  let next: CartItem[];
  if (idx !== -1) {
    next = [...current];
    next[idx] = { ...next[idx], count: next[idx].count + item.count };
  } else {
    next = [...current, item];
  }

  safeSetStorage(next);
}


export function removeItemFromCart(
  productId: number,
  sizeKey: string,
  additives: string[]
) {
  const current = safeGetStorage();
  const next = current.filter(
    (ci) =>
      !(
        ci.productId === productId &&
        ci.sizeKey === sizeKey &&
        JSON.stringify(ci.additives) === JSON.stringify(additives)
      )
  );
  safeSetStorage(next);
}


export function updateItemQuantity(
  productId: number,
  sizeKey: string,
  additives: string[],
  newCount: number
) {
  const current = safeGetStorage();
  const next = current
    .map((ci) =>
      ci.productId === productId &&
      ci.sizeKey === sizeKey &&
      JSON.stringify(ci.additives) === JSON.stringify(additives)
        ? { ...ci, count: newCount }
        : ci
    )
    .filter((ci) => ci.count > 0);
  safeSetStorage(next);
}

export function clearCart() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LS_KEY);
    window.dispatchEvent(
      new CustomEvent("cart:change", { detail: { cart: [] } })
    );
  } catch {

  }
}
