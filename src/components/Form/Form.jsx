import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
 const [name, setName] = useState('');
 const [phone, setPhone] = useState('');
 const [city, setCity] = useState('');
 const {tg} = useTelegram();

const onSendData = useCallback(() => {
    const data = {
        name,
        phone,
        city
    }
    tg.sendData(JSON.stringify(data));
}, [name, phone, city]);

useEffect(() => {
    tg.onEvent('backButtonClicked', onSendData)
    return () => {
        tg.offEvent('backButtonClicked', onSendData)
    }
}, [onSendData]);

 useEffect (() => {
    tg.MainButton.setParams({
        text: 'Відправити данні'
    })
 }, [])

 useEffect (() => {
    if (!name || !phone || !city) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.show();
    }
 }, [name,city,phone])

 const onChangeName = (e) =>{
    setName(e.target.value);
 }

 const onChangePhone = (e) =>{
    setPhone(e.target.value);
 }

 const onChangeCity = (e) =>{
    setCity(e.target.value);
 }


    return (
        <div className={"form"}>
            <h3>Введіть ваші данні</h3>
            <input type="text" className={'input'} placeholder={"Ім'я"} value={name} onChange={onChangeName} required />
            <input type="tel" className={'input'} placeholder={"Номер телефону"} value={phone} onChange={onChangePhone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
            <input type="text" className={'input'} placeholder={"Місто"} value={city} onChange={onChangeCity} required />
        </div>
    );
};

export default Form;