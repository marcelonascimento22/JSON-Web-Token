# JSON-Web-Token
🚀JSON Web Token



A autenticação JWT (JSON Web Token) em APIs REST é um método seguro e sem estado para verificar a identidade de um cliente, garantindo que as solicitações feitas ao servidor sejam válidas e autorizadas. Diferente de sistemas baseados em sessões, que armazenam informações no servidor, o JWT armazena as informações do usuário em um token que é enviado a cada requisição. 



O processo de autenticação com JWT segue um fluxo definido:

1 - Login do usuário: O cliente envia suas credenciais (nome de usuário e senha) para um endpoint de autenticação da API.

2 - Verificação e criação do token: O servidor valida as credenciais. Se forem corretas, ele gera um JWT, que contém informações sobre o usuário (conhecidas como "claims"), e assina o token com uma chave secreta.

3 - Envio do token ao cliente: O servidor envia o JWT de volta ao cliente na resposta da requisição de login.

4 - Armazenamento do token: O cliente armazena o token de forma segura (por exemplo, no localStorage do navegador).

5 - Solicitações protegidas: Para acessar recursos protegidos, o cliente inclui o JWT no cabeçalho Authorization de todas as requisições subsequentes, geralmente no formato Bearer <token>.

6 - Validação pelo servidor: O servidor recebe a requisição com o token e valida a assinatura usando a chave secreta. Se a assinatura for válida e o token não estiver expirado, a requisição é processada.



Saiba mais em https://marcelonascimento.ct.ws/index.php/2025/09/21/json-web-token/



#Backend #DevSecOps #DicasDeProgramação
