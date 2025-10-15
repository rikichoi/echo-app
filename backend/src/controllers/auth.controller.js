import User from "../models/User";
import bcrypt from "bcryptjs"

export async function signup(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const user = await User.findOne({email})
  if(user) return res.status(400).json({message: "Email already exists"})

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword
  })

  if(newUser){

  }else{
    res.status(400).json({message: "Invalid user data"})
  }

  res.send("Signup endpoint");
}
