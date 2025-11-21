document.querySelector('.back').addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', function() {
    const topBtn = document.getElementById('topBtn');
    
    if (!topBtn) {
        console.error('Кнопка topBtn не найдена!');
        return;
    }
    
    console.log('Кнопка найдена, скрипт запущен');
    
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
