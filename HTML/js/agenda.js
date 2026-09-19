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

            const aberto =
                menu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                aberto
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        });


        /*
        Fecha o menu ao clicar em um link
        */

        const links =
            menu.querySelectorAll("a");


        links.forEach(function (link) {

            link.addEventListener("click", function () {

                menu.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /*
        Fecha clicando fora
        */

        document.addEventListener(
            "click",
            function (event) {

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

                }

            }
        );

    }


    /*
    ======================================================
    AGENDAMENTO
    ======================================================
    */

    const formulario =
        document.getElementById("agenda-form");


    if (!formulario) {

        return;

    }


    const nome =
        document.getElementById("nome");

    const telefone =
        document.getElementById("telefone");

    const carro =
        document.getElementById("carro");

    const servico =
        document.getElementById("servico");

    const descricao =
        document.getElementById("descricao");

    const data =
        document.getElementById("data");

    const horario =
        document.getElementById("horario");

    const botao =
        document.getElementById("agenda-button");


    /*
    Número que vai receber a mensagem
    */

    const numeroWhatsApp =
        "5547999492318";


    /*
    ======================================================
    DATA
    ======================================================
    */

    function dataAtual() {

        const agora = new Date();

        const ano =
            agora.getFullYear();

        const mes =
            String(
                agora.getMonth() + 1
            ).padStart(2, "0");

        const dia =
            String(
                agora.getDate()
            ).padStart(2, "0");

        return (
            ano +
            "-" +
            mes +
            "-" +
            dia
        );

    }


    /*
    Impede datas anteriores a hoje
    */

    data.min = dataAtual();


    /*
    ======================================================
    FORMULÁRIO
    ======================================================
    */

    formulario.addEventListener(
        "submit",
        function (event) {

            /*
            Impede a página de recarregar
            */

            event.preventDefault();


            /*
            Verifica os campos obrigatórios
            */

            if (!formulario.checkValidity()) {

                formulario.reportValidity();

                return;

            }


            /*
            Pega os valores
            */

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


            /*
            ==================================================
            MENSAGEM
            ==================================================
            */

            const mensagem =
`Olá! Gostaria de solicitar um agendamento.

*DADOS DO CLIENTE*

Nome: ${nomeValor}
WhatsApp: ${telefoneValor}

*VEÍCULO*

Veículo: ${carroValor}

*SERVIÇO*

Serviço: ${servicoValor}

Descrição:
${descricaoValor || "Não informado"}

*AGENDAMENTO*

Data: ${dataValor.split("-").reverse().join("/")}
Horário: ${horarioValor}

Gostaria de confirmar a disponibilidade desse horário.`;


            /*
            ==================================================
            LINK WHATSAPP
            ==================================================
            */

            const link =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(mensagem);


            /*
            ==================================================
            BOTÃO
            ==================================================
            */

            botao.disabled = true;

            botao.textContent =
                "Abrindo WhatsApp...";


            /*
            ==================================================
            ABRIR WHATSAPP
            ==================================================
            */

            window.open(
                link,
                "_blank"
            );


            /*
            ==================================================
            MENSAGEM NA PÁGINA
            ==================================================
            */

            let sucesso =
                document.getElementById(
                    "agenda-sucesso"
                );


            if (!sucesso) {

                sucesso =
                    document.createElement("div");

                sucesso.id =
                    "agenda-sucesso";

                sucesso.className =
                    "agenda-success";

                sucesso.innerHTML = `
                    
                    <strong>
                        Solicitação enviada!
                    </strong>

                    <p>
                        O WhatsApp foi aberto com os dados
                        do seu agendamento.
                    </p>

                `;

                formulario.parentNode.insertBefore(
                    sucesso,
                    formulario
                );

            }


            /*
            Depois de 2 segundos,
            libera novamente o botão.
            */

            setTimeout(function () {

                botao.disabled = false;

                botao.textContent =
                    "Solicitar agendamento";

            }, 2000);

        }
    );

});