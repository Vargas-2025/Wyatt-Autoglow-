console.log("JS is connected");

const bookBtn = document.getElementById("bookBtn");
if (bookBtn) {
    bookBtn.addEventListener("click", function () {
        alert("Booking coming soon!");
    });
}

// Lightbox: enlarge gallery images when clicked
document.addEventListener('DOMContentLoaded', function () {
    function createLightbox() {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.display = 'none';

        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const img = document.createElement('img');
        img.className = 'lightbox-image';
        img.alt = '';

        const caption = document.createElement('div');
        caption.className = 'lightbox-caption';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', hideLightbox);

        content.appendChild(img);
        content.appendChild(caption);
        overlay.appendChild(content);
        overlay.appendChild(closeBtn);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) hideLightbox();
        });

        document.body.appendChild(overlay);

        function showLightbox(src, alt) {
            img.src = src;
            img.alt = alt || '';
            caption.textContent = alt || '';
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', onKeyDown);
        }

        function hideLightbox() {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeyDown);
        }

        function onKeyDown(e) {
            if (e.key === 'Escape') hideLightbox();
        }

        return { showLightbox, hideLightbox };
    }

    const lb = createLightbox();

    document.querySelectorAll('.photo-card img').forEach(img => {
        img.addEventListener('click', function () {
            // use higher-resolution source if available — here we reuse the src
            lb.showLightbox(this.src, this.alt || '');
        });
    });
});