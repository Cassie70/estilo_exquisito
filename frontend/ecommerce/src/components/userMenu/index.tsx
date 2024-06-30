"use client";

import Box from "../Box";
import Card from "../Card";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import styled from "styled-components";
import { getTheme } from "@utils/utils";
import Typography, { Span } from "../Typography";
const StyledUserMenu = styled(Box)`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${getTheme("colors.body.paper")};
  box-shadow: ${getTheme("shadows.regular")};
  z-index: 1000;

  .nav-link {
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: ${getTheme("colors.primary.main")};
    }
  }
`;

type UserMenuProps = { menuOpen: boolean };

const userNavs = [
  { title: "Ver Perfil", url: "/profile" },
  { title: "Cerrar Sesión", url: "/logout" },
];

export default function UserMenu({ menuOpen }: UserMenuProps) {
  const renderMenuItems = (list: { title: string; url: string }[]) => {
    return list.map((item) => (
      <NavLink href={item.url} key={item.title}>
        <MenuItem>
          <Span className="nav-link">{item.title}</Span>
        </MenuItem>
      </NavLink>
    ));
  };

  return (
    menuOpen && (
      <StyledUserMenu>
        <Card borderRadius={8} py="0.5rem" boxShadow="large" minWidth="230px">
          <FlexBox flexDirection="column">{renderMenuItems(userNavs)}</FlexBox>
        </Card>
      </StyledUserMenu>
    )
  );
}
