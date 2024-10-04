const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

const validDDDs = [
    '91', '92', '93', '94', '95', '96', '97', '98', '99',
    '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89',
    '61', '62', '64', '65', '66', '67',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55'
];


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-form', (req, res) => {
    const { nome, nascimento, nome_mae, nome_pai, ddd, telefone, email, serie, turno, atividades } = req.body;

    let errors = [];

    if (!nome || !nascimento || !nome_mae || !nome_pai || !ddd || !telefone || !email || !serie || !turno) {
        errors.push('Todos os campos são obrigatórios.');
    }

    const dateRegex = /^([0-2]\d|3[0-1])\/(0\d|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(nascimento)) {
        errors.push('A data de nascimento deve estar no formato dd/mm/aaaa.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('O e-mail inserido é inválido.');
    }

    if (!validDDDs.includes(ddd)) {
        errors.push('O DDD informado não é válido.');
    }

    const atividadesSelecionadas = Array.isArray(atividades) ? atividades.length : (atividades ? 1 : 0);
    if (atividadesSelecionadas > 3) {
        errors.push('Você só pode selecionar no máximo 3 atividades extracurriculares.');
    }

    if (errors.length > 0) {
        res.send(`<h1>Erro no formulário</h1><ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>`);
    } else {
        res.send('<h1>Formulário enviado com sucesso!</h1>');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
