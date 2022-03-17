
const baseURL = 'http://localhost:4050';

let submitBtn = document.getElementById("submitBtn");
let colorSelections = document.querySelectorAll("input[name = colorSelection]");
const container = document.querySelector('section');

function displayRainbow(res){
    container.innerHTML = ''

            res.data.forEach((color, index) => {
                container.innerHTML += `<div name=${index}>${color}</div>`
            })

            document.querySelectorAll('div').forEach(element => {
                const theIndexValue = element.getAttribute('name');
                element.style.backgroundColor = element.textContent;

                element.addEventListener('click', () => {
                    axios
                        .delete(`/color/${theIndexValue}`)
                        .then(res => {
                            displayRainbow(res)
                        })

                })
            })


}


function addColor(colorSelection){
    let newColor;
    for (const colorSelection of colorSelections) {
        if (colorSelection.checked) {
            newColor = colorSelection.value;
            break;
        }
    }
    axios.post(`/color`, { color: newColor} )
    .then(res => {
        displayRainbow(res)
    })
    .catch(err => {
        colorSelection.value = ''

        const notif = document.createElement('aside')
        notif.innerHTML = `<p>${err.response.data}</p>
        <button class="close">close</button>`
        document.body.appendChild(notif)

        document.querySelectorAll('.close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.parentNode.remove()
            })
        })
    })
}

axios.get(`/color`)
.then(res => {
    displayRainbow(res)
})


submitBtn.addEventListener('click', addColor);