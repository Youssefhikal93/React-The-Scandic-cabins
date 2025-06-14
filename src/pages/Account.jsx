import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
function Account() {
  return (
    <>
      {/* <Heading as="h1">Update your account</Heading> */}

      <Row>
        <Heading as="h3">Update user data</Heading>
      </Row>
      <UpdateUserDataForm />

      <Row>
        <Heading as="h3">Update password</Heading>
      </Row>
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
