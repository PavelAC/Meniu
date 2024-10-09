export class HtmlLoader {
    loadmeniu(url, elementId, callback) {
        console.log(`Attempting to load HTML from ${url}`); // Add this line to check if the function is called

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(`XHR readyState: ${xhr.readyState}, status: ${xhr.status}`); // Add this line for debugging

            if (xhr.readyState === 4 && xhr.status === 200) {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = xhr.responseText;
                    console.log("HTML loaded into", elementId); // Add this to verify loading
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
