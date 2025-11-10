function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const langChange = document.querySelector('.langChange');

langChange.addEventListener('click', function() {
    const currentLang = localStorage.getItem('userLanguage') || 'en';
    
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    
    setLanguage(newLang);
});

function initializeLanguage() {
    const savedLanguage = localStorage.getItem('userLanguage');
    
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        setLanguage('en');
    }
}

document.addEventListener('DOMContentLoaded', initializeLanguage);

function setLanguage(lang) {
    const selectedLang = lang.startsWith('ru') ? 'ru' : 'en';
    const dictionary = locales[selectedLang];
    
    Object.entries(dictionary).forEach(([selector, value]) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            if (typeof value === 'object' && value.text !== undefined) {
                if (value.html) {
                    element.innerHTML = value.html;
                } else {
                    element.textContent = value.text;
                }
                
                if (value.fontSize) {
                    element.style.fontSize = value.fontSize;
                } else {
                    element.style.fontSize = '';
                }
            } else {
                if (typeof value === 'string' && /<[a-z][\s\S]*>/i.test(value)) {
                    element.innerHTML = value;
                } else {
                    element.textContent = value;
                }
                element.style.fontSize = '';
            }
            
            if (typeof value === 'string' && element.scrollWidth > element.clientWidth) {
                element.style.fontSize = '12px';
            }
        });
    });
    
    updateAllTasksLanguage(selectedLang);
    localStorage.setItem('userLanguage', selectedLang);
    updateLanguageIndicator(selectedLang);
}

function updateAllTasksLanguage(language) {
    const taskNameElements = document.querySelectorAll('[data-name-en][data-name-ru]');
    
    taskNameElements.forEach(element => {
        const nameEn = element.getAttribute('data-name-en');
        const nameRu = element.getAttribute('data-name-ru');
        
        element.textContent = language === 'ru' ? nameRu : nameEn;
    });
}

function updateLanguageIndicator(currentLang) {
    const paddle1 = document.querySelector('.Paddle1Grup');
    const paddle2 = document.querySelector('.Paddle2Grup');
    const ruLang = document.querySelector('.RuLang');
    const enLang = document.querySelector('.EnLang');
    
    if (currentLang === 'ru') {
        if (ruLang) ruLang.style.fontWeight = 'bold';
        if (enLang) enLang.style.fontWeight = 'normal';
        if (paddle1) paddle1.style.opacity = '1';
        if (paddle2) paddle2.style.opacity = '0.7';
    } else {
        if (ruLang) ruLang.style.fontWeight = 'normal';
        if (enLang) enLang.style.fontWeight = 'bold';
        if (paddle1) paddle1.style.opacity = '0.7';
        if (paddle2) paddle2.style.opacity = '1';
    }
}

const locales = {
    en: {
        '.lang': 'Eng',
        '.welcomeText': 'Welcome to',
        '.mainTitle': '<span class="mainTitle">ROW-LIVE<br><p>Roadmap</p></span>',
        '.nearestName': 'Nearest plans for early 2026',
        '.longName': 'Roadmap (3-12 months)',
        '.technologiesText': 'About Us / Technologies',
        '.usingText': 'Using TON Connect',
        '.usingDataText': 'Average usage statistics',
        '.volumeD': 'Daily volume',
        '.transactionD': 'Daily transactions',
        '.bottomData': 'Total transaction volume <b>100000</b>',
    },
    ru: {
        '.lang': 'Рус',
        '.welcomeText': 'Добро пожаловать в',
        '.mainTitle': '<span class="mainTitle">ROW-LIVE<br><p>Дорожную карту</p></span>',
        '.nearestName': 'Планы на начало 2026 года',
        '.longName': 'Дорожная карта (3-12 месяцев)',
        '.technologiesText': 'О нас / Технологии',
        '.usingText': 'Использование TON Connect',
        '.usingDataText': 'Средняя статистика использования',
        '.volumeD': 'Дневной объем',
        '.transactionD': 'Ежедневные транзакции',
        '.bottomData': 'Общий объем транзакций <b>100000</b>',
    }
};
