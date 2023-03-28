import { FC, ReactElement } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import style from "./Navigation.module.scss";

const MenuSvg = (): ReactElement<any, any> => (
  <svg
    width="25"
    height="26"
    viewBox="0 0 25 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 5.5C0 6.05228 0.447715 6.5 1 6.5H5.25C5.80228 6.5 6.25 6.05228 6.25 5.5V1C6.25 0.447715 5.80228 0 5.25 0H1C0.447715 0 0 0.447715 0 1V5.5ZM9.375 25C9.375 25.5523 9.82271 26 10.375 26H14.625C15.1773 26 15.625 25.5523 15.625 25V20.5C15.625 19.9477 15.1773 19.5 14.625 19.5H10.375C9.82272 19.5 9.375 19.9477 9.375 20.5V25ZM0 25C0 25.5523 0.447715 26 1 26H5.25C5.80228 26 6.25 25.5523 6.25 25V20.5C6.25 19.9477 5.80228 19.5 5.25 19.5H1C0.447715 19.5 0 19.9477 0 20.5V25ZM0 15.25C0 15.8023 0.447715 16.25 1 16.25H5.25C5.80228 16.25 6.25 15.8023 6.25 15.25V10.75C6.25 10.1977 5.80228 9.75 5.25 9.75H1C0.447715 9.75 0 10.1977 0 10.75V15.25ZM9.375 15.25C9.375 15.8023 9.82271 16.25 10.375 16.25H14.625C15.1773 16.25 15.625 15.8023 15.625 15.25V10.75C15.625 10.1977 15.1773 9.75 14.625 9.75H10.375C9.82272 9.75 9.375 10.1977 9.375 10.75V15.25ZM19.75 0C19.1977 0 18.75 0.447715 18.75 1V5.5C18.75 6.05228 19.1977 6.5 19.75 6.5H24C24.5523 6.5 25 6.05228 25 5.5V1C25 0.447715 24.5523 0 24 0H19.75ZM9.375 5.5C9.375 6.05228 9.82271 6.5 10.375 6.5H14.625C15.1773 6.5 15.625 6.05228 15.625 5.5V1C15.625 0.447715 15.1773 0 14.625 0H10.375C9.82272 0 9.375 0.447715 9.375 1V5.5ZM18.75 15.25C18.75 15.8023 19.1977 16.25 19.75 16.25H24C24.5523 16.25 25 15.8023 25 15.25V10.75C25 10.1977 24.5523 9.75 24 9.75H19.75C19.1977 9.75 18.75 10.1977 18.75 10.75V15.25ZM18.75 25C18.75 25.5523 19.1977 26 19.75 26H24C24.5523 26 25 25.5523 25 25V20.5C25 19.9477 24.5523 19.5 24 19.5H19.75C19.1977 19.5 18.75 19.9477 18.75 20.5V25Z"
      fill="#005FB8"
    />
  </svg>
);

const MenuIcon = (
  props: Partial<CustomIconComponentProps>
): ReactElement<any, any> => <Icon component={MenuSvg} {...props} />;

const items = [
  {
    label: (
      <Link to="/main">
        <MenuIcon className={style.navIcon} />
        <span className={style.title}>Панель</span>
      </Link>
    ),
    key: "main",
  },
];

const Navigation: FC = () => {
  return (
    <div className={style.menuContainer}>
      <Menu
        style={{ width: 236, height: 45, marginTop: 34 }}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Navigation;