import React, { useState, useEffect, useContext } from 'react';
import Header from './Header'
import CardPizza from './cardpizza'
import { CounterContext } from '../../CounterContext';

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart} = useContext(CounterContext);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pizzas');
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error al cargar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return <div>Cargando pizzas... (se necesita la api del Hito 4)</div>;
  }

  return (
<div>
 <Header/>
 <div className="home">
      <h1>Nuestras Pizzas</h1>
      <div className="pizza-list">
        {pizzas.map((pizza) => (
          <CardPizza
            key= {pizza.id}
            id={pizza.id}
            name={pizza.name}
            img={pizza.img}
            desc={pizza.desc}
            price={pizza.price}
            ingredients={pizza.ingredients}
            onAddToCart={() => addToCart(pizza)}
          />
          
        ))}
      </div>
    </div>

    </div>
  )
}
