const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPastas = document.querySelector('.pastas');
const btnPizzas = document.querySelector('.pizzas');
const btnPostres = document.querySelector('.postres');
const contenedorPlatos = document.querySelector('.platos');





document.addEventListener('DOMContentLoaded', () => {
    eventos();
    platos();
});

const eventos = () => {
    menu.addEventListener('click', abrirMenu)
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if (document.querySelectorAll('pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar)
    cerrarMenu(btnCerrar, overlay);
}
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            imagen.classList.remove('lazy');
            observer.unobserve(imagen);
        }
    });
});


imagenes.forEach(imagen => {
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function () {
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}
const platos = () => {
    let platosArray = [];
    const platos = document.querySelectorAll('.plato');

    platos.forEach(plato => platosArray.push(plato));

    const ensaladas = platosArray.filter(ensalada => ensalada.getAttribute('data-plato') === 'ensalada');
    const pastas = platosArray.filter(pasta => pasta.getAttribute('data-plato') === 'pastas');
    const pizzas = platosArray.filter(pizza => pizza.getAttribute('data-plato') === 'pizzas');
    const postres = platosArray.filter(postre => postre.getAttribute('data-plato') === 'postres');
    mostrarPlatos(ensaladas, pastas, pizzas, postres, platosArray);
};

const mostrarPlatos = (ensaladas, pastas, pizzas, postres, todos) => {
    btnEnsaladas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        ensaladas.forEach(ensalada => contenedorPlatos.appendChild(ensalada));
    });

    btnPastas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        pastas.forEach(pasta => contenedorPlatos.appendChild(pasta));
    });

    btnPizzas.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        pizzas.forEach(pizza => contenedorPlatos.appendChild(pizza));
    });

    btnPostres.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        postres.forEach(postre => contenedorPlatos.appendChild(postre));
    });

    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorPlatos);
        todos.forEach(plato => contenedorPlatos.appendChild(plato));
    });
};

const limpiarHtml = (contenedor) => {
    contenedor.innerHTML = '';
};