const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    e.preventDefault();

    const location = search.value


    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''

                return
            } else {
                messageOne.textContent = `Location: ${data.location}`
                messageTwo.textContent = `Forecast: ${data.forecast}`
                return

            }
        })
    })
})