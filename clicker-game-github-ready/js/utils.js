export const formatNumber = value =>
    Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
