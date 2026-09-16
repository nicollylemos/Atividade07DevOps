import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from 'vitest';
import DiscountDashboard from '../../components/DiscountDashboard';

// Desmonta o componente do DOM após cada teste, evitando que uma
// renderização "vaze" para o teste seguinte (RTL não faz isso
// sozinho quando `globals` está desativado no Vitest).
afterEach(cleanup);

// Testes de integração: renderizam o componente real e simulam a
// interação do usuário (input + clique), validando componente e
// serviço trabalhando juntos, via DOM (jsdom).

function preencherEcalcular(valor) {
  fireEvent.change(screen.getByPlaceholderText('Digite o valor'), {
    target: { value: valor }
  });

  fireEvent.click(screen.getByText('Calcular Desconto'));
}

describe('DiscountDashboard - fluxo completo', () => {

  test('calcula e exibe 10% de desconto para valor abaixo de R$100', () => {
    render(<DiscountDashboard />);

    preencherEcalcular('50');

    expect(screen.getByText('10%')).toBeTruthy();
    expect(screen.getByText(/R\$ 45/)).toBeTruthy();
  });

  test('calcula e exibe 5% de desconto para valor a partir de R$100', () => {
    render(<DiscountDashboard />);

    preencherEcalcular('500');

    expect(screen.getByText('5%')).toBeTruthy();
    expect(screen.getByText(/R\$ 475/)).toBeTruthy();
  });

  test('exibe mensagem de erro para valor inválido, sem quebrar a tela', () => {
    render(<DiscountDashboard />);

    preencherEcalcular('0');

    expect(screen.getByText('Valor inválido')).toBeTruthy();
    expect(screen.queryByText('Valor Final')).toBeNull();
  });

  test('permite recalcular e atualizar o resultado na tela', () => {
    render(<DiscountDashboard />);

    preencherEcalcular('50');
    expect(screen.getByText('10%')).toBeTruthy();

    preencherEcalcular('500');
    expect(screen.getByText('5%')).toBeTruthy();
    expect(screen.queryByText('10%')).toBeNull();
  });

  test('limpa mensagem de erro anterior após um cálculo válido', () => {
    render(<DiscountDashboard />);

    preencherEcalcular('-10');
    expect(screen.getByText('Valor inválido')).toBeTruthy();

    preencherEcalcular('50');
    expect(screen.queryByText('Valor inválido')).toBeNull();
    expect(screen.getByText('10%')).toBeTruthy();
  });

});
