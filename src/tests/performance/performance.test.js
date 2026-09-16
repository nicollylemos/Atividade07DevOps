import { describe, test, expect } from 'vitest';
import { calculateDiscount } from '../../services/discountService';

// Testes de performance: garantem que a regra de negócio continua
// rápida mesmo sob alto volume de chamadas. Usam a média de várias
// rodadas para reduzir flutuações (flakiness) em ambientes de CI.

function medirTempoMedio(fn, execucoesPorRodada, rodadas) {
  const tempos = [];

  for (let r = 0; r < rodadas; r++) {
    const start = performance.now();

    for (let i = 0; i < execucoesPorRodada; i++) {
      fn(i);
    }

    tempos.push(performance.now() - start);
  }

  return tempos.reduce((total, t) => total + t, 0) / tempos.length;
}

describe('calculateDiscount - performance', () => {

  test('processa 10.000 chamadas em menos de 200ms (média de 5 rodadas)', () => {
    const tempoMedio = medirTempoMedio(
      () => calculateDiscount(50),
      10000,
      5
    );

    expect(tempoMedio).toBeLessThan(200);
  });

  test('mantém tempo estável com valores variados (mistura de 10% e 5%)', () => {
    const tempoMedio = medirTempoMedio(
      (i) => calculateDiscount((i % 500) + 1),
      10000,
      5
    );

    expect(tempoMedio).toBeLessThan(200);
  });

  test('custo médio por chamada individual é inferior a 0.02ms', () => {
    const totalChamadas = 50000;

    const start = performance.now();

    for (let i = 0; i < totalChamadas; i++) {
      calculateDiscount(50);
    }

    const duracao = performance.now() - start;
    const custoPorChamada = duracao / totalChamadas;

    expect(custoPorChamada).toBeLessThan(0.02);
  });

});
