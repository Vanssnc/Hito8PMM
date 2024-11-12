import React, { createContext, useState } from 'react';
import { pizzaCart as initialPizzaCart } from './assets/js/pizzas';

export const CounterContext = createContext();

const CounterProvider = ({ children }) => {
  const [pizzaCart, setPizzaCart] = useState(initialPizzaCart);

  const addToCart = (newPizza) => {
    setPizzaCart((prevCart) => {
      const existingPizza = prevCart.find(item => item.id === newPizza.id);
      if (existingPizza) {
        return prevCart.map(item =>
          item.id === newPizza.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCart, { ...newPizza, count: 1 }]; // Añadir nueva pizza al carrito
      }
    });
  };


  const increaseQuantity = (id) => {
    setPizzaCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setPizzaCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      );
      return updatedCart.filter((item) => item.count > 0);
    });
  };

  const total = pizzaCart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <CounterContext.Provider value={{ pizzaCart, addToCart, increaseQuantity, decreaseQuantity, total }}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider; 