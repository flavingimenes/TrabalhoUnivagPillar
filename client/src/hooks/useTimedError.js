import { useState, useEffect } from 'react';

/**
 * Um Hook personalizado que gerencia uma mensagem de erro.
 * O erro é limpo automaticamente após um tempo especificado.
 * @param {number} timeout - O tempo em milissegundos antes de limpar o erro (padrão: 5000ms).
 * @returns [string | null, function] - Retorna o estado 'error' e a função 'setError'.
 */
export const useTimedError = (timeout = 5000) => {
  
  // O estado do erro é gerenciado internamente pelo Hook
  const [error, setError] = useState(null);

  // O efeito que observa mudanças no 'error'
  useEffect(() => {
    // Se 'error' não for nulo (ou seja, um erro foi definido)
    if (error) {
      // Inicia um timer
      const timerId = setTimeout(() => {
        setError(null); // Limpa o erro após o tempo
      }, timeout); 

      // Função de limpeza: se um novo erro aparecer antes do timer acabar,
      // o timer antigo é cancelado.
      return () => clearTimeout(timerId);
    }
  }, [error, timeout]); // Dependências: re-executa se 'error' ou 'timeout' mudarem

  // Retorna o estado e a função para o componente que está usando o Hook
  return [error, setError];
};