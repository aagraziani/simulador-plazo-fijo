window.addEventListener('load', function () {

    let bancos = [
        {
            id: 0,
            nombre: 'BANCO DE LA NACION ARGENTINA',
            tasa: 33.06
        },
        {
            id: 1,
            nombre: 'BANCO SANTANDER RIO S.A.',
            tasa: 33.06
        },
        {
            id: 2,
            nombre: 'BANCO DE GALICIA Y BUENOS AIRES S.A.U.',
            tasa: 33.06
        },
        {
            id: 3,
            nombre: 'BANCO DE LA PROVINCIA DE BUENOS AIRES',
            tasa: 33.06
        },
        {
            id: 4,
            nombre: 'BANCO BBVA ARGENTINA S.A.',
            tasa: 33.06
        },
        {
            id: 5,
            nombre: 'BANCO MACRO S.A.',
            tasa: 33.06
        },
        {
            id: 6,
            nombre: 'HSBC BANK ARGENTINA S.A.',
            tasa: 33.06
        },
        {
            id: 7,
            nombre: 'BANCO CREDICOOP COOPERATIVO LIMITADO',
            tasa: 33.06
        },
        {
            id: 8,
            nombre: 'INDUSTRIAL AND COMMERCIAL BANK OF CHINA (ARGENTINA) S.A.',
            tasa: 33.06
        },
        {
            id: 9,
            nombre: 'BANCO DE LA CIUDAD DE BUENOS AIRES',
            tasa: 33.06
        }
    ];

    const formulario = document.getElementById('formulario');
    const monto = document.getElementById('monto');
    const desplegable = document.getElementById('desplegable');
    const invalidMonto = document.querySelector('div.is-invalid-monto');
    const invalidDias = document.querySelector('div.is-invalid-dias');
    const feedbackMonto = document.querySelector('p.feedback-monto');
    const feedbackBanco = document.querySelector('p.feedback-banco');
    const feedbackPlazo = document.querySelector('p.feedback-plazo');
    const dias = document.getElementById('dias');
    const reset = document.getElementById('reset');

    /* resultado */
    const resultado = document.querySelector('div.resultado');
    const capitalInvertido = document.getElementById('capital');
    const tna = document.getElementById('tna');
    const interesGanado = document.getElementById('interes-ganado');
    const capitalTotal = document.getElementById('capital-total');
    const cantidadDias = document.getElementById('cantidad-dias');



    /* Lista desplegable de bancos */
    for (let i = 0; i < bancos.length; i++) {
        desplegable.innerHTML += "<option value=" + bancos[i].id + ">" + bancos[i].nombre + "</option>";
    };


    invalidMonto.style.display = 'none';
    invalidDias.style.display = 'none';


    new AutoNumeric('#monto', {
        currencySymbol: "$",
        decimalCharacter: ",",
        digitGroupSeparator: ".",
        unformatOnSubmit: true
    });


    formulario.onsubmit = function (event) {

        event.preventDefault();

        let capital = monto.value;

        let plazo = dias.value;

        //let regexNum = /^[0-9]*$/;

        if (desplegable.value == '') {

            feedbackBanco.innerHTML = "Debe seleccionar un banco";
            feedbackBanco.style.color = 'red';

        /*} else if (!regexNum.test(capital)) {

            invalidMonto.style.display = "block";
            feedbackMonto.innerHTML = "El monto ingresado de ser numérico sin puntos ni comas";
            feedbackMonto.style.color = 'red';*/

        } else if (capital === '') {

            invalidMonto.style.display = "block";
            feedbackMonto.innerHTML = "El monto no puede estar vacío";
            feedbackMonto.style.color = 'red';

        } else if (plazo < 30 || plazo > 365) {

            invalidDias.style.display = "block";
            feedbackPlazo.innerHTML = "El plazo debe ser mayor a 30 dias y menor a 365";
            feedbackPlazo.style.color = 'red';

        } else {

            formulario.classList.add('hide');
            resultado.classList.remove('hide');
            capitalInvertido.innerHTML += `$${capital}`;
            cantidadDias.innerHTML += `${plazo} días`;
            tna.innerHTML += bancos[desplegable.value].tasa + "%";
            interesGanado.innerHTML += "$" + gananciaPlazoFijo(capital);
            capitalTotal.innerHTML += "$" + gananciaTotal();
        };

        function interesAnual(capital) {
            return ((bancos[desplegable.value].tasa * capital) / 100).toFixed(2);
        };

        function gananciaPlazoFijo(capital) {
            return (interesAnual(capital) / 365 * plazo).toFixed(2);
        };

        function gananciaTotal() {
            return (+capital + +gananciaPlazoFijo(capital)).toFixed(2);
        };

    };

    reset.onclick = function () {
        location.reload();
    };


});