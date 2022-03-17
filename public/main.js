
const baseURL = 'http://localhost:4050';

let submitBtn = document.getElementById("submitBtn");
let colorSelection = document.getElementById("colorSelection");

function displayRainbow(res){
    container.innerHTML = ''
    nameInput.value = ''

            res.data.forEach((color, index) => {
                container.innerHTML += `<div name=${index}>${color}</div>`
                container.style.backgroundColor = color;
            })

            document.querySelectorAll('div').forEach(element => {
                const theIndexValue = element.getAttribute('name');

                element.addEventListener('click', () => {
                    axios
                        .delete(`/color/${theIndexValue}`)
                        .then(res => {
                            putTheThingInTheView(res)
                        })

                })
            })


}


function addColor(colorSelection){
    axios.post(`/color`, { color: colorSelection.value} )
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

axios.get('/color')
.then(res => {
    displayRainbow(res)
})


submitBtn.addEventListener('click', addColor)