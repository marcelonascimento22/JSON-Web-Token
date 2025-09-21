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
    if (res.ok && body?.token) {
      localStorage.setItem('token', body.token);
      console.log(`✅ Login bem-sucedido para "${username}". Token armazenado.`);
      return body.token;
    }

    console.error(`❌ Falha no login para "${username}":`, res.status, body);
    return null;
  } catch (err) {
    console.error('Erro no fetch do login:', err);
    return null;
  }
}

async function acessarRotaProtegida() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('⚠️ Nenhum token encontrado. Testando acesso sem token...');
  }

  try {
    const res = await fetch(`${apiURL}/perfil`, {
      method: 'GET',
      headers: { 'Authorization': token ? `Bearer ${token}` : '' }
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

async function testarSuite() {
  console.log('\n--- Teste 1: acesso sem token ---');
  localStorage.removeItem('token');
  await acessarRotaProtegida();

  console.log('\n--- Teste 2: login correto ---');
  await login('user', 'senhaDificil');

  console.log('\n--- Teste 3: acesso com token válido ---');
  await acessarRotaProtegida();

  console.log('\n--- Teste 4: login incorreto ---');
  await login('usuario', 'senha123');

  console.log('\n--- Teste 5: acesso com token inválido ---');
  localStorage.setItem('token', 'token_invalido_simulado');
  await acessarRotaProtegida();

  console.log('\nFim da suite de testes.');
}

testarSuite();
