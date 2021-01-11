const normalizeChar = (value: string) => {
  const unmask = value.replace(/[^\d]/g, "");
  return unmask;
};

export default normalizeChar;
