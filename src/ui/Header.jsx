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
  padding: 1.2rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Changed from flex-end to space-between */
  position: sticky;
  top: 0;
  z-index: 100;
  height: 7.2rem;
  gap: 2.6rem;

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
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
  display: block;
  margin-left: auto; /* Push to the right */

  &:hover {
    background-color: var(--color-grey-100);
  }

  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    padding: 0.3rem;
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
