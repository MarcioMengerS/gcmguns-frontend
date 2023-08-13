async function cadastroEquipamento(){
    const marca = document.getElementById("brand");
    const calibre = document.getElementById("calibre");
    const categoria = document.getElementById("category");
    const numero = document.getElementById("number");
  
    const equipment = {
      brand: marca.value,
      calibre: calibre.value,
      category: categoria.value,
      number: Number(numero.value)
    }
    let myHeaders = new Headers;
    myHeaders.append("Content-Type","application/json");
    myHeaders.append("Authorization","Bearer "+ sessionStorage.getItem('token'));
    const init ={
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(equipment)
    }
    const response = await fetch('http://localhost:8080/equipment', init);
    const dados = await response.json();
    console.log(JSON.stringify(equipment));
    //Link serve para voltar a página de Listar EQUIPAMENTO
    window.location.href = "/listaequipamentos.html";
  }