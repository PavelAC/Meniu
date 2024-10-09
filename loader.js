export class HtmlLoader {
    loadmeniu(url, elementId, callback) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = xhr.responseText;
                    if (callback) callback();
                } else {
                    console.error(`Element with id '${elementId}' not found.`);
                }
            } else if (xhr.readyState === 4) {
                console.error(`Failed to load '${url}': ${xhr.status}`);
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }
}