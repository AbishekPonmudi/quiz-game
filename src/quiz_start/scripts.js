const options = document.querySelectorAll('.option');

options.forEach(option => {
    option.addEventListener('click', function() {
        // Remove the active class from all options
        options.forEach(opt => opt.classList.remove('active'));

        // Add the active class to the clicked option
        this.classList.add('active');
    });
});
