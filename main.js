import { HtmlLoader } from "./loader.js";

document.addEventListener("DOMContentLoaded", function() {
    let menu = new HtmlLoader();

    function attachMenuEventListeners() {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach((item) => {
            item.addEventListener('mouseover', (event) => {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'block';
                }
            });

            item.addEventListener('mouseout', (event) => {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            });

            const submenuItems = item.querySelectorAll('.submenu > li');
            submenuItems.forEach((subitem) => {
                subitem.addEventListener('mouseover', (event) => {
                    const subsubmenu = subitem.querySelector('.subsubmenu');
                    if (subsubmenu) {
                        subsubmenu.style.display = 'block';
                    }
                });

                subitem.addEventListener('mouseout', (event) => {
                    const subsubmenu = subitem.querySelector('.subsubmenu');
                    if (subsubmenu) {
                        subsubmenu.style.display = 'none'; 
                    }
                });
            });
        });
    }

    function loadMenu() {
        document.getElementById('menu').innerHTML = '';

        const existingSmallLink = document.querySelector('link[data-menu="small"]');
        const existingBigLink = document.querySelector('link[data-menu="big"]');
        if (existingSmallLink) existingSmallLink.remove();
        if (existingBigLink) existingBigLink.remove();

        if (window.innerWidth <= 500) {
            menu.loadmeniu('./menu-small.html', 'menu', function() {
                console.log("Small menu loaded");

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = './small.css';
                link.setAttribute('data-menu', 'small');
                document.head.appendChild(link);

                console.log("Small menu CSS loaded");
                const hamburger = document.getElementById('hamburger');
                const menuContainer = document.getElementById('menu-container');
        
                hamburger.addEventListener('click', function () {
                    menuContainer.classList.toggle('expanded');
                });
                
                attachMenuEventListeners();
            });
        } else {
            menu.loadmeniu('./menu.html', 'menu', function() {
                console.log("Big menu loaded");

                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = './big.css';
                link.setAttribute('data-menu', 'big');
                document.head.appendChild(link);

                console.log("Big menu CSS loaded");

                attachMenuEventListeners();
            });
        }
    }
    loadMenu();

    window.addEventListener('resize', function() {
        loadMenu();
    });
});
