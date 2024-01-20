function confirmPassword(){
  const formulario = document.querySelector('#identity');
  formulario.style.visibility = 'hidden';
  const avisos = document.querySelector('#teste');
  avisos.innerHTML = "AGORA, Aproxime o cartão do leitor";
}