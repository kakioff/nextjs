function darkMode() {
    setThemeMode("dark")
}

function lightMode() {
    setThemeMode("light")
}
function setThemeMode(mode){
    let theme = document.createAttribute('data-theme')
    theme.nodeName = mode
    document.documentElement.attributes.setNamedItem(theme)
}

if(localStorage.getItem('theme')){
    setThemeMode(localStorage.getItem('theme'))
}else if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    darkMode()
else
    lightMode()
window.matchMedia('(prefers-color-scheme: dark)').onchange = (val) => {
    if ('theme' in localStorage) return
    if (val.matches) darkMode()
    else lightMode()
}