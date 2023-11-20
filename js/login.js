import { dominio } from "../modules/dominio.js";
//evento ocorre após inserir dados de acesso e clicar enter
document.addEventListener("keypress", function(e){
  if(e.key === 'Enter'){
    enviaLogin();
  }
});
async function enviaLogin(){
  const username = document.getElementById("username").value;
  const senha = document.getElementById("password").value;
  const init ={
    method: 'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({login: username, password: senha})
  }

  let response = await fetch(dominio+'/auth/login', init);
  if(response.status == 200){
    //armazenando token session do navegador
    response.text().then(token => sessionStorage.setItem('token',token));
    location.href = "/index.html";
  }else{
    alert("usuário ou senha inválido!");
    //Limpa campos de login e senha
    const login = document.querySelector('#username');
    login.value = '';
    const senha = document.querySelector('#password');
    senha.value = '';
  }
}