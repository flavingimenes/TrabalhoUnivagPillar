import React, { useState, useEffect } from 'react';
import "./calendario.css";
import SideBar from '../../components/SideBar';
import HeaderImg from '../../assets/Imgs/bookBackground.jpg';

const Calendario = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [annotations, setAnnotations] = useState({}); 
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);

    // IMPORTANTE: Em produção, pegue isso do seu sistema de login (Ex: localStorage.getItem('userId'))
    const userId = 1; 

    const [formState, setFormState] = useState({ 
        id: null, 
        title: "", 
        startTime: "", 
        endTime: "", 
        type: "matematica" 
    });

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const subjectTypes = {
        matematica: { label: "Matemática", color: "#3498db" },
        portugues: { label: "Português", color: "#e74c3c" },
        historia: { label: "História", color: "#d35400" },
        geografia: { label: "Geografia", color: "#2ecc71" },
        fisica: { label: "Física", color: "#9b59b6" },
        quimica: { label: "Química", color: "#e91e63" },
        biologia: { label: "Biologia", color: "#1abc9c" },
        ingles: { label: "Inglês", color: "#34495e" },
        filosofia: { label: "Filosofia/Soc.", color: "#f1c40f" },
        outros: { label: "Outros", color: "#95a5a6" }
    };

    // Utilitários
    const formatDateKey = (date) => date.toISOString().split('T')[0];
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    // --- API ---
    const API_URL = 'http://localhost:3001/api/annotations';

    // 1. Buscar dados
    const fetchAnnotations = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?userId=${userId}`);
            if (!response.ok) throw new Error('Falha ao buscar dados');
            
            const dataFromDB = await response.json();
            
            const organizedData = {};
            dataFromDB.forEach(item => {
                // Tratamento robusto de data (String ou Objeto Date)
                let dateString;
                if (typeof item.annotation_date === 'string') {
                    dateString = item.annotation_date.split('T')[0];
                } else {
                    // Caso o driver retorne objeto Date
                    dateString = new Date(item.annotation_date).toISOString().split('T')[0];
                }

                if (!organizedData[dateString]) organizedData[dateString] = [];
                
                organizedData[dateString].push({
                    id: item.id,
                    title: item.title,
                    startTime: item.start_time, 
                    endTime: item.end_time,
                    type: item.subject_type 
                });
            });
            
            setAnnotations(organizedData);
        } catch (error) {
            console.error("Erro ao buscar anotações:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnotations();
    }, []);

    // 2. Salvar (Create/Update)
    const handleSaveAnnotation = async (e) => {
        e.preventDefault();
        if (!formState.title) return;

        const dateKey = formatDateKey(selectedDate);
        const payload = {
            user_id: userId,
            title: formState.title,
            annotation_date: dateKey,
            start_time: formState.startTime,
            end_time: formState.endTime,
            subject_type: formState.type
        };

        try {
            if (formState.id) {
                // PUT
                const response = await fetch(`${API_URL}/${formState.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) throw new Error('Erro ao atualizar');

                // Update Otimista no Frontend
                const currentList = annotations[dateKey] || [];
                const updatedList = currentList.map(item => 
                    item.id === formState.id ? { ...item, ...payload, id: formState.id, type: payload.subject_type, startTime: payload.start_time, endTime: payload.end_time } : item
                );
                setAnnotations({ ...annotations, [dateKey]: updatedList });

            } else {
                // POST
                const res = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error('Erro ao salvar');

                const data = await res.json();
                const newId = data.id; // ID real vindo do banco
                
                const newItem = { ...payload, id: newId, type: payload.subject_type, startTime: payload.start_time, endTime: payload.end_time };
                
                const currentList = annotations[dateKey] || [];
                setAnnotations({ ...annotations, [dateKey]: [...currentList, newItem] });
            }

            closeModal();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar no banco de dados. Verifique o console.");
        }
    };

    // 3. Deletar
    const handleDeleteAnnotation = async (id) => {
        if(!window.confirm("Tem certeza que deseja excluir esta anotação?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Erro ao deletar');

            const dateKey = formatDateKey(selectedDate);
            const updatedList = annotations[dateKey].filter(item => item.id !== id);
            setAnnotations({ ...annotations, [dateKey]: updatedList });
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir item.");
        }
    };

    // Helpers de UI
    const handleEditClick = (annotation) => {
        setFormState({
            id: annotation.id,
            title: annotation.title,
            startTime: annotation.startTime,
            endTime: annotation.endTime,
            type: annotation.type
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFormState({ id: null, title: "", startTime: "", endTime: "", type: "matematica" });
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
    };

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayIndex = getFirstDayOfMonth(year, month);
        const daysArray = [];

        for (let i = 0; i < firstDayIndex; i++) {
            daysArray.push(<div key={`empty-${i}`} className="study-planner-day-cell study-planner-day-empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateToCheck = new Date(year, month, day);
            const dateKey = formatDateKey(dateToCheck);
            const dayAnnotations = annotations[dateKey] || [];
            const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

            daysArray.push(
                <div key={day} className={`study-planner-day-cell ${isSelected ? 'study-planner-day-selected' : ''} ${isToday ? 'study-planner-day-today' : ''}`} onClick={() => handleDateClick(day)}>
                    {day}
                    {dayAnnotations.length > 0 && (
                        <div className="study-planner-indicators">
                            {dayAnnotations.slice(0, 3).map((an, idx) => (
                                <span key={idx} className="study-planner-dot" style={{ backgroundColor: subjectTypes[an.type]?.color || '#ccc' }} />
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return daysArray;
    };

    const selectedDateKey = formatDateKey(selectedDate);
    const currentDayAnnotations = (annotations[selectedDateKey] || []).filter(an => 
        filter === 'all' ? true : an.type === filter
    );

    return (
        <div className='study-planner-root'>
            <SideBar />
            <div className='study-planner-main'>
                <header className='study-planner-header-container'>
                    <img src={HeaderImg} alt="HeaderImg" className='study-planner-header-img' />
                </header>
                
                <div className="study-planner-content">
                    <h2 className="study-planner-title">Calendário De Estudos</h2>
                    
                    <div className="study-planner-layout">
                        <div className="study-planner-left-panel">
                            <div className="study-planner-calendar-header">
                                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="study-planner-nav-btn">&lt;</button>
                                <div className="study-planner-month-label">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
                                <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="study-planner-nav-btn">&gt;</button>
                            </div>
                            <div className="study-planner-week-header">
                                {weekDays.map(day => <div key={day} className="study-planner-week-day">{day}</div>)}
                            </div>
                            <div className="study-planner-days-grid">
                                {renderCalendarDays()}
                            </div>
                        </div>

                        <div className="study-planner-right-panel">
                            <div className="study-planner-annotations-header">
                                <h3>{selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                                <button className="study-planner-add-btn" onClick={() => setShowModal(true)} title="Nova Anotação">+</button>
                            </div>

                            <div className="study-planner-filter-box">
                                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                    <option value="all">Todas as Matérias</option>
                                    {Object.entries(subjectTypes).map(([key, value]) => (
                                        <option key={key} value={key}>{value.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="study-planner-list">
                                {loading ? <p className="study-planner-no-items">Carregando...</p> : 
                                currentDayAnnotations.length === 0 ? (
                                    <p className="study-planner-no-items">Nenhuma anotação para este dia.</p>
                                ) : (
                                    currentDayAnnotations.map(an => (
                                        <div key={an.id} className="study-planner-card" style={{ borderLeftColor: subjectTypes[an.type]?.color }}>
                                            <div className="study-planner-card-info">
                                                <div className="study-planner-time-range">
                                                    <span className="study-planner-icon">🕒</span>
                                                    {an.startTime || '--:--'} {an.endTime ? ` - ${an.endTime}` : ''}
                                                </div>
                                                <span className="study-planner-card-title">{an.title}</span>
                                                <span className="study-planner-card-tag" style={{ color: subjectTypes[an.type]?.color }}>
                                                    {subjectTypes[an.type]?.label}
                                                </span>
                                            </div>
                                            <div className="study-planner-card-actions">
                                                <button onClick={() => handleEditClick(an)} className="study-planner-action-btn edit" title="Editar">✎</button>
                                                <button onClick={() => handleDeleteAnnotation(an.id)} className="study-planner-action-btn delete" title="Remover">&times;</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="study-planner-modal-overlay">
                        <div className="study-planner-modal-box">
                            <h3>{formState.id ? 'Editar Anotação' : 'Nova Anotação'}</h3>
                            <form onSubmit={handleSaveAnnotation}>
                                <input 
                                    type="text" 
                                    placeholder="O que você vai estudar?" 
                                    value={formState.title}
                                    onChange={e => setFormState({...formState, title: e.target.value})}
                                    required
                                    autoFocus
                                    className="study-planner-input-text"
                                />
                                
                                <label className="study-planner-label">Horário</label>
                                <div className="study-planner-form-row">
                                    <input type="time" value={formState.startTime} onChange={e => setFormState({...formState, startTime: e.target.value})} required className="study-planner-input-time" />
                                    <span className="study-planner-separator">até</span>
                                    <input type="time" value={formState.endTime} onChange={e => setFormState({...formState, endTime: e.target.value})} className="study-planner-input-time" />
                                </div>

                                <label className="study-planner-label">Matéria</label>
                                <div className="study-planner-form-row">
                                    <select value={formState.type} onChange={e => setFormState({...formState, type: e.target.value})} className="study-planner-select">
                                        {Object.entries(subjectTypes).map(([key, value]) => (
                                            <option key={key} value={key}>{value.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="study-planner-modal-actions">
                                    <button type="button" onClick={closeModal} className="study-planner-btn-cancel">Cancelar</button>
                                    <button type="submit" className="study-planner-btn-save">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calendario;