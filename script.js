// Elements
const logList = document.getElementById('logList');
const logBox = document.getElementById('logBox');
const eventCounter = document.getElementById('eventCounter');
const clearBtn = document.getElementById('clearBtn');

const promoInput = document.getElementById('promoInput');
const regexResult = document.getElementById('regexResult');
const mouseBox = document.getElementById('mouseBox');
const demoForm = document.getElementById('demoForm');
const dropdown = document.getElementById('dropdown');
const toggleDetails = document.getElementById('toggleDetails');

let count = 0;

/**
 * Appends an entry to the live event log box
 * @param {string} eventName - Name of the DOM event
 * @param {string} target - Name of the HTML element
 * @param {string} info - Additional context
 */
function logEvent(eventName, target, info = '') {
    count++;
    eventCounter.textContent = count;

    const time = new Date().toLocaleTimeString().split(' ')[0];
    const li = document.createElement('li');
    li.className = 'log-item';
    li.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="log-event">${eventName}</span>
        <span class="log-target">#${target}</span>
        <span class="log-info">${info}</span>
    `;

    logList.appendChild(li);

    // Keep log scrolled to bottom
    logBox.scrollTop = logBox.scrollHeight;
}

// Clear Log Button
clearBtn.addEventListener('click', () => {
    logList.innerHTML = '';
    count = 0;
    eventCounter.textContent = '0';
});

// =======================================================
// REGULAR EXPRESSION VALIDATION
// Pattern: Exactly 3 uppercase letters, a hyphen, and 4 digits (e.g. SUM-2026)
// =======================================================
const promoRegex = /^[A-Z]{3}-\d{4}$/;

function validatePromoCode() {
    const val = promoInput.value.trim();
    if (promoRegex.test(val)) {
        regexResult.textContent = 'Valid Promo Code!';
        regexResult.className = 'status-badge valid';
    } else {
        regexResult.textContent = 'Invalid Promo Code';
        regexResult.className = 'status-badge invalid';
    }
}

// =======================================================
// ATTACHING THE 20 DISTINCT DOM EVENTS
// =======================================================

// 1. input - Fired when typing in input
promoInput.addEventListener('input', (e) => {
    logEvent('input', 'promoInput', `val: "${e.target.value}"`);
    validatePromoCode();
});

// 2. keydown - Fired when key is pressed down
promoInput.addEventListener('keydown', (e) => {
    logEvent('keydown', 'promoInput', `key: "${e.key}"`);
});

// 3. keyup - Fired when key is released
promoInput.addEventListener('keyup', (e) => {
    logEvent('keyup', 'promoInput', `key: "${e.key}"`);
});

// 4. focus - Fired when input gains focus
promoInput.addEventListener('focus', () => {
    logEvent('focus', 'promoInput', 'Input focused');
});

// 5. blur - Fired when input loses focus
promoInput.addEventListener('blur', () => {
    logEvent('blur', 'promoInput', 'Input lost focus');
});

// 6. copy - Fired when user copies text
promoInput.addEventListener('copy', () => {
    logEvent('copy', 'promoInput', 'Text copied');
});

// 7. paste - Fired when user pastes text
promoInput.addEventListener('paste', () => {
    logEvent('paste', 'promoInput', 'Text pasted');
});

// 8. select - Fired when user selects text inside input
promoInput.addEventListener('select', () => {
    logEvent('select', 'promoInput', 'Text highlighted');
});

// 9. click - Fired on single click
mouseBox.addEventListener('click', () => {
    logEvent('click', 'mouseBox', 'Single click');
});

// 10. dblclick - Fired on double click
mouseBox.addEventListener('dblclick', () => {
    logEvent('dblclick', 'mouseBox', 'Double click');
});

// 11. mousedown - Fired when mouse button is pressed down
mouseBox.addEventListener('mousedown', () => {
    logEvent('mousedown', 'mouseBox', 'Mouse button down');
});

// 12. mouseup - Fired when mouse button is released
mouseBox.addEventListener('mouseup', () => {
    logEvent('mouseup', 'mouseBox', 'Mouse button up');
});

// 13. mouseover - Fired when mouse enters element
mouseBox.addEventListener('mouseover', () => {
    logEvent('mouseover', 'mouseBox', 'Mouse hover enter');
});

// 14. mouseout - Fired when mouse leaves element
mouseBox.addEventListener('mouseout', () => {
    logEvent('mouseout', 'mouseBox', 'Mouse hover exit');
});

// 15. contextmenu - Fired on right click
mouseBox.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Prevents right-click browser menu
    logEvent('contextmenu', 'mouseBox', 'Right-click menu blocked');
});

// 16. wheel - Fired on mouse wheel scroll
mouseBox.addEventListener('wheel', (e) => {
    logEvent('wheel', 'mouseBox', `scroll delta: ${Math.round(e.deltaY)}`);
});

// 17. change - Fired when dropdown option changes
dropdown.addEventListener('change', (e) => {
    logEvent('change', 'dropdown', `selected: "${e.target.value}"`);
});

// 18. submit - Fired on form submission
demoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    logEvent('submit', 'demoForm', 'Form submission caught');
});

// 19. reset - Fired when form is reset
demoForm.addEventListener('reset', () => {
    logEvent('reset', 'demoForm', 'Form reset');
});

// 20. toggle - Fired on <details> element open/close
toggleDetails.addEventListener('toggle', () => {
    const state = toggleDetails.open ? 'opened' : 'closed';
    logEvent('toggle', 'toggleDetails', `Details ${state}`);
});