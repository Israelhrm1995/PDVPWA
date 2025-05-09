export function arredondarParaDuasCasas(numero: number): number {
    return Math.round(numero * 100) / 100;
}