// import styled from "styled-components";

// const StyledLogo = styled.div`
//   text-align: center;
// `;

// const Img = styled.img`
//   height: 9.6rem;
//   width: auto;
// `;

// function Logo() {
//   return (
//     <StyledLogo>
//       <Img src="/logo-light.png" alt="Logo" />
//     </StyledLogo>
//   );
// }

// export default Logo;
import styled from "styled-components";
import { useDarkMode } from "../Context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: auto;
  width: 50%;
  /* width: ${(props) => (props.$isSidebarOpen ? "100%" : "4.6rem")}; */
  /* transition: all 0.3s; */
`;

function Logo({ isSidebarOpen }) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/logo-lightV1.png" : "/logo-darkV1.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" $isSidebarOpen={isSidebarOpen} />
    </StyledLogo>
  );
}

export default Logo;
