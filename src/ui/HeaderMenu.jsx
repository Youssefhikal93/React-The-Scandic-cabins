import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  padding: 0.6rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <MenuItem>
        <Logout />
      </MenuItem>
      <MenuItem>
        <DarkModeToggle />
      </MenuItem>
      <MenuItem>
        <ButtonIcon
          onClick={() => navigate("/account")}
          style={{ color: "var(--color-brand-600)" }}
        >
          <HiOutlineUser size={20} />
        </ButtonIcon>
      </MenuItem>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
