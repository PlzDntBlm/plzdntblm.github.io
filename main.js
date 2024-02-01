document.addEventListener('DOMContentLoaded', () => {
    const htmlElements = {
        userInput: document.getElementById('userInput'),
        outputDiv: document.getElementById('output')
    };

    init();

    function init() {
        initializeEventListeners();
    }

    function initializeEventListeners() {
        htmlElements.userInput.addEventListener("keydown", async (event) => {
            htmlElements.userInput.scrollIntoView();
            // prevent newline
            if (event.keyCode == 13) {
                // prevent default behavior
                event.preventDefault();
            }
            if (event.key === "Enter") {
                readInput();
            }
        });
        htmlElements.userInput.addEventListener('input', (event) => {
            adjustTextareaHeight();
        }, false);
    }

    function readInput() {
        const inputValue = htmlElements.userInput.value.trim();
        
        if (inputValue === "") return;

        appendToOutput({innerHTML: inputValue});
        htmlElements.userInput.value = "";
    }

    function appendToOutput(obj = {}) {
        obj.innerHTML = obj.innerHTML || null;
        obj.type = obj.type || "default";
        obj.attr = obj.attr || "default";
        obj.class = obj.class || "machineParagraph";
        obj.image = obj.image || null;

        const paragraph = document.createElement('p');
        paragraph.innerHTML = obj.innerHTML;
        paragraph.className = obj.class;
        paragraph.setAttribute("data-program-name", `${obj.attr}>`);
        htmlElements.outputDiv.appendChild(paragraph);

        scrollToBottom();
    }

    function clearChat() {
        htmlElements.outputDiv.innerHTML = '';
    }

    function scrollToBottom() {
        htmlElements.outputDiv.scrollTop = htmlElements.outputDiv.scrollHeight;
    }

    function adjustTextareaHeight() {
        htmlElements.userInput.style.height = 'auto'; // Reset the height
        htmlElements.userInput.style.height = htmlElements.userInput.scrollHeight + 'px'; // Set to content height
    }
});