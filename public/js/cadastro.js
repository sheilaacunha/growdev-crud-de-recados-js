// cadastro do ususario

const formCadastro = document.getElementById('formCadastro')
let emailCadastro = document.getElementById('emailCadastro')
let senhaCadastro = document.getElementById('senhaCadastro')
let senhaCadastroConfirmacao = document.getElementById('senhaCadastroConfirmacao')
let alertaMsgCadastro = document.getElementById('alertaMsgCadastro')

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault()

    let camposValidos = validarCampo();

    if (camposValidos) {
        criarUsuario();
    }

})

function validarCampo() {
    if (senhaCadastro.value !== senhaCadastroConfirmacao.value) {
        alertaMsgCadastro.innerHTML = "<span style='color:red'>Senhas não conferem. Tente de novo !!!!</span>";

        reset(alertaMsgCadastro)
        return false
    }
    return true
}
function criarUsuario() {
    let listaUsuariosCadastrados = buscarUsuarioStorage()

    let verificarEmail = listaUsuariosCadastrados.some((valor) => valor.email === emailCadastro.value)

    if (verificarEmail) {
        alertaMsgCadastro.innerHTML = "<span style='color:red'>Tente outro E-mail, pois esse já está cadastrado !!!</span>"
        reset(alertaMsgCadastro)
        return
    }

    let novoUsuario = {
        email: emailCadastro.value,
        senha: senhaCadastro.value,
        recados: []
    }
    listaUsuariosCadastrados.push(novoUsuario)
    salvarUsuarioStorage(listaUsuariosCadastrados)
    formCadastro.reset();
    alertaMsgCadastro.innerHTML = '<span>Cadastro Criado com sucesso!!!!<br> Faça seu login para acessar seu Sistema de Recados.</span>';
    reset(alertaMsgCadastro)
    console.log('criarUsuario', listaUsuariosCadastrados);
}


function buscarUsuarioStorage() {
    return JSON.parse(localStorage.getItem('usuarioNoStorage') || '[]')

}

function salvarUsuarioStorage(novoCadastro) {
    localStorage.setItem('usuarioNoStorage', JSON.stringify(novoCadastro))

}
function reset(text) {
    setTimeout(() => {
        text.innerHTML = '';
    }, 2500);
}
