import User from "../models/User.js";

async function handleUserSighup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.render("Home");
}

export { handleUserSighup };
