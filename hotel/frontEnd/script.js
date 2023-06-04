const form = document.querySelector('#QuartoForm')
const numeroInput = document.querySelector('#numeroInput')
const tipoInput = document.querySelector('#tipoInput')
const disponivelInput = document.querySelector('#disponivelInput')
const URL = 'http://localhost:8080/Reservas.php' 

const tableBody = document.querySelector('#QuartoTable')

function carregarQuartos() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(quartos => {
            tableBody.innerHTML = ''

            for (let i = 0; i < quartos.length; i++) {
                const tr = document.createElement('tr')
                const quarto = quartos[i]
                tr.innerHTML = `
                    <td>${quarto.id}</td>
                    <td>${quarto.numero}</td>
                    <td>${quarto.tipo}</td>
                    <td>${quarto.disponivel}</td>
                    <td>
                        <button data-id="${quarto.id}" onclick="atualizarQuarto(${quarto.id})">Editar</button>
                        <button data-id="${quarto.id}" onclick="excluirQuarto(${quarto.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

//função para criar um quarto
function adicionarQuarto(e) {

    e.preventDefault()

    const numero = numeroInput.value
    const tipo = tipoInput.value
    const disponivel = disponivelInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `numero=${encodeURIComponent(numero)}&tipo=${encodeURIComponent(tipo)}&disponivel=${encodeURIComponent(disponivel)}`
    })
        .then(response => {
            if (response.ok) {
                carregarQuartos()
                numeroInput.value = ''
                tipoInput.value = ''
                disponivelInput.value = ''
            } else {
                console.error('Erro ao add quartos')
                alert('Erro ao add quarto')
            }
        })
}


function atualizarQuarto(id){
    const novoNumero = prompt("digite o novo quarto")
    const novoTipo  = prompt("digite o tipo")
    const novoDisponivel    = prompt("digite o disponivel")

    if(novoNumero && novoDisponivel && novoTipo){
        fetch(`${URL}?id=${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-url-urlencoded'
            },
            body:`numero=${encodeURIComponent(novoNumero)}&tipo=${encodeURIComponent(novoTipo)}&disponivel=${encodeURIComponent(novoDisponivel)}`
        })
        .then (response => {
            if(response.ok){
                carregarQuartos()
            }else{
                console.error('Erro ao atualizar quarto')
                alert('erro ao atualizar quarto')
            }
        })
    }
}

function excluirQuarto(id){
    if(confirm('Deseja excluir a reserva do quarto ?')){
        fetch(`${URL}?id=${id}`,{
            method: 'DELETE'
        })
        .then(response =>{
            if(response.ok){
                carregarQuartos()
            }else{
                console.error('Erro ao excluir quarto')
                alert('Erro ao excluir quarto')
            }
        })
    }
}


form.addEventListener('submit', adicionarQuarto)

carregarQuartos() 