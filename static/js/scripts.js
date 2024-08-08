document.getElementById("sendButton").addEventListener("click", function() {
    const loader = document.querySelector(".loader");

    // Añadir la clase que activa el cambio de color
    loader.classList.add("breathing");

    // Después de 3 segundos, quitar la clase para regresar al estado original
    setTimeout(() => {
        loader.classList.remove("breathing");
    }, 3000);

    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        addMessageToChat(message, 'user'); // Agregar el mensaje del usuario al chat
        sendToChatGPT(message);
        messageInput.value = ''; // Limpiar la caja de texto después de enviar
    }
});

async function sendToChatGPT(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` // Tu clave de API
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        console.log('Estado de la respuesta:', response.status);

        if (!response.ok) {
            // Muestra un error si la respuesta no es exitosa
            const errorText = await response.text();
            console.error('Error en la respuesta:', errorText);
            throw new Error(`Error de red: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;
        console.log('Respuesta de ChatGPT: ', reply);
        
        // Muestra la respuesta en el contenedor de la página
        addMessageToChat(reply, 'chatgpt');
        speakText(reply); // Convierte la respuesta de texto a voz
    } catch (error) {
        console.error('Error al comunicarse con ChatGPT:', error);
        alert('Hubo un error al obtener la respuesta. Inténtalo de nuevo más tarde.');
    }
}

function addMessageToChat(message, type) {
    const responseContainer = document.getElementById('responseContainer');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    responseContainer.appendChild(messageElement);

    // Desplaza el contenedor hacia abajo para mostrar el último mensaje
    responseContainer.scrollTop = responseContainer.scrollHeight;
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Establece el idioma para la síntesis
    window.speechSynthesis.speak(utterance);
}
