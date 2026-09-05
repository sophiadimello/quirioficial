// Teste para verificar se o script.js está sendo carregado
console.log("SCRIPT.JS DO QUIRI FOI CARREGADO!");

// Seleciona o formulário de cadastro da nutricionista
const formulario = document.getElementById("formCadastroNutricionista");

// Seleciona o espaço onde vamos mostrar mensagens para o usuário
const mensagem = document.getElementById("mensagem");

// Identifica quando o formulário for enviado
formulario.addEventListener("submit", async function (evento) {

    // Impede que a página seja recarregada
    evento.preventDefault();

    // Pega os dados digitados no formulário
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const crn = document.getElementById("crn").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Organiza os dados que serão enviados ao backend
    const dados = {
        nome,
        cpf,
        telefone,
        crn,
        email,
        senha
    };

    try {

        // Envia os dados para o backend
        const resposta = await fetch("/api/nutricionista/cadastro", {
            method: "POST",

            // Informa que estamos enviando JSON
            headers: {
                "Content-Type": "application/json"
            },

            // Transforma os dados em JSON
            body: JSON.stringify(dados)
        });

        // Recebe a resposta do backend
        const resultado = await resposta.json();

        // Mostra a resposta no console
        console.log("Resposta do backend:", resultado);

 
        // Mostra a mensagem de sucesso
        mensagem.textContent = resultado.mensagem;

        // Depois de 1,5 segundo, volta para o login
setTimeout(function () {
window.location.href = "login.html";
}, 1500);
    } catch (erro) {

        // Mostra o erro no console
        console.error("Erro ao enviar cadastro:", erro);

        // Mostra uma mensagem para o usuário
        mensagem.textContent = "Erro ao conectar com o servidor.";
    }
});