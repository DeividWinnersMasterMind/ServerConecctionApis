const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Manejador para la ruta '/registro'
app.post('/registro', (req, res) => {
    // Recibir y procesar los datos enviados desde el cliente
    let data = req.body;

    console.log(JSON.stringify(data))

    fetch('https://p100-ld.irev.com/api/affiliates/v2/leads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '7voitrmdnhitdaftt9j5g84beoyg9axf3'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            /*  console.log('Respuesta del servidor:', data); */
            console.log(data)
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            res.status(500).send('Error al enviar la solicitud');
        });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Programar la tarea cron para enviar una solicitud HTTP cada 45 segundos
setInterval(() => {
    console.log('Ejecutando la tarea cron...');
    // Realizar una solicitud HTTP a tu propio servidor para mantenerlo activo
    app.get(PORT, (res) => {
        console.log(`Solicitud a ${PORT} exitosa. Estado: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error('Error al enviar la solicitud:', err.message);
    });
}, 45000);