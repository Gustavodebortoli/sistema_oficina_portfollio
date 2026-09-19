document.addEventListener("DOMContentLoaded", function () {

    /*
    ======================================================
    MENU HAMBÚRGUER
    ======================================================
    */

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            menu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const aberto = menu.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", aberto ? "true" : "false");
            menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        });

        /* Fecha o menu ao clicar em um link */
        const links = menu.querySelectorAll("a");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                menu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        /* Fecha clicando fora */
        document.addEventListener("click", function (event) {
            if (
                menu.classList.contains("active") &&
                !menu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                menu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    /*
    ======================================================
    AGENDAMENTO
    ======================================================
    */

    const formulario = document.getElementById("agenda-form");

    if (!formulario) {
        return;
    }

    const nome = document.getElementById("nome");
    const telefone = document.getElementById("telefone");
    const carro = document.getElementById("carro");
    const servico = document.getElementById("servico");
    const descricao = document.getElementById("descricao");
    const data = document.getElementById("data");
    const horario = document.getElementById("horario");
    const botao = document.getElementById("agenda-button");

    /* Número destino no formato internacional (DDI + DDD + Número) */
    const numeroWhatsApp = "5547999492318";

    /*
    ======================================================
    DATA MÍNIMA (HOJE)
    ======================================================
    */

    function dataAtual() {
        const agora = new Date();
        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, "0");
        const dia = String(agora.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    if (data) {
        data.min = dataAtual();
    }

    /*
    ======================================================
    SUBMIT DO FORMULÁRIO
    ======================================================
    */

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        /* Valida HTML5 */
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        /* Coleta de valores */
        const nomeValor = nome ? nome.value.trim() : "";
        const telefoneValor = telefone ? telefone.value.trim() : "";
        const carroValor = carro ? carro.value.trim() : "";
        const servicoTexto = servico && servico.selectedIndex >= 0 ? servico.options[servico.selectedIndex].text : "";
        const descricaoValor = descricao ? descricao.value.trim() : "";
        const dataValor = data ? data.value : "";
        const horarioValor = horario ? horario.value : "";

        /* Formatação da data (AAAA-MM-DD -> DD/MM/AAAA) */
        const dataFormatada = dataValor ? dataValor.split("-").reverse().join("/") : "Não informada";

        /* Montagem da mensagem estruturada */
        const mensagem = 
`Olá! Gostaria de solicitar um agendamento.

*DADOS DO CLIENTE*
• Nome: ${nomeValor}
• WhatsApp: ${telefoneValor}

*VEÍCULO*
• Veículo: ${carroValor}

*SERVIÇO*
• Serviço: ${servicoTexto}
• Descrição: ${descricaoValor || "Não informado"}

*AGENDAMENTO*
• Data: ${dataFormatada}
• Horário: ${horarioValor}

Gostaria de confirmar a disponibilidade desse horário.`;

        /* Montagem da URL da API do WhatsApp */
        const link = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

        /* Feedback do botão */
        if (botao) {
            botao.disabled = true;
            botao.textContent = "Abrindo WhatsApp...";
        }

        /* Redirecionamento */
        window.open(link, "_blank");

        /* Exibição da mensagem de sucesso na página */
        let sucesso = document.getElementById("agenda-sucesso");

        if (!sucesso) {
            sucesso = document.createElement("div");
            sucesso.id = "agenda-sucesso";
            sucesso.className = "agenda-success";
            sucesso.innerHTML = `
                <strong>Solicitação iniciada!</strong>
                <p>Caso a janela do WhatsApp não tenha aberto automaticamente, verifique seus bloqueadores de pop-up.</p>
            `;
            formulario.parentNode.insertBefore(sucesso, formulario);
        }

        /* Restaura o botão após 2.5s */
        setTimeout(function () {
            if (botao) {
                botao.disabled = false;
                botao.textContent = "Solicitar agendamento";
            }
        }, 2500);
    });
});