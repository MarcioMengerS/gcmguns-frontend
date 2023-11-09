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
  //let response = await fetch('http://localhost:8080/auth/login', init);
  let response = await fetch('https://gcmsystem.up.railway.app/auth/login', init);
    // .then(res => res.text()).then(token => console.log(token));
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

// async function enviaCadastro(){
//   const username = document.getElementById("username");
//   const password = document.getElementById("password");

//   const nome = document.getElementById("logname");
//   const email = document.getElementById("logemail");
//   const numero = document.getElementById("lognum");

//   const user = {
//     username: username.value,
//     password: password.value,
//     gcm: {
//       nome: nome.value,
//       numero: Number(numero.value),
//       email: email.value 
//     }
//   }
//   const init ={
//     method: 'POST',
//     headers:{
//       "Content-Type":'application/json'
//     },
//     body: JSON.stringify(user)
//   }
//   //const response = await fetch('http://localhost:8080/auth/save', init);
//   const response = await fetch('https://gcmsystem.up.railway.app/auth/save', init);
//   //Link serve para ir para página de login
//   window.location.href = "/login.html";
// }