const express = require("express");
const { banco, autenticacao } = require("./firebase.js");

const app = express();
const PORTA = 3000;

// Permite que o backend receba dados em formato JSON
app.use(express.json());

// Mostra os arquivos da pasta html (front-end público)
app.use(express.static("html"));

// Página inicial
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

// CADASTRO DA NUTRICIONISTA

app.post("/api/nutricionista/cadastro", async function (req, res) {

    const {
        nome,
        cpf,
        telefone,
        crn,
        email,
        senha
    } = req.body;

    try {

        const usuario = await autenticacao.createUser({
            email: email,
            password: senha
        });

        await banco.collection("nutricionistas").doc(usuario.uid).set({
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            crn: crn,
            email: email
        });

        res.status(201).json({
            mensagem: "Nutricionista cadastrada com sucesso!"
        });

    } catch (erro) {

        console.error("Erro ao cadastrar nutricionista:", erro);

        res.status(400).json({
            mensagem: "Não foi possível realizar o cadastro."
        });
    }
});

// LOGIN DA NUTRICIONISTA

app.post("/api/nutricionista/login", async function (req, res) {

    const { email, senha } = req.body;

    try {

        const usuario = await autenticacao.getUserByEmail(email);

        console.log("Usuário encontrado:", usuario.uid);

        res.json({
            mensagem: "E-mail encontrado! Login em desenvolvimento."
        });

    } catch (erro) {

        console.error("Erro ao fazer login:", erro);

        res.status(401).json({
            mensagem: "E-mail ou senha inválidos."
        });
    }
});

// CADASTRO DO PACIENTE

app.post("/api/paciente/cadastro", async function (req, res) {

    const {
        nome,
        cpf,
        telefone,
        email,
        senha
    } = req.body;

    try {

        const usuario = await autenticacao.createUser({
            email: email,
            password: senha
        });

        await banco.collection("pacientes").doc(usuario.uid).set({
            nome: nome,
            cpf: cpf,
            telefone: telefone,
            email: email
        });

        res.status(201).json({
            mensagem: "Paciente cadastrado com sucesso!"
        });

    } catch (erro) {

        console.error("Erro ao cadastrar paciente:", erro);

        res.status(400).json({
            mensagem: "Não foi possível realizar o cadastro."
        });
    }
});

// LOGIN DO PACIENTE

app.post("/api/paciente/login", async function (req, res) {

    const { email, senha } = req.body;

    try {

        const usuario = await autenticacao.getUserByEmail(email);

        console.log("Paciente encontrado:", usuario.uid);

        res.json({
            mensagem: "E-mail encontrado! Login em desenvolvimento."
        });

    } catch (erro) {

        console.error("Erro ao fazer login do paciente:", erro);

        res.status(401).json({
            mensagem: "E-mail ou senha inválidos."
        });
    }
});

// INICIAR SERVIDOR

app.listen(PORTA, function () {
    console.log("================================");
    console.log("          QUiRi");
    console.log("================================");
    console.log("Servidor iniciado!");
    console.log("Acesse: http://localhost:3000");
    console.log("Firebase conectado!");
});
