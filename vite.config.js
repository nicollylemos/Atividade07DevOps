import { defineConfig } from 'vitest/config';

export default defineConfig({

  test: {

    // Configuração global de cobertura, compartilhada por todos
    // os "projects" (tipos de teste) abaixo.
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/services/**', 'src/components/**']
    },

    // Cada tipo de teste (unitário, integração, performance) é
    // declarado como um "project" independente: tem seu próprio
    // ambiente de execução e pode ser rodado isoladamente com
    // `vitest run --project <nome>` (usado nos scripts do
    // package.json), permitindo executar e analisar cada suíte
    // separadamente sem afetar as demais.
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/tests/unit/**/*.test.{js,jsx}']
        }
      },
      {
        extends: true,
        test: {
          name: 'integration',
          // Precisa de DOM, pois renderiza componentes React.
          environment: 'jsdom',
          include: ['src/tests/integration/**/*.test.{js,jsx}']
        }
      },
      {
        extends: true,
        test: {
          name: 'performance',
          environment: 'node',
          include: ['src/tests/performance/**/*.test.{js,jsx}']
        }
      }
    ]

  }

});
