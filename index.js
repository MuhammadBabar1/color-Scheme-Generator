
const seedColor = document.getElementById("seedcolor")
const getScheme = document.getElementById("getScheme")
const schemeMode = document.getElementById("schememode")
const snackBar = document.querySelector("#snackbar")
getScheme.addEventListener('click',getSchemes)
let schemes

function getSchemes(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor.value.slice(1)}&mode=${schemeMode.value}`)
    .then(res => res.json())
    .then((data) => renderColors(data))
}
function renderColors(obj){
    const { colors } = obj
    const schemeColors = document.querySelector('.schemes')
    const schemeHex = document.querySelector('.hex')
    schemeColors.innerHTML = colors.map((c)=> 
    `<div style="background-color:${c.hex.value}" class="scheme"
    onclick="copyToClipboard('${c.hex.value}')"
    ></div>`).join('');
    schemeHex.innerHTML = colors.map((c) => `<h3
    onclick="copyToClipboard('${c.hex.value}')"
    >${c.hex.value}</h3>`).join('');
}
getSchemes()

/* 
    Uses the Clipboard API to copy color codes to the clipboard 
*/
function copyToClipboard(str) {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(str)
            .then(() => {
                showSnackbar()
            }, error => { deprecatedCopyToClipboard(str) })
    } else { // Clipboard API not supported
        deprecatedCopyToClipboard(str)
    }
}

/*  
    If the Clipboard API is not available or there's an error returned it falls back 
    to using execCommand which is now deprecated.
*/
function deprecatedCopyToClipboard(str) {
    const area = document.createElement('textarea')
    document.body.appendChild(area)
    area.value = str
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
    showSnackbar()
}

/*
    Shows the snackbar for around 3 seconds.
    This is called after a color code is copied to the clipboard.
*/
function showSnackbar() {
    snackBar.className = "show"
    setTimeout(() => snackBar.className = "", 1700)
}