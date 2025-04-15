let ws;
let currentConversaId = null;
let currentUserId = null;
let reconnectInterval = 2000;

// Função para adicionar mensagens ao chat
function appendChatMessage(msg) {
  const chatBox = document.getElementById('chatBox');
  const p = document.createElement('p');
  p.textContent = msg;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Conecta ao WebSocket com lógica de reconexão
function connectWebSocket(conversaId) {
  ws = new WebSocket("ws://" + window.location.host + "/ws?conversaId=" + conversaId);

  ws.onopen = function() {
    appendChatMessage("Conectado ao chat.");
    reconnectInterval = 2000;
  };

  ws.onmessage = function(event) {
    try {
      const data = JSON.parse(event.data);
      const nomeUsuario = "Usuário " + data.remetente_id;
      const mensagem = data.conteudo;
      const dataMsg = new Date(data.created_at).toLocaleString();
      appendChatMessage(nomeUsuario + ": " + mensagem + " (" + dataMsg + ")");
    } catch(e) {
      console.error("Erro ao processar mensagem:", e);
      appendChatMessage("Servidor (raw): " + event.data);
    }
  };

  ws.onerror = function(error) {
    console.error("WebSocket Error:", error);
  };

  ws.onclose = function() {
    appendChatMessage("Conexão encerrada. Tentando reconectar...");
    setTimeout(function() {
      connectWebSocket(conversaId);
      reconnectInterval = Math.min(reconnectInterval * 2, 60000);
    }, reconnectInterval);
  };
}

// Abre o chat e inicia a conexão WebSocket
function openChat(conversaId) {
  currentConversaId = conversaId;
  document.getElementById('chatConversaId').innerText = conversaId;
  document.getElementById('chatSection').style.display = 'block';
  connectWebSocket(conversaId);
}

// Cria uma nova conversa ou acessa uma existente
document.getElementById('createConversaBtn').addEventListener('click', function() {
  const currentUser = parseInt(document.getElementById('createCurrentId').value);
  const destUser = parseInt(document.getElementById('createDestId').value);
  if (!currentUser || !destUser) {
    alert('Preencha os dois IDs.');
    return;
  }
  currentUserId = currentUser;
  const conversa = {
    participante1_tipo: "user",
    participante1_id: currentUser,
    participante2_tipo: "user",
    participante2_id: destUser
  };

  fetch("/conversas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conversa)
  })
  .then(response => {
    if (!response.ok) throw new Error("Erro ao criar conversa");
    return response.json();
  })
  .then(data => {
    alert("Conversa iniciada! ID: " + data.id);
    openChat(data.id);
  })
  .catch(error => {
    console.error(error);
    alert("Erro ao criar conversa.");
  });
});

// Acessa uma conversa existente
document.getElementById('accessConversaBtn').addEventListener('click', function() {
  const conversaId = parseInt(document.getElementById('conversaId').value);
  if (!conversaId) {
    alert("Informe o ID da conversa.");
    return;
  }
  fetch(`/conversa/${conversaId}`)
  .then(response => {
    if (!response.ok) throw new Error("Conversa não encontrada");
    return response.json();
  })
  .then(data => {
    openChat(data.id);
  })
  .catch(error => {
    console.error(error);
    alert("Conversa não encontrada.");
  });
});

// Envia mensagem via WebSocket em formato JSON
document.getElementById('sendChatBtn').addEventListener('click', function() {
  const message = document.getElementById('chatMessage').value;
  if (!message.trim()) return;
  if (ws && ws.readyState === WebSocket.OPEN) {
    const msgObj = {
      conversa_id: currentConversaId,
      remetente_tipo: "user",
      remetente_id: currentUserId,
      conteudo: message
    };
    ws.send(JSON.stringify(msgObj));
    appendChatMessage("Você: " + message);
    document.getElementById('chatMessage').value = '';
  } else {
    alert("WebSocket não está conectado.");
  }
});

// Permite enviar mensagem com a tecla Enter
document.getElementById('chatMessage').addEventListener('keypress', function(e) {
  if (e.key === "Enter") {
    document.getElementById('sendChatBtn').click();
  }
});
