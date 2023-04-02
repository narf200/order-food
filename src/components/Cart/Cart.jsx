import { useContext } from "react";
import CartContext from "../../store/cartContext";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

export default function Cart({ onHide }) {
  const { items, totalAmount, addItem, removeItem, clearCart } =
    useContext(CartContext);
  const formatedTotalAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartAddItemHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };
  const cartRemoveItemHandler = (id) => {
    removeItem({ id: id });
  };
  const cartClearItemHandler = () => {
    clearCart();
  };

  const cartItems = (
    <ul className={styles.cart_items}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartAddItemHandler.bind(null, item)}
          onRemove={cartRemoveItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHide={onHide}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{formatedTotalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={onHide} className={styles.button_alt}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
        {hasItems && (
          <button
            onClick={cartClearItemHandler.bind(null)}
            className={styles.button_clear}
          >
            Clear
          </button>
        )}
      </div>
    </Modal>
  );
}
