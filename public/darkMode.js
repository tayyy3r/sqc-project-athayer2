const styleToggle = document.getElementById('button')
let bodyRef = document.getElementById('body')

styleToggle.addEventListener('click',
  function () {
    bodyRef.classList.toggle('dark')
  }
)
