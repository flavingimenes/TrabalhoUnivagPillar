import React, { useState, useEffect } from 'react'
import './Home.css'
import SideBar from '../../components/SideBar'
import HeaderImg from '../../assets/Imgs/bookBackground.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  // Estado para armazenar os textos vindos do banco
  const [content, setContent] = useState(null);
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);

  // Efeito que roda assim que a página abre para buscar os dados
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Busca na nova rota que criamos no Node.js
        const response = await fetch('http://localhost:3001/content/home');
        if (!response.ok) throw new Error('Falha ao buscar dados');
        
        const data = await response.json();
        setContent(data); // Salva o objeto { key: value } no estado
      } catch (error) {
        console.error("Erro ao carregar conteúdo da home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Enquanto carrega, exibe algo simples (pode ser um Spinner depois)
  if (loading) {
    return <div className="root-home" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>Carregando...</div>;
  }

  // Se falhou e content está null, usa strings vazias para não quebrar
  const safeContent = content || {};

  return (
    <>
      <div className='root-home'>
        <SideBar />
        <div className='main-div'>
          {/* --- HEADER --- */}
          <header>
            <img src={HeaderImg} alt="HeaderImg" className='header-img' />
          </header>
          <header className='home-header'>
            {/* Dados Dinâmicos */}
            <p>{safeContent.hero_top_tag}</p>
            <h1>{safeContent.hero_title}</h1>
            <p className='home-header-p'>{safeContent.hero_subtitle}</p>
          </header>

          {/* --- CONTEÚDO PRINCIPAL --- */}
          <main className='home-main-content'>
            
            {/* --- Seção de Funcionalidades --- */}
            <section className='features-section'>
              <h2>Funcionalidades Principais</h2>
              <div className='features-grid'>
                <div className='feature-card'>
                  <h3>{safeContent.feat_1_title}</h3>
                  <p>{safeContent.feat_1_desc}</p>
                </div>
                <div className='feature-card'>
                  <h3>{safeContent.feat_2_title}</h3>
                  <p>{safeContent.feat_2_desc}</p>
                </div>
                <div className='feature-card'>
                  <h3>{safeContent.feat_3_title}</h3>
                  <p>{safeContent.feat_3_desc}</p>
                </div>
              </div>
            </section>

            {/* --- Seção "Como Funciona?" --- */}
            <section className='how-it-works-section'>
              <h2>Como Funciona?</h2>
              <div className='steps-container'>
                <div className='step-card'>
                  <span>1</span>
                  <h3>{safeContent.step_1_title}</h3>
                  <p>{safeContent.step_1_desc}</p>
                </div>
                <div className='step-card'>
                  <span>2</span>
                  <h3>{safeContent.step_2_title}</h3>
                  <p>{safeContent.step_2_desc}</p>
                </div>
                <div className='step-card'>
                  <span>3</span>
                  <h3>{safeContent.step_3_title}</h3>
                  <p>{safeContent.step_3_desc}</p>
                </div>
              </div>
            </section>

            {/* --- Seção de Depoimentos --- */}
            <section className='testimonials-section'>
              <h2>O que nossos usuários dizem</h2>
              <div className='testimonials-grid'>
                <div className='testimonial-card'>
                  <p>{safeContent.testim_1_text}</p>
                  <span>{safeContent.testim_1_author}</span>
                </div>
                <div className='testimonial-card'>
                  <p>{safeContent.testim_2_text}</p>
                  <span>{safeContent.testim_2_author}</span>
                </div>
                <div className='testimonial-card'>
                  <p>{safeContent.testim_3_text}</p>
                  <span>{safeContent.testim_3_author}</span>
                </div>
              </div>
            </section>

            {/* --- CTA --- */}
            <section className='cta-section'>
              <h2>{safeContent.cta_title}</h2>
              <p>{safeContent.cta_desc}</p>
              <Link to="/atividades" className='cta-button'>Começar agora</Link>
            </section>

          </main>

          {/* --- RODAPÉ --- */}
          <footer className='home-footer'>
            <p>{safeContent.footer_text}</p>
          </footer>

        </div>
      </div>
    </>
  )
}

export default Home