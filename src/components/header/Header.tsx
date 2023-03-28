import { FC } from "react";

import logo from "../../common/assets/images/logo.svg";

import style from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={style.header}>
      <div className={style.headerIconContainer}>
        <img className={style.headerIcon} src={logo} alt="logo" />
        <span className={style.title}>Энергия</span>
      </div>
    </header>
  );
};

export default Header;
