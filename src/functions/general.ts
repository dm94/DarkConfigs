export const toCamelCase = (value: string): string => {
  return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const clearDots = (value: string): string => value.replace(".", "");

export const getJsonFileName = (value: string): string =>
  `${toCamelCase(clearDots(value))}.json`;
