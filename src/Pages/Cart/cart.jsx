import React, { useContext, useState } from 'react';
import { CounterContext } from '../../CounterContext';
import { UserContext } from '../../context/UserContext';

export default function Cart() {
  const { pizzaCart, increaseQuantity, decreaseQuantity } = useContext(CounterContext);
  const { token } = useContext(UserContext);
  
  // Declaración del estado para manejar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState(null);

  // Calcular el total del carrito
  const total = pizzaCart.reduce((acc, item) => acc + item.price * item.count, 0);

  // Función para enviar el carrito al backend
  const handlePayment = async () => {
    if (!token) {
      alert("Debes estar autenticado para realizar el pago.");
      return;
    }

    // Crear el objeto con los datos del carrito
    const cartData = {
      items: pizzaCart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.count,
      })),
      total,
    };

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error('Error al realizar el pago');
      }

      const result = await response.json();
      // Establecer el mensaje de éxito
      setSuccessMessage(`Pago exitoso: ${result.message}`);
      
    } catch (error) {
      alert(`Error al realizar el pago: ${error.message}`);
    }
  };

  return (
    <div className="cart">
      <h1>Tu Carrito de Compras</h1>
      <div className="cart-items">
        {pizzaCart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.img} alt={item.name} className="cart-item-img" />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.count}</p>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
      <h2>Total de la compra: ${total}</h2>

      {}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <button onClick={handlePayment} disabled={!token}>Pagar</button>
    </div>
  );
}
