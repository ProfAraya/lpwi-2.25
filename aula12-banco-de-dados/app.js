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

// 9. Chamar a função para rodar o script
consultarUsuarios();

// Em um script simples como este, você pode querer fechar o pool
// Em um servidor web (como com Express), você deixaria o pool aberto
// setTimeout(() => pool.end(), 2000);