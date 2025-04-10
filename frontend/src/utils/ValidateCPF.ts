export const ValidateCPF = (cpf: string): string | undefined => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
    return "CPF inválido. Use um CPF válido.";

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let check1 = (sum * 10) % 11;
  if (check1 === 10 || check1 === 11) check1 = 0;
  if (check1 !== parseInt(cpf.charAt(9)))
    return "CPF inválido. Dígitos inconsistentes.";

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  let check2 = (sum * 10) % 11;
  if (check2 === 10 || check2 === 11) check2 = 0;
  if (check2 !== parseInt(cpf.charAt(10)))
    return "CPF inválido. Dígitos inconsistentes.";

  return undefined; // CPF válido
};
