export const arabicNumerals = (n) =>
  String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

export const ordinalAr = ['الأول', 'الثاني', 'الثالث', 'الرابع'];
