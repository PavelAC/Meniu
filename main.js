import { HtmlLoader } from "./loader.js";

document.addEventListener("DOMContentLoaded", function() {
    let menu = new HtmlLoader();

    function loadMenu() {
        const existingMenu = document.getElementById('menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        if (window.innerWidth <= 500) {
            menu.loadmeniu('./menu-small.html', 'menu-container', function() {
                console.log("small menu loaded");

                // Toggle menu visibility on hamburger click
                const hamburger = document.getElementById('hamburger');
                const menuElement = document.getElementById('menu');
                if (hamburger) {
                    hamburger.addEventListener('click', function() {
                        menuElement.classList.toggle('expanded');
                        if (menuElement.classList.contains('expanded')) {
                            console.log("menu expanded");
                        } else {
                            console.log("menu collapsed");
                        }
                    });
                } else {
                    console.error('Hamburger element not found');
                }
            });

            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = './small.css';
            link.setAttribute('data-menu', 'small');
            document.head.appendChild(link);

            console.log("small menu CSS loaded");
        } else {
            menu.loadmeniu('./menu.html', 'menu-container', function() {
                console.log("menu loaded");

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
            });
        }
    }

    loadMenu();
    window.addEventListener('resize', function() {
        loadMenu();
    });
});
