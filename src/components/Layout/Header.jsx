import meals from "../../assets/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

import styles from "./Header.module.css";

export default function Header({ onShow }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Header</h1>
        <HeaderCartButton onClick={onShow} />
      </header>
      <div className={styles.main_image_box}>
        <img src={meals} alt="meals on the table" />
      </div>
    </>
  );
}
