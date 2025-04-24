console.log("byMicaelPimentel");
window.onload = carregarTarefas();

function adicionar_tarefas() {
  const li = document.createElement("li");

  let tarefa = document.getElementById("inseri-tarefa").value.trim();

  //caso a variavel tarefa esteja vazia de um retorno e interrompe a execuáo da função!
  if (tarefa === "") return;

  li.textContent = tarefa;

  li.addEventListener("click", () => {
    li.classList.toggle("seguinte");
    salvarTarefas();
  });

  const btDelete = document.createElement("button");
  btDelete.textContent = "X";
  btDelete.onclick = () => {
    li.remove();
    salvarTarefas();
  };

  li.appendChild(btDelete);

  document.getElementById("lista-tarefas").appendChild(li);

  document.getElementById("inseri-tarefa").value = "";

  salvarTarefas();
}

//cookies
function setCookie(nome, valor, dias) {
  const data = new Date();
  data.setTime(data.getTime() + dias * 24 * 60 * 60 * 1000);
  const expira = "espires=" + data.toUTCString();
  document.cookie = `${nome} = ${encodeURIComponent(valor)};${expira};path=/`;
}

function getCookie(nome_) {
  let nomeEQ = nome_ + "=";
  let ca = document.cookie.split(";");
  for (let c of ca) {
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(nomeEQ) == 0) return decodeURIComponent(c.substring(nomeEQ.length));
}
  return "";
}

function salvarTarefas() {
  const itens = [];
  document.querySelectorAll("#lista-tarefas li").forEach(li => {
    const texto = li.firstChild.textContent.trim();
    const feita = li.classList.contains("seguinte");
    itens.push({ texto, feita });
  });
  setCookie("tarefas", JSON.stringify(itens), 7);
}

function carregarTarefas() {
  const tarefasSalvas =  getCookie("tarefas");
  if (!tarefasSalvas) return;

  const lista = JSON.parse(tarefasSalvas);
  lista.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.texto;

    if (item.feita) li.classList.add("seguinte");

    li.addEventListener("click", () => {
      li.classList.toggle("seguinte");
      salvarTarefas();
    });

    const btDelete = document.createElement("button");
    btDelete.textContent = "X";
    btDelete.onclick = () => {
      li.remove();
      salvarTarefas();
    };

    li.appendChild(btDelete);

    document.getElementById("lista-tarefas").appendChild(li);

    document.getElementById("inseri-tarefa").value = "";

    salvarTarefas();
  });
}
