// Função para enviar e-mail
async function enviarEmail(nome, email, mensagem) {
    const dados = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };

    try {
        const resposta = await fetch('/enviar-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error('Falha ao enviar e-mail');
        }

        return await resposta.text();
    } catch (erro) {
        console.error('Erro ao enviar e-mail:', erro);
        throw erro;
    }
}

// Adiciona o evento de submit ao formulário quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const formularioContato = document.getElementById('formularioContato');
    if (formularioContato) {
        formularioContato.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            try {
                const resultado = await enviarEmail(nome, email, mensagem);
                alert(resultado);
                this.reset(); // Limpa o formulário após o envio
            } catch (erro) {
                alert('Erro ao enviar e-mail: ' + erro);
            }
        });
    }
});

// Exporta a função enviarEmail para uso em outros scripts, se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { enviarEmail };
}
