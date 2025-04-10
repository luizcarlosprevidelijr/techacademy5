export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Evita CPFs como "111.111.111-11"

  const calcCheckDigit = (factor: number) =>
    cpf
      .slice(0, factor - 1)
      .split("")
      .reduce((sum, num, index) => sum + Number(num) * (factor - index), 0) %
      11 <
    2
      ? 0
      : 11 -
        (cpf
          .slice(0, factor - 1)
          .split("")
          .reduce(
            (sum, num, index) => sum + Number(num) * (factor - index),
            0
          ) %
          11);

  return (
    calcCheckDigit(10) === Number(cpf[9]) &&
    calcCheckDigit(11) === Number(cpf[10])
  );
};
