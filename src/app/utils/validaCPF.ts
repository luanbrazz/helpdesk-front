export class ValidaCPF {
  static validaCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

    if (cpf.length !== 11) return false; // Verifica se o CPF tem 11 dígitos

    // Verifica se todos os dígitos são iguais
    for (let i = 0; i < 10; i++) {
      if (cpf.charAt(i) !== cpf.charAt(i + 1)) break;
      if (i === 9) return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto === 10 || resto === 11 ? 0 : resto;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto === 10 || resto === 11 ? 0 : resto;

    return (
      cpf.charAt(9) == digito1.toString() &&
      cpf.charAt(10) == digito2.toString()
    );
  }
}
