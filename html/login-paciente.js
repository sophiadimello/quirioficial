// Seleciona o formulário de login do paciente
const formularioLoginPaciente = document.getElementById("formLoginPaciente");

// Seleciona o local onde mostraremos as mensagens
const mensagemLoginPaciente = document.getElementById("mensagemLoginPaciente");

// Botão de entrar (pra travar durante o envio)
const botaoEntrarPaciente = document.getElementById("btnEntrarPaciente");

formularioLoginPaciente.addEventListener("submit", async function (evento) {

    // Impede que a página seja recarregada
    evento.preventDefault();

    // Pega o e-mail e a senha digitados
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Limpa estados de erro anteriores
    mensagemLoginPaciente.textContent = "";
    document.getElementById("emailWrap").classList.remove("field-error");
    document.getElementById("senhaWrap").classList.remove("field-error");

    // Trava o botão pra evitar duplo envio
    botaoEntrarPaciente.disabled = true;
    botaoEntrarPaciente.textContent = "Entrando...";

    try {

        // Envia os dados para o backend
        const resposta = await fetch("/api/paciente/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        // Recebe a resposta do backend
        const resultado = await resposta.json();

        console.log("Resposta do login:", resultado);

        if (resposta.ok) {

            // Login OK -> vai para o dashboard do paciente
            window.location.href = "dashboard-paciente.html";

        } else {

            document.getElementById("emailWrap").classList.add("field-error");
            document.getElementById("senhaWrap").classList.add("field-error");
            mensagemLoginPaciente.textContent = resultado.mensagem;
            botaoEntrarPaciente.disabled = false;
            botaoEntrarPaciente.textContent = "Entrar";
        }

    } catch (erro) {

        console.error("Erro ao fazer login:", erro);
        mensagemLoginPaciente.textContent = "Erro ao conectar com o servidor.";
        botaoEntrarPaciente.disabled = false;
        botaoEntrarPaciente.textContent = "Entrar";
    }
});
