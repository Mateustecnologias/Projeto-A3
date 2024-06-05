require('dotenv').config(); // Configurando o Dotenv e pegando o valor da variável de ambiente
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


const express = require('express'); // configuração do express //
const app = express();

app.use(express.json()); // o app irá usar o as requisições http em dados compartilhados em formato de JSON //
const PORT = 8080
app.listen(PORT, () => console.log(`Em execução na porta ${PORT}`)) // serviço irá rodar na porta 4000 //

const cors = require("cors"); // configuração do cors (é um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens.) //
app.use(cors());
app.options('*', cors()); // dizemos para que o cors seja utilizado para requisições de todos os endereços //


const { OpenAI } = require("openai");
const openai = new OpenAI(OPENAI_API_KEY); // criamos uma instância do objeto da api validando com a chave passada no .env

app.post('/chatBot', async (req, res) => { // metodo POST que possibilita receber uma resposta do que foi enviado pela req //
    const { prompt } = req.body;
    try {
        const completion = await openai.chat.completions.create({
            messages:
                [{
                    role: "user",
                    content: prompt
                }],
            model: "gpt-3.5-turbo", // modelo que será usado na consulta a API // 
            max_tokens: 500, // define a quantidade de caracters a resposta ira consumir //
            temperature: 0.9 // define o grau de aleatoriedade da resposta //
        });

        console.log(completion); // conseguimos ver como é composta a estrutura da resposta do ChatGPT // 
        res.json({response: completion.choices[0].message.content}); // caminho na qual a resposta vem do console //
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Algo deu errado ao gerar a resposta do Chatbox');
    }
});