import React from 'react';
import { Link } from 'react-router-dom';

export default function CardPizza({ id, name, img, desc, price, ingredients, onAddToCart }) {

          return (
            <div className="pizza-card">
              <img src={img} alt={name} className="pizza-img" />

              <Link to={`/pizza/${id}`}>
                <h2>{name}</h2>
              </Link>
              
              <p>{desc}</p>
              <h3>Precio: ${price}</h3>
              <h4>Ingredientes:</h4>
              <ul>
              
              {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
              </ul>
              <button onClick={onAddToCart}>Añadir al carrito</button>
            </div>
          );
        }