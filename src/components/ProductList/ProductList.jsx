import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import product1Image from "../../img/Alliofil-forte.png";
import product2Image from "../../img/immun.png";
import product3Image from "../../img/D3.png";
import product4Image from "../../img/Silimarol-Detox.png";
import product5Image from "../../img/Silimarol-Cholesterol.png";
import product6Image from "../../img/capsules.png";
import product7Image from "../../img/roztoropsha.png";
import product8Image from "../../img/Artichok.png";

const products = [
    {id: '1', image: product1Image,  title: 'Аліофіл Форте', price:  240, description: 'Традиційний лікарський засіб рослинного походження, що застосовується з профілактичною метою та має допоміжну дію при легких інфекціях верхніх дихальних шляхів (застуді).'},
    {id: '2', image: product2Image, title: 'Капсули для імунітету', price: 330, description: 'Гладка солодка підтримує імунну систему та заспокоює верхні дихальні шляхи. Вона має значні антиоксидантні властивості. Цинк і вітамін С допомагають у правильному функціонуванні імунної системи.Вітамін С допомагає захистити клітини від окисного стресу та сприяє зменшенню відчуття втоми та втомлюваності.'},
    {id: '3', image: product3Image, title: 'Вітамін D3', price: 155, description: 'Допомагає підтримувати здорові кістки та зуби, підтримує імунну систему. Вітамін D3 допомагає підтримувати здорові кістки, зуби та належний рівень кальцію в крові. Підтримує належне функціонування м’язової та імунної систем. Сприяє правильному засвоєнню та використанню кальцію і фосфору, а також бере участь у процесі поділу клітин.'},
    {id: '4', image: product4Image, title: 'Силімарол Детокс', price: 335, description: 'Підтримує функцію печінки в процесі детоксикації організму, підтримує фізіологічні процеси виведення води з організму. Силімарол Детокс – це композиція з 4-х компонентів: зелені хвоща польового, листя кропиви, листя берези та екстракту плодів розторопші плямистої. Поєднання цих рослин виводить токсини з організму, одночасно покращуючи обмін речовин. Збільшення об’єму води, що виводиться з організму, призводить до виведення шкідливих метаболітів з організму. Крім того, силімарин допомагає захистити клітини печінки.'},
    {id: '5', image: product5Image, title: 'Силімарол Холестерол', price: 355, description: 'Допомагає підтримувати нормальний рівень холестерину в організмі, підтримує нормальну роботу печінки. Безпечний для діабетиків. Активна дієтична добавка Силімарол® Холестерол створена на основі перевірених гомеопатичних інгредієнтів. Дія препарату базується на властивості артишоку пригнічувати біосинтез шкідливого холестерину і одночасно сприяє збільшенню частки корисного холестерину. Регулярне вживання цієї дієтичної добавки допомагає підтримувати рівень холестерину в крові. Крім того, силімарин допомагає захистити клітини печінки.'},
    {id: '6', image: product6Image, title: 'Капсули заспокійливі', price: 350, description: 'Меліса має розслаблюючу дію – допомагає заснути. Хміль допомагає заспокоїти нервову систему. Допомагає відновити самопочуття. Полегшує засинання і допомагає підтримувати хороший сон. Вітамін B6 допомагає в правильному функціонуванні нервової системи.'},
    {id: '7', image: product7Image, title: 'Розторопша плямиста', price: 543, description: 'Сприяє правильній роботі печінки та природним процесам її регенерації. Розторопша підтримує належну роботу печінки та природні процеси її регенерації. Захищає клітини печінки та тканин від окислювального пошкодження. Підтримує фізіологічне вироблення жовчі та процес травлення. Допомагає підтримувати належну концентрацію глюкози в крові.'},
    {id: '8', image: product8Image, title: 'Артишок справжній', price: 586, description: 'Артишок підтримує правильне функціонування травної системи та функції печінки. Збільшує вироблення жовчі та травного соків. Позитивно впливає на підтримання належного рівня холестерину та ліпідів у крові. Це впливає на контроль ваги.'},
]


const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купити ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;