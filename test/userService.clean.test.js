const { UserService } = require('../src/userService');

const dadosUsuarioPadrao = {
    nome: 'Fulano de Tal',
    email: 'fulano@teste.com',
    idade: 25,
};

describe('UserService - Suíte de Testes com Smells', () => {
    let userService;

    beforeEach(() => {
        userService = new UserService();
        userService._clearDB();
    });

    test('deve criar um usuário corretamente', () => {
        const usuarioCriado = userService.createUser(
            dadosUsuarioPadrao.nome,
            dadosUsuarioPadrao.email,
            dadosUsuarioPadrao.idade
        );

        expect(usuarioCriado.id).toBeDefined();
    });

    test('deve buscar um usuário corretamente', () => {
        const usuarioCriado = userService.createUser(
            dadosUsuarioPadrao.nome,
            dadosUsuarioPadrao.email,
            dadosUsuarioPadrao.idade
        );

        const usuarioBuscado = userService.getUserById(usuarioCriado.id);

        expect(usuarioBuscado.nome).toBe(dadosUsuarioPadrao.nome);
        expect(usuarioBuscado.status).toBe('ativo');
    });

    test('deve desativar usuários se eles não forem administradores', () => {
        const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30);

        const resultado = userService.deactivateUser(usuarioComum.id);
        const usuarioAtualizado = userService.getUserById(usuarioComum.id);

        expect(resultado).toBe(true);
        expect(usuarioAtualizado.status).toBe('inativo');
    });

    test('deve desativar usuários se eles não forem administradores', () => {
        const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);

        const resultado = userService.deactivateUser(usuarioAdmin.id);

        expect(resultado).toBe(false);
    });

    test('deve gerar um relatório de usuários formatado', () => {
        const usuario1 = userService.createUser('Alice', 'alice@email.com', 28);
        userService.createUser('Bob', 'bob@email.com', 32);

        const relatorio = userService.generateUserReport();

        expect(relatorio).toContain(usuario1.id);
        expect(relatorio).toContain(usuario1.nome);
        expect(relatorio).toContain(usuario1.status);

        expect(relatorio.startsWith('--- Relatório de Usuários ---')).toBe(true);
    });

    test('deve falhar ao criar usuário menor de idade', () => {
        expect(() => {
            userService.createUser('Menor', 'menor@email.com', 17);
        }).toThrowError('O usuário deve ser maior de idade.');
    });

    test('deve retornar uma menssagem informando que não há usuários cadastrados', () => {
        const relatorio = userService.generateUserReport();
        expect(relatorio).toContain('Nenhum usuário cadastrado.');
    });
});