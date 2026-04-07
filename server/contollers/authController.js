import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const alreadyExists = await User.findOne({ email });
    if (alreadyExists) return;
    res.status(400).json({ message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Account Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(500).json({ message: "User Already Exists" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(500).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user_id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user_name,
        email: user_email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
