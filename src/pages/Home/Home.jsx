import React from 'react'
import './Home.css'
import SideBar from '../../components/SideBar'
import HeaderImg from '../../assets/Imgs/bookBackground.jpg'

const Home = () => {
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
            <p>seu estudo, em um lugar só</p>
            <h1>Study Smarter<span>,</span> Not Harder</h1>
            <p className='home-header-p'>Torne seus estudos muito mais fluidos. Planeje suas metas, veja seu progresso, e foque no que importa.</p>
          </header>

          {/* --- CONTEÚDO PRINCIPAL --- */}
          <main className='home-main-content'>
            
            {/* --- Seção de Funcionalidades --- */}
            <section className='features-section'>
              <h2>Funcionalidades Principais</h2>
              <div className='features-grid'>
                <div className='feature-card'>
                  <h3>📅 Organize suas Tarefas</h3>
                  <p>Crie planos de estudo detalhados e acompanhe suas atividades diárias com facilidade.</p>
                </div>
                <div className='feature-card'>
                  <h3>📊 Visualize seu Progresso</h3>
                  <p>Gráficos e relatórios intuitivos que mostram sua evolução ao longo do tempo.</p>
                </div>
                <div className='feature-card'>
                  <h3>📚 Centralize seus Recursos</h3>
                  <p>Guarde anotações, links importantes e materiais de apoio em um único lugar.</p>
                </div>
              </div>
            </section>

            {/* --- Seção "Como Funciona?" --- */}
            <section className='how-it-works-section'>
              <h2>Como Funciona?</h2>
              <div className='steps-container'>
                <div className='step-card'>
                  <span>1</span>
                  <h3>Cadastre-se</h3>
                  <p>Crie sua conta em segundos e comece a configurar seu perfil de estudos.</p>
                </div>
                <div className='step-card'>
                  <span>2</span>
                  <h3>Planeje</h3>
                  <p>Adicione suas matérias, defina metas e organize suas tarefas no calendário.</p>
                </div>
                <div className='step-card'>
                  <span>3</span>
                  <h3>Execute e Acompanhe</h3>
                  <p>Siga seu plano, marque tarefas como concluídas e veja seu progresso crescer.</p>
                </div>
              </div>
            </section>

            {/* --- Seção de Depoimentos --- */}
            <section className='testimonials-section'>
              <h2>O que nossos usuários dizem</h2>
              <div className='testimonials-grid'>
                <div className='testimonia-card'>
                  <p>"Esta plataforma mudou minha forma de estudar. Finalmente consigo ver onde meu tempo está indo!"</p>
                  <span>- João P., Estudante de Engenharia</span>
                </div>
                <div className='testimonia-card'>
                  <p>"A melhor parte é ter tudo em um só lugar. Adeus, planilhas confusas e apps separados."</p>
                  <span>- Maria S., Concurseira</span>
                </div>
                <div className='testimonia-card'>
                  <p>"Intuitivo e direto ao ponto. Me ajudou a manter o foco e a disciplina para o ENEM."</p>
                  <span>- Lucas R., Vestibulando</span>
                </div>
              </div>
            </section>

            {/* --- Seção de Call to Action (CTA) --- */}
            <section className='cta-section'>
              <h2>Pronto para transformar seus estudos?</h2>
              <p>Comece gratuitamente e descubra uma nova forma de aprender e se organizar.</p>
              <button className='cta-button'>Começar agora</button>
            </section>

          </main>

          {/* --- RODAPÉ --- */}
          <footer className='home-footer'>
            <p>© 2025 SeuProjeto. Todos os direitos reservados.</p>
          </footer>

        </div>
      </div>
    </>
  )
}

export default Home