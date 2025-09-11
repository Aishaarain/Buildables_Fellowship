 let quotesCache = [];

    window.generateQuote = async function () { 
      try {
        if (quotesCache.length === 0) {
          const res = await fetch(
            "https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/quotes")
          );
          const dataWrapped = await res.json();
          quotesCache = JSON.parse(dataWrapped.contents);
        }
        const randomIndex = Math.floor(Math.random() * quotesCache.length);
        const quote = quotesCache[randomIndex];
        document.getElementById("quote").innerText = `"${quote.q}" — ${quote.a}`;
      } catch (error) {
        document.getElementById("quote").innerText = "⚠️ " + error.message;
      }
    };

    // FAQ Toggle
    document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", function() {
      const answer = this.nextElementSibling;
      answer.classList.toggle("hidden");
    });
  });
});


    // Todo List
    function addTodo() {
      const input = document.getElementById("todoInput");
      if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
      }
      const li = document.createElement("li");
      li.className = "flex justify-between items-center bg-gray-100 px-3 py-2 rounded-lg";
      li.innerHTML = `
        <span>${input.value}</span>
        <div class="space-x-2">
          <button onclick='markDone(this)' class="px-2 py-1 bg-blue-500 text-white rounded">Done</button>
          <button onclick='removeTask(this)' class="px-2 py-1 bg-red-500 text-white rounded">X</button>
        </div>
      `;
      document.getElementById("todoList").appendChild(li);
      input.value = "";
    }
    function markDone(btn) {
      btn.closest("li").classList.toggle("line-through");
      btn.closest("li").classList.toggle("text-gray-500");
    }
    function removeTask(btn) {
      btn.closest("li").remove();
    }

    // Popup
    function openPopup() {
      document.getElementById("popup").classList.remove("hidden");
      document.getElementById("popup").classList.add("flex");
    }
    function closePopup() {
      document.getElementById("popup").classList.add("hidden");
    }
    function changePopupText() {
      document.getElementById("popupText").innerText = "Text Changed ✔";
    }