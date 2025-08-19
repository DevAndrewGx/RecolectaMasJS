document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageContainer = document.getElementById('message');
    const loginBtn = document.querySelector('.login-btn');

    function mostrarMensaje(mensaje, tipo = 'error') {
        messageContainer.textContent = mensaje;
        messageContainer.className = `message-container ${tipo}`;
        messageContainer.style.display = 'block';
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const correo = document.getElementById('correo').value.trim();
        const password = document.getElementById('password').value;

        if (!correo || !password) {
            mostrarMensaje('Por favor, completa todos los campos');
            return;
        }

        try {
            loginBtn.disabled = true;
            loginBtn.textContent = 'Ingresando...';

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });

            const datos = await response.json();

            if (response.ok && datos.success) {
                localStorage.setItem('authToken', datos.token);
                mostrarMensaje('Login exitoso. Redirigiendo...', 'success');
                setTimeout(() => window.location.href = '/html/inicio.html', 1000);
            } else {
                mostrarMensaje(datos.message);
            }
        } catch (error) {
            console.error('Error:', error);
            mostrarMensaje('No se pudo conectar al servidor');
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Ingresar';
        }
    });
});
