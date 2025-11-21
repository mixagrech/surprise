document.querySelector('.back').addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', function() {
    const topBtn = document.getElementById('topBtn');
    
    function toggleTopButton() {
        if (window.pageYOffset > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    window.addEventListener('scroll', toggleTopButton);
    topBtn.addEventListener('click', scrollToTop);
    
    toggleTopButton();
});



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
        });
    });
    
    localStorage.setItem('userLanguage', selectedLang);
    updateLanguageIndicator(selectedLang);
}

function updateLanguageIndicator(currentLang) {
    const langElement = document.querySelector('.lang');
    if (langElement) {
        langElement.textContent = currentLang === 'ru' ? 'Рус' : 'Eng';
    }
}

const locales = {
    en: {
        '.lang': 'Eng',
        '.back': 'Back',
        '.mainHeading': 'ROW Live Privacy Policy',
        '.lastUpdate': 'Last updated: November 20, 2025',
        '.generalInformation': '1. General Information',
        '.generalInfoText': 'ROW Live ("Game", "We", "Us", "Our") respects your privacy and is committed to protecting your personal data. This Privacy Policy describes how we collect, use, and protect information about you when using our game.',
        '.collectedInfo': '2. Information Collected',
        '.identData': '2.1. Identification Data',
        '.identDataText': 'When using the game, we collect:',
        '.identDataItem1': 'Telegram user ID',
        '.identDataItem2': 'Basic information to ensure game account functionality',
        '.gameData': '2.2. Game Data',
        '.gameDataText': 'We collect information about your gaming activity:',
        '.gameDataItem1': 'Game progress and statistics',
        '.gameDataItem2': 'Purchased skins and items',
        '.gameDataItem3': 'In-game currency balance (ROW)',
        '.gameDataItem4': 'Referral connections',
        '.gameDataItem5': 'Mini-game results',
        '.gameDataItem6': 'Transaction history',
        '.techData': '2.3. Technical Information (for administrative purposes)',
        '.techDataItem1': 'Session and activity data',
        '.techDataItem2': 'Operation timestamps',
        '.techDataItem3': 'Technical logs to ensure operational stability',
        '.infoUsage': '3. Information Usage',
        '.infoUsageText': 'We use the collected information to:',
        '.infoUsageItem1': 'Provide and improve gaming experience',
        '.infoUsageItem2': 'Process in-game transactions',
        '.infoUsageItem3': 'Manage referral system',
        '.infoUsageItem4': 'Prevent fraud and abuse',
        '.infoUsageItem5': 'Provide technical support and troubleshooting',
        '.infoUsageItem6': 'Analyze for gameplay improvements',
        '.blockchain': '4. Blockchain Transactions',
        '.tonPayments': '4.1. TON Payments',
        '.tonPaymentsText': 'When making payments in the TON network:',
        '.tonPaymentsItem1': 'We generate unique transaction codes',
        '.tonPaymentsItem2': 'Track payment status via TON API',
        '.tonPaymentsItem3': 'Store transaction hashes for verification',
        '.tonPaymentsItem4': 'Do not have access to your private keys or wallets',
        '.nftOperations': '4.2. NFT Operations',
        '.nftOperationsText': 'NFT skin operations are processed through:',
        '.nftOperationsItem1': 'TON blockchain for minting operations',
        '.nftOperationsItem2': 'Secure storage of digital asset ownership data',
        '.nftOperationsItem3': 'Transparent and verifiable transaction history',
        '.dataStorage': '5. Data Storage and Protection',
        '.storagePeriod': '5.1. Storage Period',
        '.storagePeriodText': 'We store your data while:',
        '.storagePeriodItem1': 'You are active in the game',
        '.storagePeriodItem2': 'Required to provide gaming services',
        '.storagePeriodItem3': 'Necessary to comply with legal requirements',
        '.securityMeasures': '5.2. Security Measures',
        '.securityMeasuresItem1': 'Encryption of transmitted data',
        '.securityMeasuresItem2': 'Secure servers with limited access',
        '.securityMeasuresItem3': 'Regular backup',
        '.securityMeasuresItem4': 'Strict access control to personal data',
        '.infoSharing': '6. Information Sharing',
        '.infoSharingText': 'We do not sell or transfer your personal data to third parties, except in cases of:',
        '.infoSharingItem1': 'Legal requirements compliance',
        '.infoSharingItem2': 'Using service providers necessary for technical functioning of the game',
        '.infoSharingItem3': 'Protecting our legal rights and interests',
        '.yourRights': '7. Your Rights',
        '.yourRightsText': 'You have the right to:',
        '.yourRightsItem1': 'Access your personal data',
        '.yourRightsItem2': 'Correct inaccurate information',
        '.yourRightsItem3': 'Delete game account and associated data',
        '.yourRightsItem4': 'Withdraw consent to data processing',
        '.cookies': '8. Cookies and Local Storage',
        '.cookiesText': 'The game uses:',
        '.cookiesItem1': 'Session cookies for authorization and security',
        '.cookiesItem2': 'Browser local storage to save game progress',
        '.cookiesItem3': 'Anonymous analytical data to improve gaming experience',
        '.international': '9. International Transfers',
        '.internationalText': 'Your data may be processed on servers located outside your country of residence. We ensure an adequate level of data protection in accordance with applicable personal data protection legislation.',
        '.policyChanges': '10. Policy Changes',
        '.policyChangesText': 'We reserve the right to update this Privacy Policy. We notify users of significant changes through in-game notifications or official communication channels.',
        '.contacts': '11. Contacts',
        '.contactsText': 'For questions related to privacy and data processing, contact:',
        '.contactsItem1': 'Through in-game support: <a href="https://t.me/RL_Cooperation">@RL_Cooperation</a>',
        '.contactsItem2': 'Through official project communication channels',
        '.agreementText': 'By continuing to use ROW Live, you confirm that you have read, understood, and agree to the terms of this Privacy Policy.'
    },
    ru: {
        '.lang': 'Рус',
        '.back': 'Назад',
        '.mainHeading': 'Политика конфиденциальности ROW Live',
        '.lastUpdate': 'Последнее обновление: 20 ноября 2025 г.',
        '.generalInformation': '1. Общая информация',
        '.generalInfoText': 'ROW Live ("Игра", "Мы", "Нас", "Наш") уважает вашу конфиденциальность и обязуется защищать ваши персональные данные. Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем информацию о вас при использовании нашей игры.',
        '.collectedInfo': '2. Собираемая информация',
        '.identData': '2.1. Идентификационные данные',
        '.identDataText': 'При использовании игры мы собираем:',
        '.identDataItem1': 'Идентификатор пользователя Telegram',
        '.identDataItem2': 'Базовую информацию для обеспечения работы игрового аккаунта',
        '.gameData': '2.2. Игровые данные',
        '.gameDataText': 'Мы собираем информацию о вашей игровой активности:',
        '.gameDataItem1': 'Игровой прогресс и статистика',
        '.gameDataItem2': 'Приобретенные скины и предметы',
        '.gameDataItem3': 'Баланс внутриигровой валюты (ROW)',
        '.gameDataItem4': 'Реферальные связи',
        '.gameDataItem5': 'Результаты мини-игр',
        '.gameDataItem6': 'История транзакций',
        '.techData': '2.3. Техническая информация (для административных целей)',
        '.techDataItem1': 'Данные о сессиях и активности',
        '.techDataItem2': 'Временные метки операций',
        '.techDataItem3': 'Технические логи для обеспечения стабильности работы',
        '.infoUsage': '3. Использование информации',
        '.infoUsageText': 'Мы используем собранную информацию для:',
        '.infoUsageItem1': 'Предоставления и улучшения игрового опыта',
        '.infoUsageItem2': 'Обработки внутриигровых транзакций',
        '.infoUsageItem3': 'Управления реферальной системой',
        '.infoUsageItem4': 'Предотвращения мошенничества и злоупотреблений',
        '.infoUsageItem5': 'Технической поддержки и устранения неисправностей',
        '.infoUsageItem6': 'Аналитики для улучшения игрового процесса',
        '.blockchain': '4. Блокчейн-транзакции',
        '.tonPayments': '4.1. Платежи в TON',
        '.tonPaymentsText': 'При совершении платежей в сети TON:',
        '.tonPaymentsItem1': 'Мы генерируем уникальные коды транзакций',
        '.tonPaymentsItem2': 'Отслеживаем статус платежей через TON API',
        '.tonPaymentsItem3': 'Храним хеши транзакций для верификации',
        '.tonPaymentsItem4': 'Не имеем доступа к вашим приватным ключам или кошелькам',
        '.nftOperations': '4.2. NFT операции',
        '.nftOperationsText': 'Операции с NFT скинами обрабатываются через:',
        '.nftOperationsItem1': 'TON blockchain для minting операций',
        '.nftOperationsItem2': 'Безопасное хранение данных о владении цифровыми активами',
        '.nftOperationsItem3': 'Прозрачную и проверяемую историю транзакций',
        '.dataStorage': '5. Хранение и защита данных',
        '.storagePeriod': '5.1. Период хранения',
        '.storagePeriodText': 'Мы храним ваши данные пока:',
        '.storagePeriodItem1': 'Вы активны в игре',
        '.storagePeriodItem2': 'Требуется для предоставления игровых услуг',
        '.storagePeriodItem3': 'Необходимо для выполнения законодательных требований',
        '.securityMeasures': '5.2. Меры безопасности',
        '.securityMeasuresItem1': 'Шифрование передаваемых данных',
        '.securityMeasuresItem2': 'Защищенные серверы с ограниченным доступом',
        '.securityMeasuresItem3': 'Регулярное резервное копирование',
        '.securityMeasuresItem4': 'Строгий контроль доступа к персональным данным',
        '.infoSharing': '6. Обмен информацией',
        '.infoSharingText': 'Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев:',
        '.infoSharingItem1': 'Выполнения требований законодательства',
        '.infoSharingItem2': 'Использования сервисных провайдеров, необходимых для технического функционирования игры',
        '.infoSharingItem3': 'Защиты наших законных прав и интересов',
        '.yourRights': '7. Ваши права',
        '.yourRightsText': 'Вы имеете право:',
        '.yourRightsItem1': 'На доступ к вашим персональным данным',
        '.yourRightsItem2': 'На исправление неточной информации',
        '.yourRightsItem3': 'На удаление игрового аккаунта и связанных данных',
        '.yourRightsItem4': 'На отзыв согласия на обработку данных',
        '.cookies': '8. Файлы cookie и локальное хранение',
        '.cookiesText': 'Игра использует:',
        '.cookiesItem1': 'Сессионные cookie для авторизации и безопасности',
        '.cookiesItem2': 'Локальное хранилище браузера для сохранения игрового прогресса',
        '.cookiesItem3': 'Анонимные аналитические данные для улучшения игрового опыта',
        '.international': '9. Международные передачи',
        '.internationalText': 'Ваши данные могут обрабатываться на серверах, расположенных за пределами вашей страны проживания. Мы обеспечиваем адекватный уровень защиты данных в соответствии с применимым законодательством о защите персональных данных.',
        '.policyChanges': '10. Изменения в политике',
        '.policyChangesText': 'Мы оставляем за собой право обновлять настоящую Политику конфиденциальности. О значительных изменениях мы уведомляем пользователей через игровые уведомления или на официальных каналах связи.',
        '.contacts': '11. Контакты',
        '.contactsText': 'По вопросам, связанным с конфиденциальностью и обработкой данных, обращайтесь:',
        '.contactsItem1': 'Через службу поддержки в игре: <a href="https://t.me/RL_Cooperation">@RL_Cooperation</a>',
        '.contactsItem2': 'Через официальные каналы связи проекта',
        '.agreementText': 'Продолжая использовать ROW Live, вы подтверждаете, что прочитали, поняли и согласны с условиями настоящей Политики конфиденциальности.'
    }
};

window.addEventListener('resize', function() {
    const currentLang = localStorage.getItem('userLanguage') || 'en';
    setLanguage(currentLang);
});
