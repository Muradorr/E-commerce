export const getCartCount = (items) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const getItemSubtotal = (item) => {
  return Math.round(item.price * item.quantity * 100) / 100;
};

export const getCartTotal = (items) => {
  const total = items.reduce((sum, item) => sum + getItemSubtotal(item), 0);
  return Math.round(total * 100) / 100;
};
