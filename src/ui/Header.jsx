// import styled from "styled-components";

// const StyledHeader = styled.header`
//   background-color: var(--color-grey-0);
//   padding: 1.2rem 4.8rem;
//   border-bottom: 1px solid var(--color-grey-100);
// `;

// function Header() {
//   return (
//     <StyledHeader>
//       headerjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
//     </StyledHeader>
//   );
// }

// export default Header;

// ===== Header.js =====
import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 7.2rem; /* Fixed height for consistent layout */
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-grey-600);
  padding: 0.5rem;
  border-radius: 0.4rem;
  transition: background-color 0.2s;
  display: block; /* Show by default on mobile */

  &:hover {
    background-color: var(--color-grey-100);
  }

  /* Hide on medium screens and larger */
  @media (min-width: 768px) {
    display: none;
  }
`;

function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />

      <MenuButton onClick={toggleSidebar}>
        {isSidebarOpen ? "✕" : "☰"}
      </MenuButton>
    </StyledHeader>
  );
}

export default Header;
