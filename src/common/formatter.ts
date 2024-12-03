import dayjs from "dayjs";

export const driverFormatter = (value: string) => {
  const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, "");
  if (alphanumericValue.length === 0) {
    return "";
  } else if (alphanumericValue.length <= 3) {
    return `${alphanumericValue}`;
  } else if (alphanumericValue.length <= 5) {
    return `${alphanumericValue.slice(0, 3)}-${alphanumericValue.slice(3)}`;
  } else {
    return `${alphanumericValue.slice(0, 3)}-${alphanumericValue.slice(3, 5)}-${alphanumericValue.slice(5, 11)}`;
  }
};

export const umidFormatter = (value: string) => {
  const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, "");

  if (alphanumericValue.length === 0) {
    return "";
  } else if (alphanumericValue.length <= 4) {
    return `${alphanumericValue}`;
  } else if (alphanumericValue.length <= 11) {
    return `${alphanumericValue.slice(0, 4)}-${alphanumericValue.slice(4)}`;
  } else {
    return `${alphanumericValue.slice(0, 4)}-${alphanumericValue.slice(4, 11)}-${alphanumericValue.slice(11, 12)}`;
  }
};

export const phoneNumberFormatter = (value: string) => {
  const numericValue = value.replace(/[^\d]/g, "");

  if (numericValue.length === 0) {
    return "";
  } else if (numericValue.length <= 4) {
    return `(${numericValue}`;
  } else if (numericValue.length <= 7) {
    return `(${numericValue.slice(0, 4)}) ${numericValue.slice(4)}`;
  } else {
    return `(${numericValue.slice(0, 4)}) ${numericValue.slice(4, 7)}-${numericValue.slice(7, 11)}`;
  }
};

export const formatNumber = (value: string) => {
  let formattedValue = value.replace(/[^0-9]/g, "");
  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
};

export const formatToPhpCurrency = (
  amount: number,
  currencyCode: string | undefined,
) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

export const formatDate = (date: string | undefined) => {
  if (!date) return "";
  return dayjs(date).format("MM/DD/YYYY");
};
