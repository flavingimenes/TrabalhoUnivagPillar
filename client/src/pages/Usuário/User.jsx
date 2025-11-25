import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Importa o CSS onde a fonte é definida
import "./User.css"; 

// Ajuste os caminhos abaixo conforme a estrutura do seu projeto, se necessário
import SideBar from '../../components/SideBar';
import HeaderImg from '../../assets/Imgs/bookBackground.jpg';

const User = () => {
    const navigate = useNavigate();
    
    // Estados para dados do usuário
    const [userData, setUserData] = useState({
        email: '',
        academic_focus: ''
    });

    // Estados para alteração de senha
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(true);

    // 1. Buscar dados do usuário ao carregar
    useEffect(() => {
        const userId = localStorage.getItem('userId'); 
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            // Se não tiver login, redireciona
            navigate('/');
            return;
        }

        const fetchUserData = async () => {
            try {
                // Certifique-se que seu backend está rodando na porta 3001
                const response = await fetch(`http://localhost:3001/api/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error("Erro ao buscar dados do usuário");
                }
            } catch (error) {
                console.error("Erro de conexão:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // 2. Função para formatar o texto do Foco Acadêmico
    const formatFocus = (focus) => {
        const map = {
            '1_ano': '1º Ano do Ensino Médio',
            '2_ano': '2º Ano do Ensino Médio',
            '3_ano': '3º Ano do Ensino Médio',
            'enem': 'Foco no ENEM'
        };
        return map[focus] || focus;
    };

    // 3. Lidar com mudança nos inputs de senha
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
    };

    // 4. Enviar requisição de troca de senha
    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            setMessage({ type: 'error', text: 'A nova senha e a confirmação não conferem.' });
            return;
        }

        if (passwords.newPassword.length < 8) {
            setMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 8 caracteres.' });
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            
            const response = await fetch('http://localhost:3001/api/user/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
                setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                // Fecha o formulário após 2 segundos
                setTimeout(() => setShowPasswordForm(false), 2000);
            } else {
                setMessage({ type: 'error', text: data.error || 'Erro ao alterar senha.' });
            }

        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao conectar com o servidor.' });
        }
    };

    return (
        <div className='user-profile-root'>
            <SideBar />
            
            <div className='user-profile-main'>
                <header className='user-profile-header'>
                    <img src={HeaderImg} alt="HeaderImg" className='user-profile-header-img' />
                </header>
                
                <div className="user-profile-content">
                    <h2 className="user-profile-title">
                        Minha Conta
                    </h2>

                    {loading ? (
                        <p className="user-profile-loading">Carregando dados...</p>
                    ) : (
                        <div className="user-profile-card">
                            
                            {/* Grupo: Email */}
                            <div className="user-profile-info-group">
                                <label className="user-profile-label">Email</label>
                                <div className="user-profile-value">
                                    {userData.email}
                                </div>
                            </div>

                            {/* Grupo: Foco */}
                            <div className="user-profile-info-group">
                                <label className="user-profile-label">Foco / Ano Letivo</label>
                                <div className="user-profile-value">
                                    {formatFocus(userData.academic_focus) || 'Não definido'}
                                </div>
                            </div>

                            {/* Grupo: Senha (Visualização) */}
                            <div className="user-profile-info-group">
                                <label className="user-profile-label">Senha</label>
                                <div className="user-profile-password-row">
                                    <input 
                                        type="password" 
                                        value="********" 
                                        disabled 
                                        className="user-profile-password-display"
                                    />
                                    <button 
                                        className="user-profile-btn-toggle"
                                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                                    >
                                        {showPasswordForm ? 'Cancelar' : 'Alterar Senha'}
                                    </button>
                                </div>
                            </div>

                            {/* Formulário de Alteração de Senha (Condicional) */}
                            {showPasswordForm && (
                                <form onSubmit={handleSubmitPassword} className="user-profile-form">
                                    <h3 className="user-profile-subtitle">Alterar Senha</h3>
                                    
                                    <div className="user-profile-input-group">
                                        <label className="user-profile-label-sm">Senha Atual:</label>
                                        <input 
                                            className="user-profile-input"
                                            type="password" 
                                            name="currentPassword"
                                            value={passwords.currentPassword}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>

                                    <div className="user-profile-row-split">
                                        <div className="user-profile-col">
                                            <label className="user-profile-label-sm">Nova Senha:</label>
                                            <input 
                                                className="user-profile-input"
                                                type="password" 
                                                name="newPassword"
                                                value={passwords.newPassword}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                        </div>
                                        <div className="user-profile-col">
                                            <label className="user-profile-label-sm">Confirmar Nova Senha:</label>
                                            <input 
                                                className="user-profile-input"
                                                type="password" 
                                                name="confirmNewPassword"
                                                value={passwords.confirmNewPassword}
                                                onChange={handlePasswordChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {message.text && (
                                        <div className={`user-profile-message ${message.type === 'error' ? 'user-profile-error' : 'user-profile-success'}`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <button type="submit" className="user-profile-btn-save">
                                        Salvar Nova Senha
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default User;