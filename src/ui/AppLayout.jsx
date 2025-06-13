// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import styled from "styled-components";

// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 2rem 1.6rem 4rem;
//   overflow: auto;

//   @media (min-width: 768px) {
//     padding: 3rem 3.2rem 5rem;
//   }

//   @media (min-width: 1024px) {
//     padding: 4rem 4.8rem 6.4rem;
//   }
// `;

// const StyledAppLayout = styled.div`
//   display: grid;
//   height: 100vh;
//   grid-template-rows: auto 1fr;

//   @media (min-width: 768px) {
//     grid-template-columns: 20rem 1fr;
//     grid-template-rows: auto 1fr;
//   }

//   @media (min-width: 1024px) {
//     grid-template-columns: 26rem 1fr;
//   }
// `;

// const Container = styled.div`
//   max-width: 120rem;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   gap: 2.4rem;
//   width: 100%;

//   @media (min-width: 768px) {
//     gap: 3.2rem;
//   }
// `;
// function AppLayout() {
//   return (
//     <StyledAppLayout>
//       <Header />
//       <Sidebar />
//       <Main>
//         <Container>
//           <Outlet />
//         </Container>
//       </Main>
//     </StyledAppLayout>
//   );
// }

// export default AppLayout;

import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const ContentArea = styled.main`
  flex: 1;
  background-color: var(--color-grey-50);
  overflow-y: auto;
  overflow-x: hidden;
  transition: margin-left 0.3s ease;

  margin-left: 0;

  @media (min-width: 768px) {
    margin-left: ${(props) => (props.$isSidebarOpen ? "26rem" : "8rem")};
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 2rem 1.6rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  min-height: calc(100vh - 7.2rem);

  @media (min-width: 768px) {
    padding: 3rem 3.2rem 5rem;
    gap: 3.2rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 4.8rem 6.4rem;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const isMobile = window.innerWidth < 768;
    return !isMobile; // open on desktop, closed on mobile
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobile &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    }
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <StyledAppLayout>
      <Header
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        onOverlayClick={closeSidebar}
        isOpen={isSidebarOpen}
      />
      <MainContent>
        <Sidebar ref={sidebarRef} isOpen={isSidebarOpen} isMobile={isMobile} />
        <ContentArea $isSidebarOpen={isSidebarOpen}>
          <Container>
            <Outlet />
          </Container>
        </ContentArea>
      </MainContent>
    </StyledAppLayout>
  );
}

export default AppLayout;
