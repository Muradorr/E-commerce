export const formatPrice = (value) => {
  const amount = Number(value);
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;

  return '₱' + amount.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  });
};

export const formatReviews = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return String(count);
};

export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getDiscountPercent = (product) => {
  if (product.oldPrice === null) {
    return 0;
  }
  return Math.round((1 - product.price / product.oldPrice) * 100);
};
