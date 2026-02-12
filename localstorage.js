// ========== CAPTURA DE ELEMENTOS DEL DOM ==========
// Elementos de autenticación
const loginSection = document.getElementById('loginSection');
const mainContent = document.getElementById('mainContent');
const formLogin = document.getElementById('formLogin');
const formRegistro = document.getElementById('formRegistro');
const inputUser = document.getElementById('inputUser');
const inputPassword = document.getElementById('inputPassword');
const inputNombre = document.getElementById('inputNombre');
const inputEmail = document.getElementById('inputEmail');
const inputUserReg = document.getElementById('inputUserReg');
const inputPasswordReg = document.getElementById('inputPasswordReg');
const inputConfirmPassword = document.getElementById('inputConfirmPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnAgregar = document.getElementById('btnAgregar');

// Elementos de películas
const inputBuscar = document.getElementById('inputBuscar');
const selectGenero = document.getElementById('selectGenero');
const gridPeliculas = document.getElementById('gridPeliculas');
const carouselMovies = document.getElementById('carouselMovies');
const sinResultados = document.getElementById('sinResultados');

// Elementos del modal de película
const modalPelicula = document.getElementById('modalPelicula');
const modalTitulo = document.getElementById('modalTitulo');
const formPelicula = document.getElementById('formPelicula');
const inputTitulo = document.getElementById('inputTitulo');
const inputGenero = document.getElementById('inputGenero');
const inputDirector = document.getElementById('inputDirector');
const inputAno = document.getElementById('inputAno');
const inputCalificacion = document.getElementById('inputCalificacion');
const inputDescripcion = document.getElementById('inputDescripcion');
const inputImagen = document.getElementById('inputImagen');
const btnGuardarPelicula = document.getElementById('btnGuardarPelicula');

// Elementos del modal de detalles
const detallesTitulo = document.getElementById('detallesTitulo');
const detallesImagen = document.getElementById('detallesImagen');
const detallesGenero = document.getElementById('detallesGenero');
const detallesDirector = document.getElementById('detallesDirector');
const detallesAno = document.getElementById('detallesAno');
const detallesCalificacion = document.getElementById('detallesCalificacion');
const detallesDescripcion = document.getElementById('detallesDescripcion');

// ========== VARIABLES GLOBALES ==========
let listaPeliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || null;
let editIndex = null;
let bootstrapModal = null;
let bootstrapModalDetalles = null;

// ========== DATOS INICIALES ==========
function cargarPeliculasIniciales() {
    if (listaPeliculas.length === 0) {
        listaPeliculas = [
            {
                id: 1,
                titulo: "Inception",
                genero: "Ciencia Ficción",
                director: "Christopher Nolan",
                ano: 2010,
                calificacion: 8.8,
                descripcion: "Dom Cobb es un ladrón con la capacidad de entrar en los sueños de las personas y extraer información valiosa. Su nueva misión es plantar una idea en la mente de un CEO.",
                imagen: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg"
            },
            {
                id: 2,
                titulo: "The Godfather",
                genero: "Drama",
                director: "Francis Ford Coppola",
                ano: 1972,
                calificacion: 9.2,
                descripcion: "El patriarca de una poderosa familia mafiosa transfiere el control de su imperio a su hijo reacio.",
                imagen: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
            },
            {
                id: 3,
                titulo: "The Dark Knight",
                genero: "Acción",
                director: "Christopher Nolan",
                ano: 2008,
                calificacion: 9.0,
                descripcion: "Batman se une al fiscal de distrito Harvey Dent para combatir al caótico Joker.",
                imagen: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
            },
            {
                id: 4,
                titulo: "Pulp Fiction",
                genero: "Drama",
                director: "Quentin Tarantino",
                ano: 1994,
                calificacion: 8.9,
                descripcion: "Las vidas de dos asesinos a sueldo, un boxeador y la esposa de un gánster se entrelazan en Los Ángeles.",
                imagen: "https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsdar.jpg"
            },
            {
                id: 5,
                titulo: "Forrest Gump",
                genero: "Drama",
                director: "Robert Zemeckis",
                ano: 1994,
                calificacion: 8.8,
                descripcion: "Un hombre con baja inteligencia atraviesa décadas de la historia de Estados Unidos.",
                imagen: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
            },
            {
                id: 6,
                titulo: "Superbad",
                genero: "Comedia",
                director: "Greg Mottola",
                ano: 2007,
                calificacion: 7.6,
                descripcion: "Dos adolescentes inseparables intentan despedirse a lo grande antes de ir a la universidad.",
                imagen: "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFerBp4PT.jpg"
            }
        ];
        localStorage.setItem('peliculas', JSON.stringify(listaPeliculas));
    }
}

function cargarUsuariosIniciales() {
    if (usuariosRegistrados.length === 0) {
        usuariosRegistrados = [
            { nombre: "Admin", email: "admin@cineflix.com", usuario: "admin", password: "admin123" },
            { nombre: "Usuario", email: "usuario@test.com", usuario: "usuario", password: "1234" },
            { nombre: "Demo", email: "demo@test.com", usuario: "demo", password: "demo" }
        ];
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
    }
}

// ========== FUNCIONES DE AUTENTICACIÓN ==========
function iniciarSesion(e) {
    e.preventDefault();
    
    const usuario = inputUser.value.trim();
    const password = inputPassword.value.trim();
    
    const usuarioEncontrado = usuariosRegistrados.find(u => u.usuario === usuario && u.password === password);
    
    if (usuarioEncontrado) {
        usuarioActual = usuarioEncontrado;
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        
        loginSection.style.display = 'none';
        mainContent.style.display = 'block';
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        
        if (usuario === 'admin') {
            btnAgregar.style.display = 'block';
        } else {
            btnAgregar.style.display = 'none';
        }
        
        mostrarPeliculas();
        mostrarSlider();
        
        inputUser.value = '';
        inputPassword.value = '';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function registrarUsuario(e) {
    e.preventDefault();
    
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const usuario = inputUserReg.value.trim();
    const password = inputPasswordReg.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();
    
    if (!nombre || !email || !usuario || !password || !confirmPassword) {
        alert('Todos los campos son obligatorios');
        return;
    }
    
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    const usuarioExistente = usuariosRegistrados.find(u => u.usuario === usuario);
    if (usuarioExistente) {
        alert('El nombre de usuario ya está registrado');
        return;
    }
    
    const emailExistente = usuariosRegistrados.find(u => u.email === email);
    if (emailExistente) {
        alert('El email ya está registrado');
        return;
    }
    
    const nuevoUsuario = {
        nombre,
        email,
        usuario,
        password
    };
    
    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
    
    alert('Registro exitoso. Por favor inicia sesión.');
    
    inputNombre.value = '';
    inputEmail.value = '';
    inputUserReg.value = '';
    inputPasswordReg.value = '';
    inputConfirmPassword.value = '';
    
    document.getElementById('login-tab').click();
}

function cerrarSesion() {
    usuarioActual = null;
    localStorage.removeItem('usuarioActual');
    
    loginSection.style.display = 'flex';
    mainContent.style.display = 'none';
    btnLogin.style.display = 'block';
    btnLogout.style.display = 'none';
    btnAgregar.style.display = 'none';
}

// ========== FUNCIONES CRUD DE PELÍCULAS ==========
function guardarPelicula() {
    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value;
    const director = inputDirector.value.trim();
    const ano = parseInt(inputAno.value);
    const calificacion = parseFloat(inputCalificacion.value);
    const descripcion = inputDescripcion.value.trim();
    const imagen = inputImagen.value.trim();
    
    if (!titulo || !genero || !director || !ano || !calificacion || !descripcion || !imagen) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const nuevaPelicula = {
        id: editIndex !== null ? listaPeliculas[editIndex].id : Date.now(),
        titulo,
        tituloLower: titulo.toLowerCase(),
        genero,
        director,
        ano,
        calificacion,
        descripcion,
        imagen,
        fechaAgregada: new Date().toISOString()
    };
    
    if (editIndex !== null) {
        listaPeliculas[editIndex] = nuevaPelicula;
        editIndex = null;
        modalTitulo.textContent = 'Agregar Película';
    } else {
        listaPeliculas.push(nuevaPelicula);
    }
    
    localStorage.setItem('peliculas', JSON.stringify(listaPeliculas));
    
    bootstrapModal.hide();
    limpiarFormularioPelicula();
    mostrarPeliculas();
    mostrarSlider();
}

function editarPelicula(index) {
    const pelicula = listaPeliculas[index];
    
    inputTitulo.value = pelicula.titulo;
    inputGenero.value = pelicula.genero;
    inputDirector.value = pelicula.director;
    inputAno.value = pelicula.ano;
    inputCalificacion.value = pelicula.calificacion;
    inputDescripcion.value = pelicula.descripcion;
    inputImagen.value = pelicula.imagen;
    
    editIndex = index;
    modalTitulo.textContent = 'Editar Película';
    bootstrapModal.show();
}

function eliminarPelicula(index) {
    if (confirm('¿Estás seguro de eliminar esta película?')) {
        listaPeliculas.splice(index, 1);
        localStorage.setItem('peliculas', JSON.stringify(listaPeliculas));
        mostrarPeliculas();
        mostrarSlider();
    }
}

function verDetalles(index) {
    const pelicula = listaPeliculas[index];
    
    detallesTitulo.textContent = pelicula.titulo;
    detallesImagen.src = pelicula.imagen;
    detallesImagen.alt = pelicula.titulo;
    detallesGenero.textContent = pelicula.genero;
    detallesDirector.textContent = pelicula.director;
    detallesAno.textContent = pelicula.ano;
    detallesCalificacion.textContent = pelicula.calificacion;
    detallesDescripcion.textContent = pelicula.descripcion;
    
    bootstrapModalDetalles.show();
}

function limpiarFormularioPelicula() {
    inputTitulo.value = '';
    inputGenero.value = '';
    inputDirector.value = '';
    inputAno.value = '';
    inputCalificacion.value = '';
    inputDescripcion.value = '';
    inputImagen.value = '';
}

// ========== FUNCIONES DE VISUALIZACIÓN ==========
function mostrarPeliculas() {
    const busqueda = inputBuscar.value.trim().toLowerCase();
    const generoFiltro = selectGenero.value;
    
    let peliculasFiltradas = [...listaPeliculas];
    
    if (busqueda) {
        peliculasFiltradas = peliculasFiltradas.filter(p => 
            p.titulo.toLowerCase().includes(busqueda) || 
            p.director.toLowerCase().includes(busqueda)
        );
    }
    
    if (generoFiltro) {
        peliculasFiltradas = peliculasFiltradas.filter(p => p.genero === generoFiltro);
    }
    
    gridPeliculas.innerHTML = '';
    
    if (peliculasFiltradas.length === 0) {
        sinResultados.style.display = 'block';
        return;
    }
    
    sinResultados.style.display = 'none';
    
    peliculasFiltradas.forEach((pelicula, index) => {
        const indexOriginal = listaPeliculas.findIndex(p => p.id === pelicula.id);
        
        const col = document.createElement('div');
        col.classList.add('col-md-6', 'col-lg-4', 'col-xl-3');
        
        const card = document.createElement('div');
        card.classList.add('movie-card');
        
        card.innerHTML = `
            <img src="${pelicula.imagen}" class="movie-image" alt="${pelicula.titulo}" onerror="this.src='https://via.placeholder.com/300x450?text=Sin+Imagen'">
            <div class="movie-content">
                <h5 class="movie-title">${pelicula.titulo}</h5>
                <span class="movie-genre">${pelicula.genero}</span>
                <div class="movie-meta">
                    <i class="bi bi-calendar"></i> ${pelicula.ano} | 
                    <i class="bi bi-star-fill text-warning"></i> ${pelicula.calificacion}
                </div>
                <div class="movie-description">${pelicula.descripcion}</div>
                <div class="movie-actions">
                    <button class="btn btn-sm btn-info" onclick="window.verDetalles(${indexOriginal})">
                        <i class="bi bi-eye"></i> Ver
                    </button>
                    ${usuarioActual && usuarioActual.usuario === 'admin' ? `
                        <button class="btn btn-sm btn-warning" onclick="window.editarPelicula(${indexOriginal})">
                            <i class="bi bi-pencil"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="window.eliminarPelicula(${indexOriginal})">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        col.appendChild(card);
        gridPeliculas.appendChild(col);
    });
}

function mostrarSlider() {
    const peliculasRecientes = [...listaPeliculas]
        .sort((a, b) => new Date(b.fechaAgregada || 0) - new Date(a.fechaAgregada || 0))
        .slice(0, 10);
    
    carouselMovies.innerHTML = '';
    
    peliculasRecientes.forEach((pelicula, index) => {
        const indexOriginal = listaPeliculas.findIndex(p => p.id === pelicula.id);
        
        const card = document.createElement('div');
        card.classList.add('slider-movie-card');
        card.onclick = () => window.verDetalles(indexOriginal);
        
        card.innerHTML = `
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}" onerror="this.src='https://via.placeholder.com/300x450?text=Sin+Imagen'">
            <div class="slider-movie-info">
                <h6>${pelicula.titulo}</h6>
                <small class="text-muted">${pelicula.genero}</small>
            </div>
        `;
        
        carouselMovies.appendChild(card);
    });
}

// ========== FUNCIÓN PARA EL SLIDER ==========
window.scrollSlider = function(direction) {
    const scrollAmount = 300;
    if (direction === -1) {
        carouselMovies.scrollLeft -= scrollAmount;
    } else {
        carouselMovies.scrollLeft += scrollAmount;
    }
};

// ========== EVENT LISTENERS ==========
formLogin.addEventListener('submit', iniciarSesion);
formRegistro.addEventListener('submit', registrarUsuario);
btnLogout.addEventListener('click', cerrarSesion);
btnGuardarPelicula.addEventListener('click', guardarPelicula);
inputBuscar.addEventListener('input', mostrarPeliculas);
selectGenero.addEventListener('change', mostrarPeliculas);

// Event listener para limpiar el formulario cuando se abre el modal
document.getElementById('modalPelicula').addEventListener('show.bs.modal', function() {
    if (editIndex === null) {
        limpiarFormularioPelicula();
        modalTitulo.textContent = 'Agregar Película';
    }
});

// Event listener para limpiar el editIndex cuando se cierra el modal
document.getElementById('modalPelicula').addEventListener('hidden.bs.modal', function() {
    editIndex = null;
    modalTitulo.textContent = 'Agregar Película';
    limpiarFormularioPelicula();
});

// Link para volver al login desde registro
document.getElementById('linkLogin').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-tab').click();
});

// ========== EXPONER FUNCIONES GLOBALES ==========
window.editarPelicula = editarPelicula;
window.eliminarPelicula = eliminarPelicula;
window.verDetalles = verDetalles;

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar modales de Bootstrap
    bootstrapModal = new bootstrap.Modal(document.getElementById('modalPelicula'));
    bootstrapModalDetalles = new bootstrap.Modal(document.getElementById('modalDetalles'));
    
    // Cargar datos iniciales
    cargarPeliculasIniciales();
    cargarUsuariosIniciales();
    
    // Verificar si hay sesión activa
    if (usuarioActual) {
        loginSection.style.display = 'none';
        mainContent.style.display = 'block';
        btnLogin.style.display = 'none';
        btnLogout.style.display = 'block';
        
        if (usuarioActual.usuario === 'admin') {
            btnAgregar.style.display = 'block';
        }
        
        mostrarPeliculas();
        mostrarSlider();
    } else {
        loginSection.style.display = 'flex';
        mainContent.style.display = 'none';
        btnLogin.style.display = 'block';
        btnLogout.style.display = 'none';
        btnAgregar.style.display = 'none';
    }
});