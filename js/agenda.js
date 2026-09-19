// =========================================================
// AGENDA - AMOSTRA CUSTOM
// =========================================================

const formulario = document.querySelector(".agenda-form");
const campoData = document.querySelector("#data");


// =========================================================
// NÚMERO DO WHATSAPP
// =========================================================

const numeroWhatsApp = "5547999492318";


// =========================================================
// DATA MÍNIMA
// =========================================================

const hoje = new Date();

const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

campoData.min = `${ano}-${mes}-${dia}`;


// =========================================================
// FORMULÁRIO
// =========================================================

formulario.addEventListener("submit", function (event) {

    // Impede o formulário de recarregar a página
    event.preventDefault();


    // =====================================================
    // PEGAR DADOS
    // =====================================================

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
    // VALIDAR DATA
    // =====================================================

    const dataEscolhida =
        new Date(data + "T00:00:00");

    const dataHoje =
        new Date();

    dataHoje.setHours(0, 0, 0, 0);


    if (dataEscolhida < dataHoje) {

        alert("Escolha uma data válida.");

        return;

    }


    // =====================================================
    // FORMATAR DATA
    // =====================================================

    const dataFormatada =
        dataEscolhida.toLocaleDateString("pt-BR");


    // =====================================================
    // PEGAR NOME DO SERVIÇO
    // =====================================================

    const campoServico =
        document.querySelector("#servico");

    const servicoNome =
        campoServico.options[
            campoServico.selectedIndex
        ].text;


    // =====================================================
    // MENSAGEM
    // =====================================================

    const mensagem =

`Olá! Gostaria de solicitar um agendamento.

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
    // LINK WHATSAPP
    // =====================================================

    const mensagemCodificada =
        encodeURIComponent(mensagem);

    const linkWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;


    // =====================================================
    // MOSTRAR SUCESSO
    // =====================================================

    const mensagemSucesso =
        document.querySelector("#mensagem-sucesso");

    mensagemSucesso.classList.add("mostrar");


    // =====================================================
    // LIMPAR FORMULÁRIO
    // =====================================================

    formulario.reset();


    // =====================================================
    // ABRIR WHATSAPP
    // =====================================================

    setTimeout(function () {

        window.open(
            linkWhatsApp,
            "_blank"
        );

    }, 500);

});