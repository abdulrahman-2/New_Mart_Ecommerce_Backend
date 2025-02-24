import jwt from "jsonwebtoken";

export const generateTokens = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { token };
};
