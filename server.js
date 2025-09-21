// server.js
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carrega variáveis do .env

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'sua-chave-super-secreta';

// Middleware para interpretar JSON
app.use(express.json());

// --- Rota de login ---
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'user' && password === 'senhaDificil') {
    const user = { id: 1, username: 'usuario' };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// --- Middleware para verificar token ---
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (bearerHeader) {
    const bearerToken = bearerHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(bearerToken, SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: 'Token inválido' });
    }
  } else {
    res.status(401).json({ error: 'Token não fornecido' });
  }
}

// --- Rota protegida ---
app.get('/perfil', verifyToken, (req, res) => {
  res.json({
    mensagem: `Olá, ${req.user.username}! Seu perfil está acessível.`,
    usuario: req.user
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
