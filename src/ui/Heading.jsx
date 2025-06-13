import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      margin-bottom: 3.2rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
2    `}

${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
2    `}

${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
2    `}

  line-height:1.4rem;
`;

export default Heading;
