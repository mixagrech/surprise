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
    const isMobile = window.innerWidth <= 480;
    
    Object.entries(dictionary).forEach(([selector, value]) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            if (selectedLang === 'ru' && isMobile && selector.startsWith('.textLong')) {
                element.innerHTML = value;
            } 
            else if (selectedLang === 'ru' && isMobile && selector.startsWith('.technologies') && selector.endsWith(' p')) {
                const cleanValue = value.replace(/style=['"][^'"]*['"]/g, '');
                element.innerHTML = cleanValue;
                element.style.fontSize = 'calc(1rem - 0rem)';
            }
            else if (selectedLang === 'ru' && selector.startsWith('.textLong')) {
                const cleanValue = value.replace(/style=['"][^'"]*['"]/g, '');
                element.innerHTML = cleanValue;
                element.style.marginLeft = '-0vw';
            }
            else {
                if (typeof value === 'object' && value.text !== undefined) {
                    if (value.html) {
                        element.innerHTML = value.html;
                    } else {
                        element.textContent = value.text;
                    }
                } else {
                    const cleanValue = typeof value === 'string' 
                        ? value.replace(/style=['"][^'"]*['"]/g, '')
                        : value;
                    
                    if (typeof cleanValue === 'string' && /<[a-z][\s\S]*>/i.test(cleanValue)) {
                        element.innerHTML = cleanValue;
                    } else {
                        element.textContent = cleanValue;
                    }
                }
                
                if (!isMobile || selectedLang === 'en') {
                    element.style.fontSize = '';
                    element.style.marginLeft = '';
                }
            }
            
            if (element.scrollWidth > element.clientWidth) {
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
        '.bottomData': 'Total transaction volume <b>0</b>',
        '.nearestPlan1 p': 'Update your profile page',
        '.nearestPlan2 p': 'New types of quest tasks',
        '.nearestPlan3 p': 'Bug fixes',
        '.textLong1': "We're laying the foundation for a truly competitive arena.<br>In a future update, we'll introduce the <b>Global Leaderboard</b> — a system<br>that will take competition to a new level. Compare your achievements with players<br>from around the world in two key categories.",
        '.textLong2': "We're creating a fully-fledged game economy.<br>In the next major update, we'll introduce a <b>decentralized P2P marketplace</b>,<br>where players will have full control over their assets.",
        '.textLong3': "We'll give you new ways to stand out and show off your style.<br>In the next update, an <b>exclusive accessories store</b> will open in your profile,<br>where you can personalize your gaming space.",
        '.textLong4': "We are creating new value and elite status by introducing<br><b>VIP Status</b> — a system of exclusive privileges for the most dedicated players.<br>Unlock access to unique opportunities that will elevate<br>your gaming experience to a new level. Special visual elements,<br>expanded limits, and exclusive economic advantages — all this will become available<br>with obtaining the status.",
        '.technologies1 p': "Multi-level authentication and authorization system",
        '.technologies2 p': "Direct payments and deposits through the TON Parliament",
        '.technologies3 p': "Stable operation even under high loads",
        '.technologies4 p': "Unique game mechanics",
        '.technologies5 p': "Fast confirmation of transactions",
        '.technologies6 p': "Optimized performance for a smooth gaming experience",
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
        '.bottomData': 'Общий объем транзакций <b>0</b>',
        '.nearestPlan1 p': 'Обновление страницы профиля',
        '.nearestPlan2 p': 'Новые типы заданий квестов',
        '.nearestPlan3 p': 'Устранение багов',
        '.textLong1': "<p class='textLong1' style='font-size: 0.56rem; margin-left: 0px;'>Мы готовим фундамент для настоящей соревновательной арены.<br>В будущем обновлении мы представим <b>Глобальную Таблицу Лидеров</b> — систему,<br>которая выведет конкуренцию на новый уровень. Сравнивайте свои достижения с игроками<br>со всего мира в двух ключевых категориях.</p>",
        '.textLong2': "<p class='textLong2' style='font-size: 0.6rem; margin-left: 0px;'>Мы создаем полноценную игровую экономику.<br>В следующем крупном обновлении мы представим <b>децентрализованный P2P маркетплейс</b>,<br>где игроки получат полный контроль над своими активами.</p>",
        '.textLong3': "<p class='textLong3' style='font-size: 0.6rem; margin-left: 0px;'>Мы дадим вам новые способы выделиться и продемонстрировать свой стиль.<br>В ближайшем обновлении в вашем профиле откроется <b>магазин эксклюзивных аксессуаров</b>,<br>где вы сможете персонализировать свое игровое пространство.</p>",
        '.textLong4': "<p class='textLong4' style='font-size: 0.628rem; margin-left: 0px;'>Мы создаём новую ценность и элитный статус введением<br><b>VIP Статуса</b> — системы эксклюзивных привилегий для самых преданных игроков.<br>Откройте доступ к уникальным возможностям, которые выведут<br>ваш игровой опыт на новый уровень. Особые визуальные элементы,<br>расширенные лимиты и эксклюзивные экономические преимущества — всё это станет доступно<br>с получением статуса.</p>",
        '.technologies1 p': "Многоуровневая система аутентификации и авторизации",
        '.technologies2 p': "Прямые выплаты и депозиты через блокчейн TON",
        '.technologies3 p': "Стабильная работа даже при высоких нагрузках",
        '.technologies4 p': "Уникальная игровая механика",
        '.technologies5 p': "Быстрое подтверждение операций",
        '.technologies6 p': "Оптимизированная производительность для комфортной игры",
    }
};

window.addEventListener('resize', function() {
    const currentLang = localStorage.getItem('userLanguage') || 'en';
    setLanguage(currentLang);
});
