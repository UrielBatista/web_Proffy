import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom'; 

import validator from 'validator' 
import warningIcon from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';


import './styles.css';
import api from '../../services/api';



function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    
    const [whatsapp, setWhatsapp] = useState('');

    const [bio, setBio] = useState('');
    
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);

        scheduleItems.push({
            week_day: 0,
            from: '',
            to: ''
        })
    }

        
    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
        
    }

    
    function handleCreateClass(e: FormEvent) {
        e.preventDefault();
        
        

        if (!whatsapp || whatsapp.length != 9) {
            alert('Numero do whatsapp errado ou nao inserido')
          } else {
              api.post('classes', {
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost: Number(cost),
                schedule: scheduleItems
                
            }).then(() => {
                alert('Cadastro realizado com sucesso!');
                history.push('/');
            }).catch(() => {
                alert('Erro no cadastro!');
            })
          }
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas.."
                description="O primeiro passo é preencher 
                esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" 
                            label="Nome completo" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar} 
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />

                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio} 
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                            <Select 
                                name="subject" 
                                label="Matéria"
                                value={subject}
                                onChange={(e) => { setSubject(e.target.value) }}
                                options={[
                                    { value: 'Artes', label: 'Artes' },
                                    { value: 'Ciências', label: 'Ciências' },
                                    { value: 'Matemática', label: 'Matemática' },
                                    { value: 'Inglês', label: 'Inglês' },
                                    { value: 'Geometria linear', label: 'Geometria linear' },
                                    { value: 'Fisisa', label: 'Fisica' },
                                    { value: 'Calculo 1', label: 'Calculo 1' },
                                    { value: 'Matemática Discreta', label: 'Matemática Discreta' },
                                    { value: 'Ciencia da computação', label: 'Ciencia da computação' },
                                ]}
                            />

                            <Input 
                            name="cost" 
                            label="Custo da sua aula por hora"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                            />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem, index) => {
                            return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '5', label: 'Quinta-feira' },
                                        { value: '6', label: 'Sexta-feira' },
                                        { value: '7', label: 'Sabado' },
                                        ]}
                                    />
                                    <Input 
                                      name="from" 
                                      label="Das" 
                                      type="time"
                                      value={scheduleItem.from}
                                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                      name="to" 
                                      label="Até" 
                                      type="time"
                                      value={scheduleItem.to}
                                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit" >
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;
