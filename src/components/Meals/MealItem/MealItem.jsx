import { useContext } from "react";
import CartContext from "../../../store/cartContext";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export default function MealItem({ id, name, description, price }) {
  const { addItem } = useContext(CartContext);
  const formatPrice = `$${price.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
    addItem({
      id: id,
      name: name,
      amount: amount,
      price: price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{formatPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCat={onAddToCartHandler} />
      </div>
    </li>
  );
}
