// lógica para corrigir erro do comportamento padrão da biblioteca "react-router-dom" em uma single page

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Extrai o "pathname" do objeto de localização. O pathname é a parte da URL após o domínio (ex: "/primeiroAno/portugues")
  const { pathname } = useLocation();

  // O useEffect será executado toda vez que o "pathname" mudar.
  useEffect(() => {
    // A cada mudança de rota, este comando rola a janela para as coordenadas (0, 0), ou seja, o topo da página.
    window.scrollTo(0, 0);
  }, [pathname]); // O array de dependências garante que o efeito só rode quando a URL mudar.

  // Este componente não renderiza nada na tela, ele apenas executa o efeito colateral de rolar a página.
  return null;
}

export default ScrollToTop;