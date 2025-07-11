// Item adını temizle ve görüntülenebilir hale getir
export const getDisplayName = (itemName) => {
  return itemName
    .replace(/_/g, " ") // Alt çizgileri boşlukla değiştir
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Her kelimenin ilk harfini büyük yap
};

// Seçilen tier ve enchantment ile tam item ID'si oluştur
export const buildItemId = (itemName, tier, enchantment) => {
  let itemId = `${tier}_${itemName}`;
  if (enchantment !== "0") {
    itemId += `@${enchantment}`;
  }
  return itemId;
};

// Fiyat formatlama
export const formatPrice = (price) => {
  if (!price || price === 0) return "N/A";
  return new Intl.NumberFormat("tr-TR").format(price);
};

// Tarih formatlama
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
