import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cartContext";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

export default function HeaderCartButton({ onClick }) {
  const { items } = useContext(CartContext);
  const [isButtonBumped, setIsButtonBumped] = useState(false);

  const numberOfCartItem = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const buttonClassName = `${styles.button} ${
    isButtonBumped ? styles.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsButtonBumped(true);

    const timer = setTimeout(() => {
      setIsButtonBumped(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={onClick} className={buttonClassName}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={styles.badge}>{numberOfCartItem}</span>
    </button>
  );
}
