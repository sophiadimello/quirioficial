// Formulário de cadastro do paciente
const formularioPaciente =
    document.getElementById("formCadastroPaciente");

// Mensagem geral
const mensagemPaciente =
    document.getElementById("mensagemPaciente");

// Botão de cadastrar (pra travar durante o envio)
const botaoCadastrarPaciente =
    document.getElementById("btnCadastrarPaciente");


// Quando o paciente clicar em Cadastrar
formularioPaciente.addEventListener("submit", async function (evento) {

    // Impede o navegador de recarregar a página
    evento.preventDefault();

    // Pega os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    // Limpa mensagens e estados de erro anteriores
    mensagemPaciente.textContent = "";
    mensagemPaciente.className = "mensagem-cadastro";
    document.getElementById("confirmarSenhaWrap").classList.remove("field-error");
    document.getElementById("erroConfirmarSenha").classList.remove("show");

    // Verifica nome
    if (nome.length < 3) {
        mostrarErro("Digite seu nome completo.");
        document.getElementById("nome").focus();
        return;
    }

    // Verifica CPF
    if (cpf.length < 11) {
        mostrarErro("Digite um CPF válido.");
        document.getElementById("cpf").focus();
        return;
    }

    // Verifica telefone
    if (telefone.length < 8) {
        mostrarErro("Digite um telefone válido.");
        document.getElementById("telefone").focus();
        return;
    }

    // Verifica e-mail
    if (!email.includes("@")) {
        mostrarErro("Digite um e-mail válido.");
        document.getElementById("email").focus();
        return;
    }

    // Verifica senha
    if (senha.length < 6) {
        mostrarErro("A senha precisa ter pelo menos 6 caracteres.");
        document.getElementById("senha").focus();
        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        document.getElementById("confirmarSenhaWrap").classList.add("field-error");
        document.getElementById("erroConfirmarSenha").classList.add("show");
        document.getElementById("confirmarSenha").focus();
        return;
    }

    // Trava o botão pra evitar duplo envio
    botaoCadastrarPaciente.disabled = true;
    botaoCadastrarPaciente.textContent = "Cadastrando...";

    try {

        // Envia os dados para o backend
        const resposta = await fetch("/api/paciente/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, cpf, telefone, email, senha })
        });

        // Recebe a resposta do backend
        const resultado = await resposta.json();

        if (resposta.ok) {

            mensagemPaciente.textContent = resultado.mensagem;
            mensagemPaciente.className = "mensagem-cadastro";

            console.log("Paciente cadastrado:", { nome, cpf, telefone, email });

            // Depois de 1,5 segundo, vai para o login do paciente
            setTimeout(function () {
                window.location.href = "login-paciente.html";
            }, 1500);

        } else {

            mostrarErro(resultado.mensagem || "Não foi possível realizar o cadastro.");
            botaoCadastrarPaciente.disabled = false;
            botaoCadastrarPaciente.textContent = "Cadastrar";
        }

    } catch (erro) {

        console.error("Erro ao cadastrar paciente:", erro);
        mostrarErro("Erro ao conectar com o servidor.");
        botaoCadastrarPaciente.disabled = false;
        botaoCadastrarPaciente.textContent = "Cadastrar";
    }

});


// Função para mostrar mensagens de erro
function mostrarErro(mensagem) {

    mensagemPaciente.textContent = mensagem;
    mensagemPaciente.className = "mensagem-cadastro erro";

}