fetch(`${window.location.href}` + `books`)
  .then(res => res.json())
  .then(data => {
    data.map(obj => {
      item = `<li>
<p>${obj.name}</p>
<p>${obj.author}</p>
</li>`
    })
    document.querySelector(".list").innerHTML += item
  })