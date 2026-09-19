// =========================================================
// AGENDA - AMOSTRA CUSTOM
// =========================================================

const formulario = document.querySelector(".agenda-form");
const campoData = document.querySelector("#data");

// =========================================================
// IMPEDIR DATAS PASSADAS
// =========================================================

const hoje = new Date();

const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

const dataAtual = `${ano}-${mes}-${dia}`;

campoData.min = dataAtual;


// =========================================================
// ENVIO DO FORMULÁRIO
// =========================================================

formulario.addEventListener("submit", function (event) {

    event.preventDefault();


    // Pegar valores dos campos

    const nome = document.querySelector("#nome").value.trim();

    const telefone = document.querySelector("#telefone").value.trim();

    const carro = document.querySelector("#carro").value.trim();

    const servico = document.querySelector("#servico").value;

    const descricao = document.querySelector("#descricao").value.trim();

    const data = document.querySelector("#data").value;

    const horario = document.querySelector("#horario").value;


    // =====================================================
    // VALIDAÇÃO
    // =====================================================

    if (
        nome === "" ||
        telefone === "" ||
        carro === "" ||
        servico === "" ||
        data === "" ||
        horario === ""
    ) {

        alert("Preencha todos os campos obrigatórios.");

        return;

    }


    // =====================================================
    // VERIFICAR DATA
    // =====================================================

    const dataEscolhida = new Date(data + "T00:00:00");

    const dataHoje = new Date();

    dataHoje.setHours(0, 0, 0, 0);


    if (dataEscolhida < dataHoje) {

        alert("Escolha uma data válida.");

        return;

    }


    // =====================================================
    // FORMATAR DATA
    // =====================================================

    const dataFormatada = dataEscolhida.toLocaleDateString(
        "pt-BR"
    );


    // =====================================================
    // PEGAR NOME DO SERVIÇO
    // =====================================================

    const campoServico = document.querySelector("#servico");

    const servicoNome =
        campoServico.options[campoServico.selectedIndex].text;


    // =====================================================
    // MONTAR MENSAGEM
    // =====================================================

    let mensagem = `Olá! Gostaria de solicitar um agendamento.

*DADOS DO CLIENTE*

Nome: ${nome}
WhatsApp: ${telefone}

*VEÍCULO*

Veículo: ${carro}

*SERVIÇO*

Serviço: ${servicoNome}

Descrição:
${descricao || "Não informado"}

*AGENDAMENTO*

Data: ${dataFormatada}
Horário: ${horario}

Gostaria de confirmar a disponibilidade desse horário.`;


    // =====================================================
    // NÚMERO DO WHATSAPP
    // =====================================================

    // COLOQUE AQUI O NÚMERO DA OFICINA
    // Formato: 55 + DDD + número
    //
    // Exemplo:
    // 55479999999

    const numeroWhatsApp = "5547999999999";


    // =====================================================
    // CRIAR LINK
    // =====================================================

    const mensagemCodificada =
        encodeURIComponent(mensagem);

    const linkWhatsApp =
        `https://wa.me/${5547999492318}?text=${mensagemCodificada}`;


    // =====================================================
    // ABRIR WHATSAPP
    // =====================================================

    window.open(linkWhatsApp, "_blank");

});