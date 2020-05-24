import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const condominioId = localStorage.getItem('condominioId');
    const condominioName = localStorage.getItem('condominioName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: condominioId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [condominioId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: condominioId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar empatia, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Empatia"/>       
                <span>Bem Vindo, {condominioName}</span>

                <Link className="button" to="/incidents/new">Cadastrar nova empatia</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#d91b6a"/>
                </button>
            </header>

            <h1>Empatias Cadastradas</h1>

            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>EMPATIA:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}