const formulario = document.querySelector(".agenda-form");

const campoNome = document.querySelector("#nome");
const campoTelefone = document.querySelector("#telefone");
const campoCarro = document.querySelector("#carro");
const campoServico = document.querySelector("#servico");
const campoDescricao = document.querySelector("#descricao");
const campoData = document.querySelector("#data");
const campoHorario = document.querySelector("#horario");

const numeroWhatsApp = "5547999492318";

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    // Pega os valores
    const nome = campoNome.value.trim();
    const telefone = campoTelefone.value.trim();
    const carro = campoCarro.value.trim();
    const servico = campoServico.value;
    const descricao = campoDescricao.value.trim();
    const data = campoData.value;
    const horario = campoHorario.value;

    // Validação
    if (
        nome === "" ||
        telefone === "" ||
        carro === "" ||
        servico === "" ||
        data === "" ||
        horario === ""
    ) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Formata a data
    const dataFormatada = data.split("-").reverse().join("/");

    // Monta mensagem do WhatsApp
    let mensagem =
        "Olá! Gostaria de solicitar um agendamento.%0A%0A" +
        "*Nome:* " + encodeURIComponent(nome) + "%0A" +
        "*Telefone:* " + encodeURIComponent(telefone) + "%0A" +
        "*Carro:* " + encodeURIComponent(carro) + "%0A" +
        "*Serviço:* " + encodeURIComponent(servico) + "%0A" +
        "*Data:* " + encodeURIComponent(dataFormatada) + "%0A" +
        "*Horário:* " + encodeURIComponent(horario);

    if (descricao !== "") {
        mensagem +=
            "%0A*Descrição:* " +
            encodeURIComponent(descricao);
    }

    const linkWhatsApp =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensagem;

    // =====================================
    // MOSTRA A MENSAGEM DE SUCESSO
    // =====================================

    let mensagemSucesso = document.querySelector("#mensagem-sucesso");

    if (mensagemSucesso) {

        mensagemSucesso.style.display = "flex";
        mensagemSucesso.style.visibility = "visible";
        mensagemSucesso.style.opacity = "1";

    } else {

        // Se por algum motivo ela não existir no HTML,
        // cria automaticamente.
        mensagemSucesso = document.createElement("div");

        mensagemSucesso.id = "mensagem-sucesso";

        mensagemSucesso.innerHTML = `
            <div style="
                font-size: 28px;
                font-weight: bold;
                color: var(--green);
            ">✓</div>

            <div>
                <strong>Agendamento enviado com sucesso!</strong>

                <p>
                    Sua solicitação foi preparada.
                    Você será direcionado ao WhatsApp para confirmar o agendamento.
                </p>
            </div>
        `;

        mensagemSucesso.style.display = "flex";
        mensagemSucesso.style.alignItems = "center";
        mensagemSucesso.style.gap = "18px";
        mensagemSucesso.style.width = "100%";
        mensagemSucesso.style.boxSizing = "border-box";
        mensagemSucesso.style.marginBottom = "30px";
        mensagemSucesso.style.padding = "22px 25px";
        mensagemSucesso.style.border = "1px solid var(--green)";
        mensagemSucesso.style.background = "var(--background-secondary)";
        mensagemSucesso.style.color = "var(--white)";

        formulario.insertBefore(
            mensagemSucesso,
            formulario.firstChild
        );
    }

    // Limpa os campos
    formulario.reset();

    // Abre WhatsApp depois de mostrar a mensagem
    setTimeout(function () {
        window.open(linkWhatsApp, "_blank");
    }, 1000);

});