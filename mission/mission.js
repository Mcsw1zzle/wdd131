const themeSelector = document.getElementsByClassName('selector');
function changeTheme() {
    let selectedTheme = themeSelector.value;
    if (selectedTheme == 'dark') {
        let element = document.getElementById('bod');
        element.classList.add('dark');
        let img = document.getElementsByClassName('image');
        img.setAttribute('src', 'byui-logo_white.png');
    }
    else if (selectedTheme == 'light') {
        let element = document.getElementById('bod');
        element.classList.remove('dark');
        let img = document.getElementsByClassName('image');
        img.setAttribute('src', 'logo.webp');
    }
}
themeSelector.addEventListener('click', changeTheme);