import React, { useState } from 'react';
// 1. IMPORTE o arquivo CSS diretamente
//    (Não precisamos mais da variável 'styles')
import './Team.css'; 
import turma from '../../assets/Imgs/2025.4sem.jpg';

function Team() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* 2. USE os nomes das classes como strings normais */}
      <footer className="footer">
        <h3 
          onClick={openPopup} 
          className="footer-trigger"
        >
          &copy; 2025 Pillar.
        </h3>
      </footer>

      {/* O POP-UP (Modal) */}
      {isPopupOpen && (
        
        // O Overlay
        <div 
          onClick={closePopup}
          className="popup-overlay" // <-- Classe como string
        >
          {/* O Conteúdo */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="popup-content" // <-- Classe como string
          >
            
            {/* O Botão de Fechar */}
            <button 
              onClick={closePopup}
              className="popup-close-button" // <-- Classe como string
            >
              &times;
            </button>
            
            {/* A Imagem */}
            <img 
              src={turma} // <-- TROQUE PELA SUA IMAGEM
              alt="Popup" 
              className="popup-image" // <-- Classe como string
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Team;