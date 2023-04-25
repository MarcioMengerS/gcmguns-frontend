
//***************************************************************************************************//
//API busca preço dólar
fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
    .then(resposta =>{return resposta.json()}) //devolve conteúdo em forma de JSON
    .then(corpo => {
        console.log(corpo.USDBRL) //devolve todo conteúdo no console
        document.getElementById("nomeMoeda").innerHTML = corpo.USDBRL.name
        document.getElementById("moeda").innerHTML = corpo.USDBRL.code
        document.getElementById("valor").innerHTML = corpo.USDBRL.ask
    })
    .catch((error) => {console.log('Catch:', error)})
//****************************************************************************************************//
    //API busca CEP
function buscarCep(){
    let recebeCep =  document.getElementById("cepBuscar").value
    fetch('https://viacep.com.br/ws/'+recebeCep+'/json/')
        .then(resp => {return resp.json()}) //devolve conteúdo em forma de JSON
        .then(body => {
            console.log(body) //devolve conteúdo no console
            document.getElementById("cep").innerHTML = body.cep
            document.getElementById("rua").innerHTML = body.logradouro
            document.getElementById("bairro").innerHTML = body.bairro
        })
        .catch((error) => {
            console.log('Catch:', error);
            document.getElementById("cep").innerHTML = "CEP Inválido!: "+error.message
            //document.write("ERRO");
        })
}

//API busca dados GM/SAC do banco de dados e apresenta no HTML
function getGcm(){
    let numGM =  document.getElementById("numeroGM").value
    console.log("número do Guarda: "+numGM) //Visualiza no console o número do GM
    const url = 'http://localhost:8080/gcm/num/'+numGM
    axios.get(url)
    .then(response=> {
        const data = response.data
        console.log("Objeto GCM: "+response.data)
        //transforma de objeto JSON para string e apresenta na tela
        renderResults.textContent = JSON.stringify(data)
        console.log(data) //devolve conteúdo no console
        //retorna valor destinado a cada campo HTML
        nomeGcm.textContent = JSON.stringify(data.nome)
        numGcm.textContent = JSON.stringify(data.numero)
        nascGcm.textContent = JSON.stringify(data.dataNas)
        emailGcm.textContent = JSON.stringify(data.email)
        cpfGcm.textContent = JSON.stringify(data.cpf)
        admissGcm.textContent = JSON.stringify(data.dataAdmis)
        tagGcm.textContent = JSON.stringify(data.card.card)
    })
    .catch(error=> console.log(error))
    //busca idade do GCM
    fetch('http://localhost:8080/gcm/idade/'+numGM)
        .then(response => {return response.json()})
        .then(nInteiro => {
            console.log("idade do GCM: "+nInteiro)
            document.getElementById("idadeGcm").innerHTML = nInteiro
        })
        
}   