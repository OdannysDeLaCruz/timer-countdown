const timer = document.getElementById('timer')
const timeList = []

const getInputTime = (labelName) => {
    const label = document.getElementById(labelName).value
    if(label === '') {
        alert(labelName + ' no puede estar vacio')
    } 

    return Number(label)
}

const renderTimes = (times) => {
  console.log(times)
  let template = ''

  for(let i = 0; i < times.length; i++) {

    let hoursFormatted    = times[i].time.hours < 10 ? '0' + times[i].time.hours : times[i].time.hours
    let minutesFormatted  = times[i].time.minutes < 10 ? '0' + times[i].time.minutes : times[i].time.minutes
    let secondsFormatted  = times[i].time.seconds < 10 ? '0' + times[i].time.seconds : times[i].time.seconds
    
    
    let item = `
      <div class="timer-item">
        <span class="timer-item__name">${times[i].name}</span>
        <div class="timer-item__time time">
          <div class="time__item time__minutes">${minutesFormatted}</div>
          <div class="time__item time__separator"></div>
          <div class="time__item time__seconds">${secondsFormatted}</div>
        </div>
        <div class="timer-item__actions">
          <div class="actions__form">
            <button class="actions__button actions__button--start" data-name="${times[i].name}" data-hours="${times[i].time.hours}" data-minutes="${times[i].time.minutes}" data-seconds="${times[i].time.seconds}" >Empezar</button>
            <button class="actions__button actions__button--edit">Editar</button>
            <button class="actions__button actions__button--reset">Reiniciar</button>
            <button class="actions__button actions__button--delete" data-index="${i}">Eliminar</button>
               
          </div>
        </div>
      </div>
    `
    template += item
  }
  document.querySelector('.timer-list').innerHTML = template

  const deleteTime = document.querySelectorAll('.actions__button--delete')

  deleteTime.forEach(function(element) {
    const index = element.getAttribute('data-index')
    
    element.addEventListener('click', function(event) {
      event.preventDefault()
      timeList.splice(index, 1)
      renderTimes(timeList)
    })   
  })

  const startTime = document.querySelectorAll('.actions__button--start')

  startTime.forEach(function(element) {        
    const name = element.getAttribute('data-name')
    const hours = element.getAttribute('data-hours')
    const minutes = element.getAttribute('data-minutes')
    const seconds = element.getAttribute('data-seconds')

    element.addEventListener('click', function(event) {
      event.preventDefault()
      window.open(`./timer-active.html?name=${name}&h=${hours}&m=${minutes}&s=${seconds}`, 'Timer active', 'width=500,height=500')
    })   
  })
}


renderTimes(timeList)


timer.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const timerName  = document.getElementById('timerName').value || 'Timer'
    let hours   = getInputTime('timerHours')
    let minutes = getInputTime('timerMinutes')
    let seconds = getInputTime('timerSeconds')

    timeList.push({
        name: timerName,
        time: {
            hours,
            minutes,
            seconds
        }
    })
    renderTimes(timeList)
}) 

