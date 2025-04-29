export function parseDateBr(dateStr: string): Date | undefined {
    const [diaStr, mesStr, anoStr] = dateStr.split("/");
  
    const dia = parseInt(diaStr, 10);
    const mes = parseInt(mesStr, 10) - 1;
    const ano = parseInt(anoStr, 10);
  
    const date = new Date(ano, mes, dia);
  
    const isValid =
      date.getFullYear() === ano &&
      date.getMonth() === mes &&
      date.getDate() === dia;
  
    return isValid ? date : undefined;
  }
