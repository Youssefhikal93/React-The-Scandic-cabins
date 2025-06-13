// import styled from "styled-components";
// import Logo from "./Logo";
// import MainNav from "./MainNav";

// const StyledSidebar = styled.aside`
//   background-color: var(--color-grey-0);
//   padding: 3.2rem 2.4rem;
//   border-right: 1px solid var(--color-grey-100);

//   grid-row: 1/-1;
//   display: flex;
//   flex-direction: column;
//   gap: 3.2rem;
// `;

// function Sidebar() {
//   return (
//     <StyledSidebar>
//       <Logo />
//       <MainNav />
//     </StyledSidebar>
//   );
// }

// export default Sidebar;

// ===== Sidebar.js =====
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { forwardRef } from "react";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside.attrs(() => ({}))`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 200;
  overflow-y: auto;

  /* Desktop sidebar */
  @media (min-width: 768px) {
    width: ${(props) => (props.$isOpen ? "20rem" : "6rem")};
    transition: width 0.3s ease;
  }

  @media (min-width: 1024px) {
    width: ${(props) => (props.$isOpen ? "26rem" : "8rem")};
  }

  /* Mobile sidebar */
  @media (max-width: 767px) {
    left: ${(props) => (props.$isOpen ? "0" : "-100%")};
    width: 26rem;
    transition: left 0.3s ease;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 150;
  display: ${(props) => (props.$show ? "block" : "none")};

  @media (min-width: 768px) {
    display: none;
  }
`;

// Use forwardRef to expose sidebar DOM node to parent
const Sidebar = forwardRef(({ isOpen, onOverlayClick }, ref) => {
  return (
    <>
      <Overlay $show={isOpen} onClick={onOverlayClick} />
      <StyledSidebar ref={ref} $isOpen={isOpen}>
        <Logo />
        <MainNav />
        <Uploader />
      </StyledSidebar>
    </>
  );
});

export default Sidebar;
