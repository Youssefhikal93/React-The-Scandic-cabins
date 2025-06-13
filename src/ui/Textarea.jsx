import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-width: 16.6rem;
  min-height: 10rem;
  font-size: 1.6rem;
  line-height: 1.5;
  resize: vertical;

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    min-height: 12rem; /* Taller on mobile for better UX */
    font-size: 1.6rem; /* Slightly larger text for mobile */
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
`;

export default Textarea;
