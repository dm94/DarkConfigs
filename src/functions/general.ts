export const toCamelCase = (value: string): string => {
  return clearSymbols(
    value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
  );
};

export const clearSymbols = (value: string): string =>
  value.replace(/[^\w\s]/gi, "");

export const getJsonFileName = (value: string): string =>
  `${toCamelCase(value)}.json`;
