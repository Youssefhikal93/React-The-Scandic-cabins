// import styled, { css } from "styled-components";

// const Form = styled.form`
//   ${(props) =>
//     props.type !== "modal" &&
//     css`
//       padding: 2.4rem 4rem;

//       /* Box */
//       background-color: var(--color-grey-0);
//       border: 1px solid var(--color-grey-100);
//       border-radius: var(--border-radius-md);
//     `}

//   ${(props) =>
//     props.type === "modal" &&
//     css`
//       width: 80rem;
//     `}

//   overflow: hidden;
//   font-size: 1.4rem;
// `;

// export default Form;
import styled, { css } from "styled-components";

const Form = styled.form`
  font-size: 1.4rem;
  overflow: auto;

  /* Base styles for all forms */
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 3.2rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      width: 100%;
      max-width: 100%;

      @media (max-width: 768px) {
        padding: 1.8rem 2.4rem;
      }

      @media (max-width: 480px) {
        padding: 1.2rem 1.6rem;
        border-radius: var(--border-radius-sm);
      }
    `}

  /* Modal-specific styles */
  ${(props) =>
    props.type === "modal" &&
    css`
      width: 100%;
      max-width: 80rem;
      padding: 2.4rem;

      @media (max-width: 900px) {
        max-width: 90vw;
        padding: 2rem;
      }

      @media (max-width: 600px) {
        max-width: 95vw;
        padding: 1.6rem;
      }

      @media (max-width: 480px) {
        padding: 1.2rem;
      }
    `}

  /* Responsive font sizes */
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export default Form;
