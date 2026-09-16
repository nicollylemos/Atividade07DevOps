import { describe, test, expect } from 'vitest';
import { calculateDiscount } from '../../services/discountService';

// Testes unitários: validam a regra de negócio isoladamente,
// sem UI e sem dependências externas.
describe('calculateDiscount - regra de negócio', () => {

  test('aplica 10% para valores abaixo de R$100', () => {
    const result = calculateDiscount(50);

    expect(result.discount).toBe(10);
    expect(result.discountValue).toBe(5);
    expect(result.finalValue).toBe(45);
  });

  test('aplica 10% para valores próximos do limite inferior', () => {
    const result = calculateDiscount(1);

    expect(result.discount).toBe(10);
  });

  test('aplica 5% quando o valor é exatamente R$100 (limite)', () => {
    const result = calculateDiscount(100);

    expect(result.discount).toBe(5);
    expect(result.discountValue).toBe(5);
    expect(result.finalValue).toBe(95);
  });

  test('aplica 5% para valores acima de R$100', () => {
    const result = calculateDiscount(300);

    expect(result.discount).toBe(5);
    expect(result.discountValue).toBe(15);
    expect(result.finalValue).toBe(285);
  });

  test('arredonda valores quebrados para 2 casas decimais', () => {
    const result = calculateDiscount(33.33);

    expect(result.discountValue).toBe(3.33);
    expect(result.finalValue).toBe(30);
  });

  test('lança erro para valor igual a zero', () => {
    expect(() => calculateDiscount(0)).toThrow('Valor inválido');
  });

  test('lança erro para valor negativo', () => {
    expect(() => calculateDiscount(-10)).toThrow('Valor inválido');
  });

  test('lança erro para valor não numérico (NaN)', () => {
    expect(() => calculateDiscount(Number('abc'))).toThrow('Valor inválido');
  });

  test('retorna um objeto com todas as chaves esperadas', () => {
    const result = calculateDiscount(150);

    expect(result).toHaveProperty('originalValue', 150);
    expect(result).toHaveProperty('discount');
    expect(result).toHaveProperty('discountValue');
    expect(result).toHaveProperty('finalValue');
  });

});
