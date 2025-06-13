import { useNavigate } from "react-router-dom";
import { useAuthunticatedUser } from "../features/authentication/useAuthnticatedUser";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load the authniticated users
  const { isLoading, isAuthenticated } = useAuthunticatedUser();
  // if no authnticated users, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);
  // loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // if user
  return children;
}

export default ProtectedRoute;
