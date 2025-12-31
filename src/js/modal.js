const modal = document.getElementById("modal");
const title = document.getElementById("modal-title");
const input = document.getElementById("modal-input");
const inputDesc = document.getElementById("modal-input-desc");
const inputWrapper = document.getElementById("input-wrapper");
const form = document.getElementById("modal-form");
const cancelar = document.getElementById("cancelar");

let onConfirm = null;

export function abrirModal({
  titulo,
  descricao = "",
  usarInput = false,
  placeholder = "",
  valor = "",
  confirmar
}) {
  title.textContent = titulo;
  onConfirm = confirmar;

  if (usarInput) {
    inputWrapper.classList.remove("hidden");
    inputDesc.value = descricao;
    inputDesc.placeholder = "Descrição da atividade (opcional)";
    inputDesc.focus();

    input.placeholder = placeholder;
    input.value = valor;
    input.focus();
  } else {
    inputWrapper.classList.add("hidden");
  }

  modal.classList.remove("hidden");
}

function fecharModal() {
  modal.classList.add("hidden");
  form.reset();
  onConfirm = null;
}

cancelar.onclick = fecharModal;

form.onsubmit = (e) => {
  e.preventDefault();

  if (!inputWrapper.classList.contains("hidden")) {
    const title = input.value.trim();
    const desc = inputDesc.value.trim();

    if (!title) {
      input.classList.add("input-error");
      input.focus();
      return;
    }
    input.classList.remove("input-error");

    onConfirm?.(title, desc);
  } else {
    onConfirm?.();
  }

  fecharModal();
};