const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const validarEmail = (request, response, next) => {
    // 4
    const regex = /^\w+@\w+\.\w+$/;
    const { email } = request.body;
    if (!email) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "email" é obrigatório',
        });
    }
    if (!regex.test(email)) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    }

    next();
};

const validarPassWord = (request, response, next) => {
    // 4
    const { password } = request.body;
    if (!password) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "password" é obrigatório',
        });
    }

    if (password.length < 6) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    }
    next();
};

/* 

HTTP Status code: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

*/

const autorizacao = (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization) {
        return response.status(HTTP_UNAUTHORIZED).json({
            message: 'Token não encontrado',
        });
    }
    if (authorization.length !== 16 && typeof authorization === 'string') {
        return response.status(HTTP_UNAUTHORIZED).json({
            message: 'Token inválido',
        });
    }
    next();
};
const campoNome = (request, response, next) => {
    const { name } = request.body;
    if (!name) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "name" é obrigatório',
        });
    }
    if (name.length < 3) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    }
    next();
};
const campoIdade = (request, response, next) => {
    const { age } = request.body;
    if (age === undefined) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "age" é obrigatório',
        });
    }
    if (age < 18) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });
    }
    next();
};
const campotalk = (request, response, next) => {
    const { talk } = request.body;
    if (talk === undefined) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "talk" é obrigatório',
        });
    }
    next();
};
const campowatchedAt = (request, response, next) => {
    const { watchedAt } = request.body.talk;
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (watchedAt === undefined) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "watchedAt" é obrigatório',
        });
    }
    if (!regex.test(watchedAt)) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};
const campoRate = (request, response, next) => {
    const { rate } = request.body.talk;
    if (rate === undefined) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "rate" é obrigatório',
        });
    }
    if (Number.isInteger(rate) === false) {
        return response.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    } 
 if (rate < 1 || rate > 5) {
    return response.status(HTTP_BAD_REQUEST).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
 }
    next();
};
module.exports = {
    validarEmail,
    validarPassWord,
    autorizacao,
    campoNome,
    campoIdade,
    campotalk,
    campowatchedAt,
    campoRate,
};
