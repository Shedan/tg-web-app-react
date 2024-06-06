import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <img src={product.image} alt={product.title} className={'img'} />
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Вартість: <b>{product.price} грн</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Додати у кошик
            </Button>
        </div>
    );
};

export default ProductItem;