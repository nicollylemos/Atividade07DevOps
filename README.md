
# Projeto DevOps — Sistema Comercial de Descontos

Projeto desenvolvido para demonstrar conceitos de:

- DevOps
- Integração Contínua (CI)
- GitHub Actions
- ESLint
- Testes Automatizados
- Pipeline de Qualidade

---

# Objetivo

Demonstrar como pipelines automatizadas ajudam a:

- validar código;
- executar testes;
- garantir qualidade;
- gerar builds automaticamente.

---

# Regras de Negócio

| Valor da Compra | Desconto |
|---|---|
| menor que R$ 100 | 10% |
| maior ou igual a R$ 100 | 5% |

---

# Tecnologias Utilizadas

## Frontend

- React
- Vite

## Qualidade

- ESLint

## Testes

- Vitest
- React Testing Library

## DevOps

- Git
- GitHub Actions

---

# Estrutura do Projeto

```txt
src/
 ├── components/
 │    └── DiscountDashboard.jsx
 │
 ├── services/
 │    └── discountService.js
 │
 ├── tests/
 │    ├── unit/
 │    ├── integration/
 │    └── performance/
 │
 ├── App.jsx
 └── main.jsx
```

---

# Passo 1 — Criar Projeto

```bash
npm create vite@latest discount-enterprise-app -- --template react
```

---

# Passo 2 — Entrar na Pasta

```bash
cd discount-enterprise-app
```

---

# Passo 3 — Instalar Dependências

```bash
npm install
```

---

# Passo 4 — Instalar Ferramentas

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom eslint
```

---

# Passo 5 — Configurar Scripts

## package.json

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "vitest run",
  "lint": "eslint ."
}
```

---

# Passo 6 — Configurar Vitest

## Arquivo

```txt
vitest.config.js
```

## Código

```js
import { defineConfig }
from 'vitest/config';

export default defineConfig({

  test: {

    environment: 'jsdom'

  }

});
```

---

# Passo 7 — Configurar ESLint

## Arquivo

```txt
.eslintrc.cjs
```

## Código

```js
module.exports = {

  env: {
    browser: true,
    es2021: true
  },

  extends: ['eslint:recommended'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }

};
```

---

# Passo 8 — Criar Regra de Negócio

## Arquivo

```txt
src/services/discountService.js
```

## Código

```js
export function calculateDiscount(value) {

  if (value <= 0) {
    throw new Error('Valor inválido');
  }

  const discount =
    value < 100 ? 10 : 5;

  const discountValue =
    (value * discount) / 100;

  const finalValue =
    value - discountValue;

  return {

    originalValue: value,

    discount,

    discountValue:
      Number(discountValue.toFixed(2)),

    finalValue:
      Number(finalValue.toFixed(2))

  };
}
```

---

# Passo 9 — Criar Interface

## Alterar o App.jsx

```txt
import DiscountDashboard
from './components/DiscountDashboard';

function App() {

  return <DiscountDashboard />;

}

export default App;
```

## Arquivo

```txt
src/components/DiscountDashboard.jsx
```

## Código

```jsx
import { useState } from 'react';

import {
  calculateDiscount
} from '../services/discountService';

export default function DiscountDashboard() {

  const [value, setValue] = useState('');

  const [result, setResult] = useState(null);

  function handleCalculate() {

    const response =
      calculateDiscount(Number(value));

    setResult(response);
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Sistema Comercial
        </h1>

        <p style={styles.subtitle}>
          Cálculo automático de descontos
        </p>

        <div style={styles.formGroup}>

          <label style={styles.label}>
            Valor da Compra
          </label>

          <input
            type="number"

            placeholder="Digite o valor"

            value={value}

            onChange={(e) =>
              setValue(e.target.value)
            }

            style={styles.input}
          />

        </div>

        <button
          onClick={handleCalculate}
          style={styles.button}
        >
          Calcular Desconto
        </button>

        {

          result && (

            <div style={styles.resultCard}>

              <div style={styles.row}>
                <span>
                  Valor Original
                </span>

                <strong>
                  R$ {result.originalValue}
                </strong>
              </div>

              <div style={styles.row}>
                <span>
                  Desconto Aplicado
                </span>

                <strong>
                  {result.discount}%
                </strong>
              </div>

              <div style={styles.row}>
                <span>
                  Economia
                </span>

                <strong>
                  R$ {result.discountValue}
                </strong>
              </div>

              <div style={styles.divider}></div>

              <div style={styles.totalRow}>
                <span>
                  Valor Final
                </span>

                <strong>
                  R$ {result.finalValue}
                </strong>
              </div>

            </div>

          )

        }

      </div>

    </div>

  );
}

const styles = {

  container: {

    minHeight: '100vh',

    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    background: '#f3f4f6',

    padding: '24px',

    fontFamily:
      'Roboto, Arial, sans-serif'
  },

  card: {

    width: '100%',

    maxWidth: '420px',

    background: '#ffffff',

    borderRadius: '16px',

    padding: '32px',

    boxShadow:
      '0 2px 10px rgba(0,0,0,0.08)'
  }

};
```

