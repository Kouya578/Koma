document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('mouseover', function() {
        sidebar.classList.add('expanded');
    });

    sidebar.addEventListener('mouseout', function() {
        sidebar.classList.remove('expanded');
    });
});


function loadContent(section) {
    const mainContent = document.getElementById('mainContent');
    
    switch (section) {
        case 'home':
            mainContent.innerHTML = `<h1>Here is the additional content for Home.</h1>
                                     <img src="./public/images/20190928_171648.jpg" alt="Image 1" class="Imageby1">
                                     <p>Hover over the Sidebar.</p>
                                     <p>Move your mouse over the sidebar to expand it and reveal the text.</p>`;
            break;
        case 'about':
            mainContent.innerHTML = `<p>Here is the additional content for About.</p>`;
            break;
        case 'services':
            mainContent.innerHTML = `<p><a class="LinkR" href="./index2.html">This is a link</a></p>`;
            break;
        case 'contact':
            mainContent.innerHTML = `<p>Here is the additional content for Contact.</p>`;
            break;
        default:
            mainContent.innerHTML = '';
    }
}
