import { HtmlLoader } from "./loader.js";

document.addEventListener("DOMContentLoaded", function() {
    let menu = new HtmlLoader();

    function attachMenuEventListeners() {
        // Select all the main menu items after the menu is loaded
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach((item) => {
            // Show submenu when mouse enters the menu item
            item.addEventListener('mouseover', (event) => {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'block'; // Show submenu
                }
            });

            // Hide submenu when mouse leaves the menu item
            item.addEventListener('mouseout', (event) => {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'none'; // Hide submenu
                }
            });

            // For submenus that contain further submenus (sub-submenus)
            const submenuItems = item.querySelectorAll('.submenu > li');
            submenuItems.forEach((subitem) => {
                subitem.addEventListener('mouseover', (event) => {
                    const subsubmenu = subitem.querySelector('.subsubmenu');
                    if (subsubmenu) {
                        subsubmenu.style.display = 'block'; // Show sub-submenu
                    }
                });

                subitem.addEventListener('mouseout', (event) => {
                    const subsubmenu = subitem.querySelector('.subsubmenu');
                    if (subsubmenu) {
                        subsubmenu.style.display = 'none'; // Hide sub-submenu
                    }
                });
            });
        });
    }

    function loadMenu() {
        // Clear any previously loaded menu and CSS
        document.getElementById('menu').innerHTML = '';

        // Remove any previously loaded CSS
        const existingSmallLink = document.querySelector('link[data-menu="small"]');
        const existingBigLink = document.querySelector('link[data-menu="big"]');
        if (existingSmallLink) existingSmallLink.remove();
        if (existingBigLink) existingBigLink.remove();

        if (window.innerWidth <= 500) {
            menu.loadmeniu('./menu-small.html', 'menu', function() {
                console.log("Small menu loaded");

                // Create a new link element for small menu CSS
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
                
                attachMenuEventListeners(); // Attach event listeners for small menu
            });
        } else {
            menu.loadmeniu('./menu.html', 'menu', function() {
                console.log("Big menu loaded");

                // Create a new link element for big menu CSS
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = './big.css';
                link.setAttribute('data-menu', 'big');
                document.head.appendChild(link);

                console.log("Big menu CSS loaded");

                attachMenuEventListeners(); // Attach event listeners for big menu
            });
        }
    }

    // Load the appropriate menu initially
    loadMenu();

    // Reload menu when window is resized
    window.addEventListener('resize', function() {
        loadMenu();
    });
});
