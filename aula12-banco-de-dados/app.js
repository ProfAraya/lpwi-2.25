// 1. Importar a versão "promise" do mysql2
const mysql = require('mysql2/promise');

// 2. Configurar o Pool de Conexões
// (Um "pool" gerencia múltiplas conexões, é a melhor prática para aplicações web)
const pool = mysql.createPool({
    host: 'localhost',       // O endereço do seu servidor MySQL (ex: 127.0.0.1)
    user: 'root',     // Seu usuário do MySQL (ex: 'root')
    port: 3307,
    password: '',   // Sua senha do MySQL
    database: 'cadastro',   // O nome do banco de dados que você quer acessar
    waitForConnections: true,
    connectionLimit: 10,     // Limite de conexões no pool
    queueLimit: 0
});

// 3. Função principal assíncrona para executar a consulta
async function consultarUsuarios() {
    let connection;
    try {
        // 4. Obter uma conexão do pool
        connection = await pool.getConnection();
        console.log("🎉 Conexão ao MySQL estabelecida com sucesso!");

        // 5. Executar a consulta (Query)
        // (Vamos selecionar todos os usuários da tabela 'usuarios')
        const [rows, fields] = await connection.execute('SELECT * FROM usuarios');

        // 6. Processar e exibir os resultados
        console.log("Resultados da consulta:");
        console.log(rows); // 'rows' é um array de objetos

        console.log("\nLista de Usuários:");
        rows.forEach(usuario => {
            console.log(`- ID: ${usuario.id}, Nome: ${usuario.nome}, Email: ${usuario.email}`);
        });

    } catch (error) {
        // 7. Lidar com erros
        console.error("Erro ao consultar o MySQL:", error);
    } finally {
        // 8. Garantir que a conexão seja liberada de volta para o pool
        if (connection) {
            connection.release();
            console.log("\nConexão liberada.");
        }
    }
}


/**
 * Insere um novo usuário no banco de dados.
 * @param {string} nome O nome do usuário.
 * @param {string} email O email do usuário.
 */
async function inserirUsuario(nome, email) {
    console.log(`\nTentando inserir usuário: ${nome}...`);
    try {
        // 1. A query SQL com placeholders (?)
        const sql = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";
        
        // 2. Os valores a serem inseridos (na ordem correta dos placeholders)
        const valores = [nome, email];

        // 3. Executa a query
        // 'result' contém informações sobre a operação (ex: insertId)
        const [result] = await pool.execute(sql, valores);

        // 4. Exibe o resultado
        console.log(`✅ Usuário inserido com sucesso! Novo ID: ${result.insertId}`);
        return result.insertId;

    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
    }
}

/**
 * Atualiza o email de um usuário com base no seu ID.
 * @param {number} id O ID do usuário a ser atualizado.
 * @param {string} novoEmail O novo email.
 */
async function atualizarEmailUsuario(id, novoEmail) {
    console.log(`\nTentando atualizar email do ID ${id}...`);
    try {
        // 1. A query SQL (Note a ordem dos placeholders)
        const sql = "UPDATE usuarios SET email = ? WHERE id = ?";
        
        // 2. Os valores (na ordem: novoEmail, depois id)
        const valores = [novoEmail, id];

        // 3. Executa
        const [result] = await pool.execute(sql, valores);

        // 4. Verifica se algo foi realmente atualizado
        if (result.affectedRows > 0) {
            console.log(`✅ Email do usuário ID ${id} atualizado para: ${novoEmail}`);
        } else {
            console.log(`⚠️ Nenhum usuário encontrado com o ID ${id}. Nada foi atualizado.`);
        }

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
    }
}

/**
 * Exclui um usuário do banco de dados com base no seu ID.
 * @param {number} id O ID do usuário a ser excluído.
 */
async function excluirUsuario(id) {
    console.log(`\nTentando excluir usuário ID ${id}...`);
    try {
        // 1. A query SQL
        const sql = "DELETE FROM usuarios WHERE id = ?";
        
        // 2. O valor
        const valores = [id];

        // 3. Executa
        const [result] = await pool.execute(sql, valores);

        // 4. Verifica se algo foi excluído
        if (result.affectedRows > 0) {
            console.log(`✅ Usuário com ID ${id} foi excluído com sucesso.`);
        } else {
            console.log(`⚠️ Nenhum usuário encontrado com o ID ${id}. Nada foi excluído.`);
        }

    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
    }
}
// 9. Chamar a função para rodar o script
async function main() {
    // Vamos reutilizar a função de consulta do exemplo anterior
    const consultarUsuarios = async () => {
        const [rows] = await pool.execute('SELECT * FROM usuarios');
        console.log("\n--- Estado Atual do Banco ---");
        console.table(rows);
        console.log("------------------------------");
    };

    // 1. Ver estado inicial
    await consultarUsuarios();

    // 2. Inserir um novo usuário
    const novoId = await inserirUsuario('Carlos', 'carlos@email.com');
    await consultarUsuarios();

    // 3. Atualizar o usuário que acabamos de criar
    if (novoId) {
        await atualizarEmailUsuario(novoId, 'carlos.silva@email.com');
        await consultarUsuarios();
    }
    
    // 4. Tentar atualizar um ID que não existe
    await atualizarEmailUsuario(999, 'fantasma@email.com');

    // 5. Excluir o usuário
    if (novoId) {
        await excluirUsuario(novoId);
        await consultarUsuarios();
    }

    // Fechar o pool quando terminar (importante para scripts)
    await pool.end();
    console.log("\nPool de conexões fechado.");
}

// Chamar a função principal
main();

// Em um script simples como este, você pode querer fechar o pool
// Em um servidor web (como com Express), você deixaria o pool aberto
// setTimeout(() => pool.end(), 2000);