
//API busca preço dólar
fetch('https://economia.awesomeapi.com.br/last/USD-BRL')
    .then(resposta =>{return resposta.json()}) //devolve conteúdo em forma de JSON
    .then(corpo => {
        console.log(corpo.USDBRL) //devolve todo conteúdo no console
        document.getElementById("moeda").innerHTML = corpo.USDBRL.code
        document.getElementById("valor").innerHTML = corpo.USDBRL.high
    })
//API busca CEP
fetch('https://viacep.com.br/ws/01001000/json/')
    .then(resp => {return resp.json()}) //devolve conteúdo em forma de JSON
    .then(body => {
        console.log(body) //devolve conteúdo no console
        document.getElementById("cep").innerHTML = body.cep
        document.getElementById("rua").innerHTML = body.logradouro
    })

//API solicita dados GM/SAC do banco de dados




function getGcm(){
    let numGM =  document.getElementById("numeroGM").value
    console.log(numGM)
    const url = 'http://localhost:8080/'+numGM
    axios.get(url)
    .then(response=> {
        const data = response.data
        renderResults.textContent = JSON.stringify(data)//transforma de objeto para string
        console.log(data) //devolve conteúdo no console
        nomeGcm.textContent = JSON.stringify(data.nome)
        numGcm.textContent = JSON.stringify(data.numero)
        nascGcm.textContent = JSON.stringify(data.dataNas)
        emailGcm.textContent = JSON.stringify(data.email)
        cpfGcm.textContent = JSON.stringify(data.cpf)
        admissGcm.textContent = JSON.stringify(data.dataAdmis)
    })
    .catch(error=> console.log(error))
}
//getGcm()

//API de Cadastro de GCM
function postNewGcm(){

}