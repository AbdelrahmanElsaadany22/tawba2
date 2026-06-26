export const formatSAR = (amount) =>
  new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);

export const toArabicNumerals = (num) =>
  String(num).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
