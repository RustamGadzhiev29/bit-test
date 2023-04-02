import logo from "../../common/assets/images/logo.svg";

import style from "./Header.module.scss";

type Props = {
  children?: JSX.Element | null;
};

const Header = ({ children }: Props): JSX.Element => {
  return (
    <header className={style.header}>
      {children}
      <div className={style.headerIconContainer}>
        <img className={style.headerIcon} src={logo} alt="logo" />
        <span className={style.title}>Энергия</span>
      </div>
    </header>
  );
};

export default Header;
