/* 2024-07-30b */

(function() {
    'use strict';

    function modifyUrl() {
        let url = new URL(window.location.href);

        // Exclude cdn.barbora.lt, URLs ending with a file extension, and specific paths
        const excludedSubdomain = 'cdn.barbora.lt';
        const fileExtensionPattern = /\.[^\/]+$/;
        const excludedPaths = [
            '/produktai/',
            '/krepselis',
            '/pristatymas',
            '/atsiskaitymas',
			'/mano-prekes',
			'/info/',
			'/akcijos',
			'/aciu-kaina',
			'/mano-prekes'
        ];

        // Check for excluded subdomain
        if (url.hostname === excludedSubdomain) {
            return;
        }
		
		// Check for it's homepage
        if (url.pathname === "/") {
			console.log(`Excluded path - Homepage: ${url.pathname}`);
            return;
        }

        // Check for URLs ending with a file extension
        if (fileExtensionPattern.test(url.pathname)) {
            return;
        }

        // Check for specific excluded paths, including the homepage
        if (excludedPaths.some(path => url.pathname === path || url.pathname.startsWith(path) && url.pathname !== '/')) {
            console.log(`Excluded path: ${url.pathname}`);
            return;
        } else {
            console.log(`Path not excluded: ${url.pathname}`);

            // Check if the "sort" parameter is present
            if (!url.searchParams.has('sort')) {
                // Add the "sort" parameter with the value "priceAsc"
                url.searchParams.append('sort', 'priceAsc');

                // Redirect to the modified URL
                window.location.href = url.href;
            } else {
                console.log("Sort parameter already present");
            }
        }
    }

    // Run the function to modify the URL
    modifyUrl();

    // Observe for changes in the URL to handle single page applications
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                modifyUrl();
            }
        });
    });
    // At document_start, <body> doesn't exist yet, so wait for it before observing
    if (document.body) {
        observer.observe(document.body, { subtree: true, childList: true });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { subtree: true, childList: true });
        });
    }
})();
