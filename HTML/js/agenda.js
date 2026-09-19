document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".agenda-form");

    const nome = document.querySelector("#nome");
    const telefone = document.querySelector("#telefone");
    const carro = document.querySelector("#carro");
    const servico = document.querySelector("#servico");
    const descricao = document.querySelector("#descricao");
    const data = document.querySelector("#data");
    const horario = document.querySelector("#horario");

    const numeroWhatsApp = "5547999492318";


    // ==========================================
    // IMPEDIR DATAS PASSADAS
    // ==========================================

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    data.min = `${ano}-${mes}-${dia}`;


    // ==========================================
    // ENVIO DO FORMULÁRIO
    // ==========================================

    formulario.addEventListener("submit", function (event) {

        // MUITO IMPORTANTE:
        // impede o navegador de recarregar a página
        event.preventDefault();


        // ==========================================
        // PEGAR VALORES
        // ==========================================

        const nomeValor = nome.value.trim();
        const telefoneValor = telefone.value.trim();
        const carroValor = carro.value.trim();
        const servicoValor = servico.value;
        const descricaoValor = descricao.value.trim();
        const dataValor = data.value;
        const horarioValor = horario.value;


        // ==========================================
        // VALIDAÇÃO
        // ==========================================

        if (
            nomeValor === "" ||
            telefoneValor === "" ||
            carroValor === "" ||
            servicoValor === "" ||
            dataValor === "" ||
            horarioValor === ""
        ) {

            alert("Preencha todos os campos obrigatórios.");

            return;
        }


        // ==========================================
        // VALIDAR DATA
        // ==========================================

        const dataEscolhida =
            new Date(dataValor + "T00:00:00");

        const dataHoje = new Date();

        dataHoje.setHours(0, 0, 0, 0);

        if (dataEscolhida < dataHoje) {

            alert("Escolha uma data válida.");

            return;
        }


        // ==========================================
        // FORMATAR DATA
        // ==========================================

        const dataFormatada =
            dataEscolhida.toLocaleDateString("pt-BR");


        // ==========================================
        // NOME DO SERVIÇO
        // ==========================================

        const servicoNome =
            servico.options[servico.selectedIndex].text;


        // ==========================================
        // MENSAGEM WHATSAPP
        // ==========================================

        const mensagem = `Olá! Gostaria de solicitar um agendamento.

*DADOS DO CLIENTE*

Nome: ${nomeValor}
WhatsApp: ${telefoneValor}

*VEÍCULO*

Veículo: ${carroValor}

*SERVIÇO*

Serviço: ${servicoNome}

Descrição:
${descricaoValor || "Não informado"}

*AGENDAMENTO*

Data: ${dataFormatada}
Horário: ${horarioValor}

Gostaria de confirmar a disponibilidade desse horário.`;


        // ==========================================
        // LINK WHATSAPP
        // ==========================================

        const linkWhatsApp =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(mensagem);


        // ==========================================
        // MOSTRAR MENSAGEM
        // ==========================================

        mostrarMensagemSucesso();


        // ==========================================
        // LIMPAR FORMULÁRIO
        // ==========================================

        formulario.reset();


        // ==========================================
        // ABRIR WHATSAPP
        // ==========================================

        setTimeout(function () {

            window.location.href = linkWhatsApp;

        }, 1200);

    });


    // ==========================================
    // MENSAGEM DE SUCESSO
    // ==========================================

    function mostrarMensagemSucesso() {

        // Se já existir uma mensagem,
        // remove antes de criar outra

        const antiga =
            document.querySelector(".agenda-success");

        if (antiga) {
            antiga.remove();
        }


        // Criar mensagem

        const mensagem =
            document.createElement("div");

        mensagem.className = "agenda-success";


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


        // Colocar a mensagem ANTES do formulário

        formulario.parentElement.insertBefore(
            mensagem,
            formulario
        );


        // Mostrar

        mensagem.style.display = "flex";


        // Scroll até a mensagem

        mensagem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        );

    }

});