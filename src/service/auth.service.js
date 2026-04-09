export async function loginService(req) {
  const user = {
    email: req.email,
    password: req.password,
  };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auths/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const loggedUser = await res.json();
    if (loggedUser.error == "unauthorized") {
      throw new Error("User does not exit!");
    }
    return loggedUser;
  } catch (error) {
    console.log("something error", error);
  }
}
