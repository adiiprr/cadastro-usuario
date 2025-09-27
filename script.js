document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastro');
    const cepInput = document.getElementById('cep');

    // Buscar endereço na API ViaCEP
    function buscarCEP(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(dados => {
                if (!dados.erro) {
                    document.getElementById('logradouro').value = dados.logradouro || '';
                    document.getElementById('bairro').value = dados.bairro || '';
                    document.getElementById('cidade').value = dados.localidade || '';
                    document.getElementById('estado').value = dados.uf || '';
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                alert('Erro ao buscar CEP.');
            });
    }

    // Buscar automaticamente quando CEP tiver 8 dígitos
    cepInput.addEventListener('input', () => {
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            buscarCEP(cep);
        }
    });

    // Salvar no localStorage
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const dadosFormulario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            numero: document.getElementById('numero').value
        };

        localStorage.setItem('dadosCadastro', JSON.stringify(dadosFormulario));
        alert('Dados salvos com sucesso!');
    });

    // Restaurar dados do localStorage
    function restaurarDadosFormulario() {
        const dadosSalvos = localStorage.getItem('dadosCadastro');
        if (dadosSalvos) {
            const dadosFormulario = JSON.parse(dadosSalvos);
            document.getElementById('nome').value = dadosFormulario.nome || '';
            document.getElementById('email').value = dadosFormulario.email || '';
            document.getElementById('cep').value = dadosFormulario.cep || '';
            document.getElementById('logradouro').value = dadosFormulario.logradouro || '';
            document.getElementById('bairro').value = dadosFormulario.bairro || '';
            document.getElementById('cidade').value = dadosFormulario.cidade || '';
            document.getElementById('estado').value = dadosFormulario.estado || '';
            document.getElementById('numero').value = dadosFormulario.numero || '';
        }
    }

    restaurarDadosFormulario();
});
