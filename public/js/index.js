// login de usuario
const formLogin = document.getElementById('formLogin')
let emailLogin = document.getElementById('emailLogin')
let senhaLogin = document.getElementById('senhaLogin')
let alertMsgLogin = document.getElementById('alertMsgLogin')

formLogin.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    logar()
})

function logar(){
    let listaUsuariosCadastrados = buscarUsuarioStorage() 

    const encontrarUsuario = listaUsuariosCadastrados.find((valor)=> valor.email === emailLogin.value && valor.senha === senhaLogin.value)
    if(encontrarUsuario){
        localStorage.setItem('usuarioLogadoStorage' , JSON.stringify(encontrarUsuario))

           alertMsgLogin.innerHTML = 'Carregando...'

            setTimeout( () => {
                     location.href = 'recados.html'
            }, 2000);
    
    }else{
         alertMsgLogin.innerHTML = "<span style='color:red'> Dados incorretos. Tente de novo !!!!</span>";
         reset(alertMsgLogin)
    }
  }

function buscarUsuarioStorage() {
    return JSON.parse(localStorage.getItem('usuarioNoStorage') || '[]')
    
}
function reset(text) {
    setTimeout(() => {
        text.innerHTML = '';
        formLogin.reset();
    }, 2500);
}

