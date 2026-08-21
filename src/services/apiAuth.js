import supabase from "./supabase";

// Guest accounts are created by the guest-facing website (Next app) with
// role: "guest" in their metadata. They share the same Supabase Auth pool
// as staff, so the management app must explicitly refuse them.
function isGuestAccount(user) {
  return user?.user_metadata?.role === "guest";
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
        role: "staff",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  // Add some basic validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(), // Remove any whitespace
    password,
  });

  if (error) {
    console.error("Login error:", error); // For debugging
    throw new Error(error.message);
  }

  // Guest-site accounts must never enter the management dashboard
  if (isGuestAccount(data?.user)) {
    await supabase.auth.signOut();
    throw new Error(
      "This is a guest account. It cannot access the management dashboard."
    );
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  // A guest session can appear here without going through login(): the
  // signup confirmation email carries an access token in the URL, and the
  // supabase client picks it up automatically. Kill such sessions on sight.
  if (isGuestAccount(data?.user)) {
    await supabase.auth.signOut();
    return null;
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  // update the password or the fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  //upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // update vatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://mmxpwidggqxudejlgpxh.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    throw new Error(storageError.error2);
  }

  return updatedUser;
}
