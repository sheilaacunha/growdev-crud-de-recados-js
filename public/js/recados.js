const formSalvar = document.getElementById('formSalvar')
let inputDescricao = document.getElementById('inputDescricao')
let inputDetalhes = document.getElementById('inputDetalhes')

let bodyRecados = document.getElementById('bodyRecados')
let nomeUsuarioLogadoHtml = document.getElementById('nomeUsuarioLogadoHtml')
let idRecado = document.getElementById('idRecado')


let buttonSair = document.getElementById('buttonSair')

const usuarioLogado = buscarUsuarioLogado()

let idEditar = -1

let botaoEditar = false

document.addEventListener('DOMContentLoaded', (() => {
    if (!usuarioLogado) {
        alert('Você precisa estar logado para acessar essa página')
        window.location.href = 'index.html'
    }

    nomeUsuarioLogadoHtml.innerHTML = usuarioLogado.email

    usuarioLogado.recados.forEach((recado) => recadosNoHtml(recado))

}))

formSalvar.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!botaoEditar) {
        criarRecados()
    }

})

function dataAtual() {
    let data = new Date().toLocaleDateString('pt-BR', { dateStyle: 'short' });
    return data

}
function criarRecados() {



    let indiceMaior = usuarioLogado.recados.reduce((acc, next) => {
        if (acc > next.id) {
            console.log(acc)
            return acc.id
        }
        return next.id
    }, 0)

    let id = indiceMaior ? indiceMaior + 1 : 1;

    const novoRecado = {
        id,
        data: dataAtual(),
        descricao: inputDescricao.value,
        detalhes: inputDetalhes.value
    }
    usuarioLogado.recados.push(novoRecado)
    atualizarUsuarioLogadoStorage(usuarioLogado)
    alert('Recado Lançado !!!')
    formSalvar.reset()
    recadosNoHtml(novoRecado)
    console.log(usuarioLogado.recados);

}

function recadosNoHtml(novoRecado) {


    const trTable = document.createElement('tr')
    trTable.setAttribute('id', `${novoRecado.id}`)
    trTable.classList.add('linha-tr')

    const tdIdRecados = document.createElement('td')
    tdIdRecados.innerHTML = `${novoRecado.id}`

    const tdData = document.createElement('td')
    tdData.innerHTML = novoRecado.data

    const tdDescricao = document.createElement('td')
    tdDescricao.innerHTML = novoRecado.descricao

    const tdDetalhes = document.createElement('td')
    tdDetalhes.innerHTML = novoRecado.detalhes

    const tdBotoes = document.createElement('td')

    const buttonEditar = document.createElement('button');
    buttonEditar.setAttribute('class', 'button-editar', 'btn');
    buttonEditar.innerText = 'editar';
    buttonEditar.addEventListener('click', () => {
        editar(novoRecado)
    });

    const buttonExcluir = document.createElement('button');
    buttonExcluir.setAttribute('class', 'button-apagar', 'btn');
    buttonExcluir.innerText = 'apagar';
    buttonExcluir.addEventListener('click', () => {
        apagar(novoRecado.id)
    });

    trTable.appendChild(tdIdRecados);
    trTable.appendChild(tdData);
    trTable.appendChild(tdDescricao);
    trTable.appendChild(tdDetalhes);
    tdBotoes.appendChild(buttonEditar);
    tdBotoes.appendChild(buttonExcluir);
    trTable.appendChild(tdBotoes);

    bodyRecados.appendChild(trTable)
}

buttonSair.addEventListener('click', sair)

function sair() {
    atualizarUsuarioNoStorage()
    localStorage.removeItem('usuarioLogadoStorage')
    window.location.href = 'index.html'
}

function buscarUsuarioLogado() {
    // localstorage logado
    return JSON.parse(localStorage.getItem('usuarioLogadoStorage'));
}

function buscarUsuariosStorage() {
    // localsorage geral
    return JSON.parse(localStorage.getItem('usuarioNoStorage') || "[]");
}
function atualizarUsuarioLogadoStorage(dados) {
    localStorage.setItem('usuarioLogadoStorage', JSON.stringify(dados))

}
function atualizarUsuarioNoStorage() {
    const usuario = JSON.parse(localStorage.getItem('usuarioNoStorage'))
    usuario.forEach((valor) => {
        if (valor.email === buscarUsuarioLogado().email) {
            valor.recados = buscarUsuarioLogado().recados
        }
    })
    localStorage.setItem('usuarioNoStorage', JSON.stringify(usuario))

}
function apagar(id) {

    const indiceEncontrado = usuarioLogado.recados.findIndex((recado) => recado.id === id)

    if (confirm(`Deseja realmente excluir o recado ${id} ?🤔 `)) {
        let trRecadosExcluir = document.getElementById(id)
        trRecadosExcluir.remove()
        usuarioLogado.recados.splice(indiceEncontrado, 1)
        atualizarUsuarioLogadoStorage(usuarioLogado)
    } else {
        alert('Recado não exluido 😁😉 .')
    }
}

function editar(recado) {
    console.log(recado.id);
    idEditar = recado.id

    botaoEditar = true;

    inputDescricao.value = recado.descricao
    inputDetalhes.value = recado.detalhes

}

formSalvar.addEventListener('submit', (ev) => {
    ev.preventDefault();

    if (botaoEditar) {

        const recadoEditado = {
            id: idEditar,
            descricao: inputDescricao.value,
            detalhes: inputDetalhes.value,
        }

        const indiceEditado = usuarioLogado.recados.findIndex((recado) => recado.id === idEditar);

        usuarioLogado.recados[indiceEditado].descricao = recadoEditado.descricao;
        usuarioLogado.recados[indiceEditado].detalhes = recadoEditado.detalhes;
        atualizarUsuarioLogadoStorage(usuarioLogado)

        bodyRecados.innerHTML = ''
        usuarioLogado.recados.forEach((recado) => recadosNoHtml(recado))
        formSalvar.reset()
    }
    botaoEditar = false

})