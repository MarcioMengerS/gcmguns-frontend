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
    const init ={
      method: 'POST',
      headers:{
        "Content-Type":'application/json'
      },
      body: JSON.stringify(equipment)
    }
    const response = await fetch('http://localhost:8080/equipment', init);
    const dados = await response.json();
    console.log(JSON.stringify(equipment));
    //Link serve para voltar a página Lista EQUIPAMENTO
    window.location.href = "/listaequipamentos.html";
  }