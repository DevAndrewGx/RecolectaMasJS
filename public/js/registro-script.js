// registro-script.js - Script del lado del cliente para manejar el formulario de registro

document.addEventListener('DOMContentLoaded', function() {
    const formularioRegistro = document.getElementById('registerForm');
    const messageContainer = document.getElementById('message');
    
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(this);
            const datosUsuario = {
                documento: parseInt(formData.get('documento')),
                nombre: formData.get('nombre').trim(),
                apellido: formData.get('apellido').trim(),
                telefono: formData.get('telefono').trim(),
                correo: formData.get('correo').trim(),
                direccion: formData.get('direccion').trim(),
                password: formData.get('password'),
                rol: formData.get('rol') || 'usuario',
                estado: formData.get('estado') || 'Activo'
            };
            
            // Validaciones básicas
            if (!validarDatos(datosUsuario)) {
                return;
            }
            
            try {
                // Mostrar indicador de carga
                mostrarCargando(true);
                
                // Enviar datos al servidor
                const response = await fetch('/api/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datosUsuario)
                });
                
                const resultado = await response.json();
                
                if (response.ok) {
                    mostrarMensaje('Usuario registrado exitosamente', 'success');
                    formularioRegistro.reset();
                    
                    // Redirigir al login después de 2 segundos
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                } else {
                    mostrarMensaje(resultado.error || 'Error al registrar usuario', 'error');
                }
                
            } catch (error) {
                console.error('Error:', error);
                mostrarMensaje('Error de conexión. Intenta nuevamente.', 'error');
            } finally {
                mostrarCargando(false);
            }
        });
    }
});

// Función para validar los datos del formulario
function validarDatos(datos) {
    // Validar documento (debe ser número positivo)
    if (!datos.documento || datos.documento <= 0) {
        mostrarMensaje('El documento debe ser un número válido', 'error');
        return false;
    }
    
    // Validar nombre y apellido (no vacíos)
    if (!datos.nombre || datos.nombre.length < 2) {
        mostrarMensaje('El nombre debe tener al menos 2 caracteres', 'error');
        return false;
    }
    
    if (!datos.apellido || datos.apellido.length < 2) {
        mostrarMensaje('El apellido debe tener al menos 2 caracteres', 'error');
        return false;
    }
    
    // Validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datos.correo || !emailRegex.test(datos.correo)) {
        mostrarMensaje('Ingresa un correo electrónico válido', 'error');
        return false;
    }
    
    // Validar teléfono (solo números, mínimo 10 dígitos)
    const telefonoRegex = /^\d{10,}$/;
    if (!datos.telefono || !telefonoRegex.test(datos.telefono)) {
        mostrarMensaje('El teléfono debe tener al menos 10 dígitos', 'error');
        return false;
    }
    
    // Validar contraseña (mínimo 6 caracteres)
    if (!datos.password || datos.password.length < 6) {
        mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
        return false;
    }
    
    // Validar dirección
    if (!datos.direccion || datos.direccion.length < 5) {
        mostrarMensaje('La dirección debe tener al menos 5 caracteres', 'error');
        return false;
    }
    
    return true;
}

// Función para mostrar mensajes al usuario
function mostrarMensaje(mensaje, tipo) {
    const messageContainer = document.getElementById('message');
    
    if (messageContainer) {
        messageContainer.textContent = mensaje;
        messageContainer.className = `message-container ${tipo}`;
        messageContainer.style.display = 'block';
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }
}

// Función para mostrar/ocultar indicador de carga
function mostrarCargando(mostrar) {
    const submitButton = document.querySelector('.register-btn');
    
    if (submitButton) {
        if (mostrar) {
            submitButton.disabled = true;
            submitButton.textContent = 'Registrando...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Continuar';
        }
    }
}

// Agregar validación en tiempo real para algunos campos
document.addEventListener('DOMContentLoaded', function() {
    // Validar documento en tiempo real (solo números)
    const documentoInput = document.getElementById('documento');
    if (documentoInput) {
        documentoInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Validar teléfono en tiempo real (solo números)
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Convertir nombres a formato título
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    
    [nombreInput, apellidoInput].forEach(input => {
        if (input) {
            input.addEventListener('blur', function() {
                this.value = formatearNombre(this.value);
            });
        }
    });
});

// Función para formatear nombres (Primera letra mayúscula)
function formatearNombre(nombre) {
    return nombre.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}