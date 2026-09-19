// =========================================================
// AGENDA - AMOSTRA CUSTOM
// =========================================================

const formulario = document.querySelector(".agenda-form");
const campoData = document.querySelector("#data");


// =========================================================
// NÚMERO DO WHATSAPP DA OFICINA
// =========================================================

// COLOQUE O NÚMERO REAL AQUI
// Formato: 55 + DDD + número
// Sem espaços, parênteses ou hífen

const numeroWhatsApp = "5547999492318";


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
    const mensagemSucesso =
    document.querySelector("#mensagem-sucesso");

mensagemSucesso.classList.add("mostrar");

    event.preventDefault();


    // =====================================================
    // PEGAR DADOS
    // =====================================================

    const nome =
        document.querySelector("#nome").value.trim();

    const telefone =
        document.querySelector("#telefone").value.trim();

    const carro =
        document.querySelector("#carro").value.trim();

    const servico =
        document.querySelector("#servico").value;

    const descricao =
        document.querySelector("#descricao").value.trim();

    const data =
        document.querySelector("#data").value;

    const horario =
        document.querySelector("#horario").value;


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
    // NOME DO SERVIÇO
    // =====================================================

    const campoServico =
        document.querySelector("#servico");

    const servicoNome =
        campoServico.options[
            campoServico.selectedIndex
        ].text;


    // =====================================================
    // MENSAGEM DO WHATSAPP
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
    // CRIAR LINK DO WHATSAPP
    // =====================================================

    const mensagemCodificada =
        encodeURIComponent(mensagem);

    const linkWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;


    // =====================================================
    // MENSAGEM DE SUCESSO
    // =====================================================

    mostrarMensagemSucesso();


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


// =========================================================
// MENSAGEM DE SUCESSO
// =========================================================

function mostrarMensagemSucesso() {

    // Evita mensagens duplicadas

    const mensagemExistente =
        document.querySelector(".agenda-success");

    if (mensagemExistente) {

        mensagemExistente.remove();

    }


    // Criar elemento

    const mensagem =
        document.createElement("div");

    mensagem.classList.add("agenda-success");


    mensagem.innerHTML = `

        <div class="success-icon">
            ✓
        </div>

        <div class="success-text">

            <strong>
                Agendamento enviado com sucesso!
            </strong>

            <p>
                Sua solicitação foi preparada.
                Você será direcionado ao WhatsApp
                para confirmar o agendamento.
            </p>

        </div>

    `;


    // Colocar mensagem antes do formulário

    formulario.parentElement.insertBefore(
        mensagem,
        formulario
    );


    // Rolar suavemente até a mensagem

    mensagem.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}