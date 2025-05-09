import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";

function Navbar({ searchData }) {

  useEffect(() => {
    console.log("Navbar mounted");
  }, [])

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <Logo />
      </Link>
      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <Button className={styles.btnnav} text="Give Feedback">Give Feedback</Button>
    </nav>
  );
}

export default Navbar;
