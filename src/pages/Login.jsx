import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { HiOutlineUserCircle, HiOutlineKey } from "react-icons/hi";
import { LuMessageSquareWarning } from "react-icons/lu";

// Styled components
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(auto, 48rem);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    var(--color-grey-50) 0%,
    var(--color-grey-100) 100%
  );

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 1rem;
  }
`;

const LoginContainer = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 4rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-grey-200);
  width: 100%;

  @media (max-width: 768px) {
    padding: 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const CredentialsBox = styled.div`
  background-color: var(--color-blue-50);
  border: 1px solid var(--color-blue-100);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  margin-bottom: 3.2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 2.5rem;
  }
`;

const CredentialItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: var(--color-blue-700);
    font-size: 1.8rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  span {
    flex: 1;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    gap: 0.8rem;

    svg {
      font-size: 1.6rem;
    }
  }
`;

function Login() {
  return (
    <LoginLayout>
      <LoginContainer>
        <Logo />
        <Heading as="h4" style={{ margin: "2rem 0 3.2rem" }}>
          Log in to your account
        </Heading>
        <LoginForm />
        <CredentialsBox>
          <Heading
            as="h5"
            style={{
              marginBottom: "1.6rem",
              color: "var(--color-blue-700)",
              fontSize: "clamp(1.4rem, 3vw, 1.6rem)", // Responsive font size
            }}
          >
            Test Credentials
          </Heading>
          <CredentialItem>
            <HiOutlineUserCircle />
            <span>
              <strong>Email:</strong> admin@scandic.com
            </span>
          </CredentialItem>
          <CredentialItem>
            <HiOutlineKey />
            <span>
              <strong>Password:</strong> test@123
            </span>
          </CredentialItem>
          <CredentialItem>
            <LuMessageSquareWarning />
            <span>
              <strong>Note:</strong> Modification mutates the database 😁
            </span>
          </CredentialItem>
        </CredentialsBox>
      </LoginContainer>
    </LoginLayout>
  );
}

export default Login;
