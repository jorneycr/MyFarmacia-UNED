const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "Usuario registrado" });
    } catch (error) {
        console.error({error: error.message});
        res.status(500).json({ error: error.message });
    }
};

// Inicio de sesión de usuario
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign({ id: user._id }, 'LLAVESECRETA', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        console.error({error: error.message});
        res.status(500).json({ error: error.message });
    }
};
