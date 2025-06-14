import styled from "styled-components";
import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useEffect, useState } from "react";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-grey-50) 0%,
    var(--color-grey-100) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 4.8rem;
  max-width: 60rem;
  width: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    background: linear-gradient(
      90deg,
      var(--color-brand-500),
      var(--color-brand-300)
    );
  }

  & h1 {
    margin-bottom: 2.4rem;
    color: var(--color-grey-800);
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    padding: 3.2rem 2.4rem;
  }
`;

const ErrorCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 3.2rem;
`;

const Number = styled.span`
  font-size: 4rem;
  font-weight: 600;
  font-family: "Courier New", monospace;
  color: var(--color-brand-600);
  min-width: 8rem;
  text-align: center;
  transition: all 0.3s ease-out;

  @media (max-width: 768px) {
    font-size: 6rem;
    min-width: 6rem;
  }
`;

const WarningIcon = styled.span`
  font-size: 6rem;
  color: var(--color-yellow-700);
  margin-right: 1.6rem;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Description = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey-600);
  margin-bottom: 3.2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();
  const [numbers, setNumbers] = useState(["5", "0", "8"]); // Starting with random numbers

  useEffect(() => {
    // Animation to change numbers randomly before settling on 404
    const intervals = [];

    [0, 1, 2].forEach((i) => {
      const interval = setInterval(() => {
        setNumbers((prev) => {
          const newNumbers = [...prev];
          newNumbers[i] = Math.floor(Math.random() * 10).toString();
          return newNumbers;
        });
      }, 100 + i * 50); // Stagger the animations

      intervals.push(interval);
    });

    // After 1.5 seconds, set to 404
    const timeout = setTimeout(() => {
      intervals.forEach((interval) => clearInterval(interval));
      setNumbers(["4", "0", "4"]);
    }, 1500);

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
      clearTimeout(timeout);
    };
  }, []);

  return (
    <StyledPageNotFound>
      <Box>
        <ErrorCode>
          <WarningIcon>⚠️</WarningIcon>
          <Number>{numbers[0]}</Number>
          <Number>{numbers[1]}</Number>
          <Number>{numbers[2]}</Number>
        </ErrorCode>
        <Heading as="h1">
          Oops! The page you're looking for doesn't exist.
        </Heading>
        <Description>
          The page may have been moved, deleted, or perhaps you mistyped the
          address. Let's get you back to where you came from.
        </Description>
        <Button onClick={moveBack} size="large" variation="primary">
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
