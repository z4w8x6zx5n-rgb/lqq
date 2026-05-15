function currentPageId() {
  return document.body.dataset.pageId || "index";
}

function markComplete() {
  const pageId = currentPageId();
  localStorage.setItem(`chem_complete_${pageId}`, "true");
  alert("已记录完成，本节学习完成。");
}

function saveReflection() {
  const pageId = currentPageId();
  const box = document.querySelector("#reflection");
  if (!box) return;
  localStorage.setItem(`chem_reflection_${pageId}`, box.value);
  alert("错题复盘已保存到本机浏览器。");
}

function loadReflection() {
  const pageId = currentPageId();
  const box = document.querySelector("#reflection");
  if (!box) return;
  box.value = localStorage.getItem(`chem_reflection_${pageId}`) || "";
}

function copyText(id) {
  const node = document.getElementById(id);
  if (!node) return;
  const text = node.innerText;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => alert("已复制重点内容。"));
  } else {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    alert("已复制重点内容。");
  }
}

function filterChapters() {
  const input = document.getElementById("chapterSearch");
  const grid = document.getElementById("chapterGrid");
  if (!input || !grid) return;
  const keyword = input.value.trim().toLowerCase();
  grid.querySelectorAll(".chapter-card").forEach((card) => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(keyword) ? "" : "none";
  });
}

function filterMemory(group) {
  const input = document.getElementById("memorySearch");
  const keyword = input ? input.value.trim().toLowerCase() : "";
  const selected = group || window.currentMemoryGroup || "全部";
  window.currentMemoryGroup = selected;
  document.querySelectorAll(".memory-card").forEach((card) => {
    const matchesGroup = selected === "全部" || card.dataset.group === selected;
    const matchesText = card.innerText.toLowerCase().includes(keyword);
    card.style.display = matchesGroup && matchesText ? "" : "none";
  });
}

function toggleMemoryKnown(cardId, checked) {
  localStorage.setItem(`chem_known_${cardId}`, checked ? "true" : "false");
  const card = document.querySelector(`[data-card-id="${cardId}"]`);
  if (card) card.classList.toggle("known", checked);
}

function restoreMemoryKnown() {
  document.querySelectorAll(".memory-card").forEach((card) => {
    const cardId = card.dataset.cardId;
    const checked = localStorage.getItem(`chem_known_${cardId}`) === "true";
    const input = card.querySelector('input[type="checkbox"]');
    if (input) input.checked = checked;
    card.classList.toggle("known", checked);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadReflection();
  restoreMemoryKnown();
});
