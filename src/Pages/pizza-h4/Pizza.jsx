import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardPizza from '../Home/cardpizza';


export default function Pizza() {
const {id} = useParams();
const [pizza, setPizza] = useState(null); 
const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      const fetchPizza = async () => {
        try {
          const response = await fetch(` http://localhost:5000/api/pizzas/${id} ` );
          const data = await response.json();
          setPizza(data);
        } catch (error) {
          console.error('Error al cargar:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPizza(); 
    }, [id]);  
  
    if (loading) {
      return <div>Cargando pizzas...</div>;}

    if (!pizza) {
        return <div>No se encontró la pizza.</div>;
    }

    


  return (
    
        <div className="pizza-list">
          <CardPizza
            id={pizza.id}
            name={pizza.name}
            img={pizza.img}
            desc={pizza.desc}
            price={pizza.price}
            ingredients={pizza.ingredients || []}
            
          />
      </div>
  )
}