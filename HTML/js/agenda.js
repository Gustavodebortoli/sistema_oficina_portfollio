document.addEventListener("DOMContentLoaded", () => {

    // ==================================================
    // MENU HAMBÚRGUER
    // ==================================================

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuToggle && menu) {

        menuToggle.addEventListener("click", () => {

            const aberto = menu.classList.toggle("active");

            menuToggle.classList.toggle("active", aberto);

            menuToggle.setAttribute(
                "aria-expanded",
                String(aberto)
            );

            menuToggle.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );

        });


        // Fecha o menu quando clicar em um link

        menu.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                menu.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });


        // Fecha o menu clicando fora dele

        document.addEventListener("click", (event) => {

            if (
                menu.classList.contains("active") &&
                !menu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                menu.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        });

    }


    // ==================================================
    // FORMULÁRIO DE AGENDAMENTO
    // ==================================================

    const formulario = document.querySelector("#agenda-form");

    if (!formulario) {
        return;
    }


    const nome = document.querySelector("#nome");

    const telefone = document.querySelector("#telefone");

    const carro = document.querySelector("#carro");

    const servico = document.querySelector("#servico");

    const descricao = document.querySelector("#descricao");

    const data = document.querySelector("#data");

    const horario = document.querySelector("#horario");

    const botao = formulario.querySelector(
        'button[type="submit"]'
    );


    // Número que receberá o pedido no WhatsApp
    const numeroWhatsApp = "5547999492318";


    // ==================================================
    // DATA LOCAL
    // ==================================================

    function obterDataLocalISO() {

        const agora = new Date();

        const ano = agora.getFullYear();

        const mes = String(
            agora.getMonth() + 1
        ).padStart(2, "0");

        const dia = String(
            agora.getDate()
        ).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;

    }


    function formatarData(dataISO) {

        const [ano, mes, dia] = dataISO.split("-");

        return `${dia}/${mes}/${ano}`;

    }


    // Impede escolher datas anteriores a hoje

    data.min = obterDataLocalISO();


    // ==================================================
    // VALIDAÇÃO DO TELEFONE
    // ==================================================

    function telefoneValido(valor) {

        const numeros = valor.replace(/\D/g, "");

        return (
            numeros.length >= 10 &&
            numeros.length <= 13
        );

    }


    // ==================================================
    // MENSAGEM DE SUCESSO
    // ==================================================

    function removerMensagem() {

        const antiga = document.querySelector(
            ".agenda-success"
        );

        if (antiga) {
            antiga.remove();
        }

    }


    function mostrarMensagemSucesso() {

        removerMensagem();


        const mensagem =
            document.createElement("div");


        mensagem.className =
            "agenda-success";


        mensagem.setAttribute(
            "role",
            "status"
        );


        mensagem.setAttribute(
            "aria-live",
            "polite"
        );


        mensagem.innerHTML = `

            <div
                class="success-icon"
                aria-hidden="true"
            >
                ✓
            </div>

            <div class="success-text">

                <strong>
                    Solicitação preparada com sucesso!
                </strong>

                <p>
                    Seus dados foram preparados.
                    Você será direcionado ao WhatsApp
                    para confirmar a disponibilidade do horário.
                </p>

            </div>

        `;


        formulario.parentElement.insertBefore(
            mensagem,
            formulario
        );


        mensagem.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    // ==================================================
    // ENVIO DO FORMULÁRIO
    // ==================================================

    formulario.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            // Validação nativa do HTML

            if (!formulario.checkValidity()) {

                formulario.reportValidity();

                return;

            }


            // ==================================================
            // PEGAR VALORES
            // ==================================================

            const nomeValor =
                nome.value.trim();


            const telefoneValor =
                telefone.value.trim();


            const carroValor =
                carro.value.trim();


            const servicoValor =
                servico.value;


            const descricaoValor =
                descricao.value.trim();


            const dataValor =
                data.value;


            const horarioValor =
                horario.value;


            // ==================================================
            // VALIDAÇÃO
            // ==================================================

            if (
                !nomeValor ||
                !telefoneValor ||
                !carroValor ||
                !servicoValor ||
                !dataValor ||
                !horarioValor
            ) {

                alert(
                    "Preencha todos os campos obrigatórios."
                );

                return;

            }


            // ==================================================
            // TELEFONE
            // ==================================================

            if (!telefoneValido(telefoneValor)) {

                alert(
                    "Digite um número de WhatsApp válido."
                );

                telefone.focus();

                return;

            }


            // ==================================================
            // DATA
            // ==================================================

            const dataHoje =
                obterDataLocalISO();


            if (dataValor < dataHoje) {

                alert(
                    "A data escolhida já passou. Escolha uma data válida."
                );

                data.focus();

                return;

            }


            // ==================================================
            // HORÁRIO
            // ==================================================

            if (dataValor === dataHoje) {

                const agora = new Date();


                const agoraMinutos =
                    agora.getHours() * 60 +
                    agora.getMinutes();


                const [hora, minuto] =
                    horarioValor
                        .split(":")
                        .map(Number);


                const horarioMinutos =
                    hora * 60 +
                    minuto;


                if (
                    horarioMinutos <=
                    agoraMinutos
                ) {

                    alert(
                        "Esse horário já passou. Escolha outro horário."
                    );

                    horario.focus();

                    return;

                }

            }


            // ==================================================
            // NOME DO SERVIÇO
            // ==================================================

            const servicoNome =
                servico.options[
                    servico.selectedIndex
                ].text.trim();


            // ==================================================
            // MENSAGEM PARA O WHATSAPP
            // ==================================================

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

Data: ${formatarData(dataValor)}
Horário: ${horarioValor}

Gostaria de confirmar a disponibilidade desse horário.`;


            // ==================================================
            // LINK DO WHATSAPP
            // ==================================================

            const linkWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                    mensagem
                )}`;


            // ==================================================
            // MOSTRAR CONFIRMAÇÃO
            // ==================================================

            mostrarMensagemSucesso();


            // ==================================================
            // DESABILITAR BOTÃO
            // ==================================================

            if (botao) {

                botao.disabled = true;

                botao.textContent =
                    "Abrindo WhatsApp...";

            }


            // ==================================================
            // ABRIR WHATSAPP
            // ==================================================

            setTimeout(() => {

                window.location.href =
                    linkWhatsApp;

            }, 700);

        }
    );

});