---

# Passo 10 — Criar Teste Unitário

## Arquivo

```txt
src/tests/unit/discountService.test.js
```

## Código

```js
import {
  describe,
  test,
  expect
}
from 'vitest';

import {
  calculateDiscount
}
from '../../services/discountService';

describe('Teste Unitário', () => {

  test(
    'deve aplicar 10%',
    () => {

      const result =
        calculateDiscount(50);

      expect(
        result.discount
      ).toBe(10);

    }
  );

  test(
    'deve aplicar 5%',
    () => {

      const result =
        calculateDiscount(200);

      expect(
        result.discount
      ).toBe(5);

    }
  );

});
```

---

# Passo 11 — Criar Teste de Integração

## Arquivo

```txt
src/tests/integration/DiscountDashboard.test.jsx
```

## Código

```jsx
import {
  render,
  screen,
  fireEvent
}
from '@testing-library/react';

import {
  test,
  expect
}
from 'vitest';

import DiscountDashboard
from '../../components/DiscountDashboard';

test(
  'deve calcular desconto',
  () => {

    render(
      <DiscountDashboard />
    );

    fireEvent.change(

      screen.getByPlaceholderText(
        'Digite o valor'
      ),

      {
        target: {
          value: '50'
        }
      }

    );

    fireEvent.click(

      screen.getByText(
        'Calcular Desconto'
      )

    );

    expect(

      screen.getByText(
        /10%/
      )

    ).toBeTruthy();

  }
);
```

---

# Passo 12 — Criar Teste de Performance

## Arquivo

```txt
src/tests/performance/performance.test.js
```

## Código

```js
import {
  test,
  expect
}
from 'vitest';

import {
  calculateDiscount
}
from '../../services/discountService';

test(
  'performance',
  () => {

    const start =
      performance.now();

    for (
      let i = 0;
      i < 10000;
      i++
    ) {

      calculateDiscount(50);

    }

    const end =
      performance.now();

    expect(
      end - start
    ).toBeLessThan(100);

  }
);
```

---

# Passo 13 — Criar Pipeline

## Estrutura

```txt
.github/workflows/
```

## Arquivo

```txt
ci.yml
```

## Código

```yaml
name: CI Pipeline

on:

  push:
    branches:
      - main

jobs:

  quality:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3

        with:
          node-version: 20

      - name: Install
        run: npm install

      - name: ESLint
        run: npm run lint

      - name: Tests
        run: npm test

      - name: Build
        run: npm run build
```

---

# Passo 14 — Executar Projeto

## Rodar aplicação

```bash
npm run dev
```

---

## Rodar testes

```bash
npm test
```

---

## Rodar ESLint

```bash
npm run lint
```

---

## Rodar build

```bash
npm run build
```

---

# Passo 15 — Subir Projeto no GitHub

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Projeto DevOps"
```

```bash
git branch -M main
```

```bash
git remote add origin URL
```

```bash
git push -u origin main
```

---

# Fluxo da Pipeline

```txt
Commit
↓
GitHub Actions
↓
Install
↓
ESLint
↓
Unit Tests
↓
Integration Tests
↓
Performance Tests
↓
Build
↓
Pipeline aprovada
```

---

# Demonstrações para Aula

## Quebrar ESLint

```js
const x=1
```

---

## Quebrar regra de negócio

Alterar:

```js
value < 100 ? 10 : 5
```

---

## Quebrar build

Alterar import incorretamente.

---

# Benefícios Demonstrados

- Integração Contínua
- Qualidade Automatizada
- Feedback Rápido
- Redução de Erros
- Validação Automática
- DevOps na prática
=======
# Atividade07DevOps
>>>>>>> 9fb02d4e126c2507933877728128ede8e655bd10
