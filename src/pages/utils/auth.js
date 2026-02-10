// utils/auth.js

export const signup = (values) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const isExist = users.find(u => u.email === values.email);
  if (isExist) {
    throw new Error("Email already exists");
  }

  users.push({
    username: values.username,
    email: values.email,
    password: values.password,
  });

  localStorage.setItem("users", JSON.stringify(users));
};

export const login = (values) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.email === values.email && u.password === values.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
};
