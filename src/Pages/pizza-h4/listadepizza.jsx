import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function listadepizza() {
const [pizza, setPizza] = useState([]);
const navigate = useNavigate();

useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pizzas` );
        setPizza(response.data.results);
      } catch (error) {
        console.error("Error fetching pizza", error);
      }
    };

    fetchPizza(); 
  }, []);

  





}