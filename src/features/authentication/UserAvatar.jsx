import styled from "styled-components";
import { useAuthunticatedUser } from "./useAuthnticatedUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  min-width: 0; /* Important for text truncation */
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  flex-shrink: 0;
`;

const UserName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 15rem;

  @media (max-width: 768px) {
    max-width: 10rem;
  }

  @media (max-width: 480px) {
    display: none; /* Hide name on very small screens */
  }
`;

function UserAvatar() {
  const { user } = useAuthunticatedUser();
  const { fullName, avatar } = user.user_metadata;
  const displayName = fullName || user.email; // Fallback to email if no name

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${displayName}`}
      />
      <UserName>{displayName}</UserName>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
