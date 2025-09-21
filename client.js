// teste.js
import fetch from 'node-fetch';
import { LocalStorage } from 'node-localstorage';

// Configura localStorage persistente
const localStorage = new LocalStorage('./local_storage');

const apiURL = 'http://localhost:3000';

async function login(username, password) {
  try {
    const res = await fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const body = await res.json().catch(() => null);
    if (res.ok && body && body.token) {
      localStorage.setItem('token', body.token);
      console.log('✅ Login bem-sucedido. Token armazenado.');
      return body.token;
    }

    console.error('❌ Falha no login:', res.status, body);
    return null;
  } catch (err) {
    console.error('Erro no fetch do login:', err);
    return null;
  }
}

async function acessarRotaProtegida() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('⚠️ Nenhum token encontrado. Faça o login primeiro.');
    return;
  }

  try {
    const res = await fetch(`${apiURL}/perfil`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const body = await res.json().catch(() => null);
    if (res.ok) {
      console.log('✅ Acesso concedido:', body);
    } else {
      console.error('❌ Acesso negado:', res.status, body);
    }
  } catch (err) {
    console.error('Erro no fetch da rota protegida:', err);
  }
}

async function run() {
  console.log('--- Tentando acessar sem token ---');
  await acessarRotaProtegida();

  console.log('\n--- Fazendo login (credenciais corretas) ---');
  await login('user', 'senhaDificil'); // ajuste conforme seu backend

  console.log('\n--- Tentando acessar com token ---');
  await acessarRotaProtegida();

  console.log('\n--- Fazendo login com credenciais inválidas ---');
  await login('usuario', 'senha123');

  console.log('\nFim do teste');
}

run();
