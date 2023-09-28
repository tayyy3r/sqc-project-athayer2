const styleToggle = document.getElementById('button')
const bodyRef = document.getElementById('body')

styleToggle.addEventListener('click',
  function () {
    bodyRef.classList.toggle('dark')
  }
)
