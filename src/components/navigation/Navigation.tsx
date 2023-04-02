import { FC } from "react";

import { Menu } from "antd";
import { Link } from "react-router-dom";

import { ReactComponent as MenuLogo } from "../../common/assets/images/menuLogo.svg";
import { useGetDevice } from "../../hooks/useGetDevice";

import style from "./Navigation.module.scss";

const items = [
  {
    label: (
      <Link to="/main">
        <MenuLogo className={style.navIcon} />
        <span className={style.title}>Панель</span>
      </Link>
    ),
    key: "main",
  },
];

const Navigation: FC = () => {
  const { isMobile } = useGetDevice();

  return (
    <div className={style.menuContainer}>
      <Menu
        style={
          isMobile
            ? { width: "100%", height: "100%", marginTop: 0 }
            : { width: 236, height: 45, marginTop: 34 }
        }
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Navigation;
