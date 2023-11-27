var hellos = document.querySelectorAll('a');

hellos.forEach((yo) => yo.addEventListener('click', () => {
    yo.textContent = 'nothing';
}))
