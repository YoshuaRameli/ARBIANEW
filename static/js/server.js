const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
const uri = 'YOUR_MONGODB_URI_HERE'; // Reemplaza con tu URI de MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado exitosamente'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Ejemplo de modelo Mongoose
const MessageSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

// Rutas API
app.post('/api/messages', async (req, res) => {
  const newMessage = new Message({
    content: req.body.content
  });

  try {
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar el mensaje', error });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los mensajes', error });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
