require('dotenv').config()
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();


// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Manejador para la ruta '/registro'
app.post('/registro', async (req, res) => {
    try {
        let data = req.body;

        console.log(JSON.stringify(data));

        const response = await fetch('https://p100-ld.irev.com/api/affiliates/v2/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '7voitrmdnhitdaftt9j5g84beoyg9axf3'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        console.log(responseData);

        res.json(responseData);
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        res.status(500).send('Error al enviar la solicitud');
    }
});
const PORT = 3000

app.listen(3000, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

