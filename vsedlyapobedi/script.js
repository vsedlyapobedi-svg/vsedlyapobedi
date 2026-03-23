(function(){
  const CARDS = [
    { type: "open",  image: "img/photo_2026-03-15_21-15-39 (2).jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-40.jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-43 (2).jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-44.jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-43.jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-42.jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-42 (2).jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-41.jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-41 (2).jpg" },
    { type: "open",  image: "img/photo_2026-03-15_21-15-39.jpg" },
    { type: "done",  image: "img/photo_2026-03-15_21-15-38 (2).jpg", date: "17/01/2026" }, 
    { type: "done",  image: "img/photo_2026-03-15_21-15-36.jpg", date: "05/12/2025" },
    { type: "done",  image: "img/photo_2026-03-15_21-15-36.jpg", date: "25/10/2025" },
    { type: "done",  image: "img/photo_2026-03-15_21-15-35 (3).jpg", date: "14/09/2025" },
    { type: "done",  image: "img/photo_2026-03-15_21-15-34.jpg", date: "03/08/2025" },
    { type: "done",  image: "img/photo_2026-03-15_21-15-33.jpg", date: "18/06/2025" },
    { type: "done",  image: "img/photo_2026-03-15_21-15-38.jpg", date: "11/05/2025" }
  ];

  const cardsOpen = document.getElementById("cards-open");
  const cardsDone = document.getElementById("cards-done");
  const openTemplate = document.getElementById("card-open-template");
  const doneTemplate = document.getElementById("card-done-template");
  const tabs = document.querySelectorAll(".tab");

  let currentTab = "open";

  function parseAndFormatDate(raw){
    if(!raw) return "";
    const onlyDigitsAndSeparators = raw.replace(/\s+/g,"");
    const dmy = onlyDigitsAndSeparators.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})$/);
    if(dmy){
      let dd = dmy[1].padStart(2,'0');
      let mm = dmy[2].padStart(2,'0');
      let yyyy = dmy[3];
      if(yyyy.length === 2) yyyy = '20' + yyyy;
      return `${dd}/${mm}/${yyyy}`;
    }
    const iso = new Date(raw);
    if(!isNaN(iso.getTime())){
      const dd = String(iso.getDate()).padStart(2,'0');
      const mm = String(iso.getMonth()+1).padStart(2,'0');
      const yyyy = iso.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    return raw;
  }

  function showTab(tabName){
    currentTab = tabName === "done" ? "done" : "open";
    tabs.forEach(t => {
      const isActive = t.dataset.tab === currentTab;
      t.classList.toggle("active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    if(currentTab === "open"){
      cardsOpen.classList.remove("hidden");
      cardsDone.classList.add("hidden");
      cardsOpen.setAttribute("aria-hidden","false");
      cardsDone.setAttribute("aria-hidden","true");
    } else {
      cardsDone.classList.remove("hidden");
      cardsOpen.classList.add("hidden");
      cardsDone.setAttribute("aria-hidden","false");
      cardsOpen.setAttribute("aria-hidden","true");
    }
  }

  function renderCards(){
    cardsOpen.innerHTML = "";
    cardsDone.innerHTML = "";
    CARDS.forEach(item => {
      if(item.type === "open"){
        const frag = openTemplate.content.cloneNode(true);
        const img = frag.querySelector(".thumb");
        if(img) img.src = item.image || "";
        cardsOpen.appendChild(frag);
      } else if(item.type === "done"){
        const frag = doneTemplate.content.cloneNode(true);
        const img = frag.querySelector(".thumb");
        const overlay = frag.querySelector(".overlay-text");
        if(img) img.src = item.image || "";
        if(overlay) overlay.textContent = "ВРУЧЕНО " + parseAndFormatDate(item.date || "");
        cardsDone.appendChild(frag);
      }
    });
    showTab(currentTab);
  }

  function addCardToData(card){
    if(!card || !card.type || !card.image) return;
    CARDS.push(Object.assign({}, card));
    renderCards();
  }

  function clearAllCards(){
    CARDS.length = 0;
    renderCards();
  }

  function initTabs(){
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const type = tab.dataset.tab === "done" ? "done" : "open";
        showTab(type);
      });
    });
  }

  document.addEventListener("click", function(e){
    const btn = e.target.closest(".btn-primary");
    if(!btn) return;
    window.open("support.html", "_blank");
  });

  document.addEventListener("DOMContentLoaded", function(){
    initTabs();
    renderCards();
    window.addEventListener("resize", () => showTab(currentTab));
    window.addEventListener("orientationchange", () => setTimeout(()=>showTab(currentTab), 120));
  });

  window.addCard = addCardToData;
  window.clearCards = clearAllCards;
  window.renderCards = renderCards;

})();

document.addEventListener("DOMContentLoaded", function () {
  const supportBtn = document.querySelector(".support-submit-btn");
  const supportModal = document.getElementById("supportModal");
  const supportModalClose = document.getElementById("supportModalClose");
  const supportOverlay = document.querySelector(".support-modal-overlay");
  const supportTextarea = document.querySelector(".support-textarea");
  const supportEmailInput = document.querySelector(".support-email-input");

  if (!supportBtn || !supportModal || !supportModalClose || !supportOverlay) return;

  supportBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const message = supportTextarea ? supportTextarea.value.trim() : "";
    const email = supportEmailInput ? supportEmailInput.value.trim() : "";
    if (!message || !email) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }
    supportModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  function closeSupportModal() {
    supportModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  supportModalClose.addEventListener("click", closeSupportModal);
  supportOverlay.addEventListener("click", closeSupportModal);
});