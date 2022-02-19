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
                messageTwo.textContent = ''
                messageOne.textContent = data.error

                return
            } else {
                messageOne.textContent = ''
                messageTwo.textContent = `Location: ${data.location} \nForecast: ${data.forecast}`
                return

            }
        })
    })
})