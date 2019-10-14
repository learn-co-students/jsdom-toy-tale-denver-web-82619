document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toySubmit = document.getElementsByClassName('add-toy-form')[0];
  const toyCollection = document.getElementById("toy-collection");

  let addToy = false

  // YOUR CODE HERE

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  toySubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputs = document.getElementsByClassName('input-text');
    
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      
      body: JSON.stringify({
          "name": inputs[0].value,
          "image": inputs[1].value,
          "likes": 0
        })
    })

    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => cards(toys))
  })

  function cards(toys) {
    toys.forEach(toy => {
      let cardDiv = document.createElement('div');
      let cardHead = document.createElement('h2');
      let cardImg = document.createElement('img');
      let cardLikes = document.createElement('p');
      let cardButton = document.createElement('button');

      cardDiv.className = 'card';
      cardHead.innerHTML = toy.name;
      cardImg.src = toy.image;
      cardImg.className = 'toy-avatar';
      cardLikes.innerHTML = `${toy.likes} Likes`;
      cardButton.innerText = 'Like <3'
      cardButton.className = 'like-btn'

      cardButton.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: 
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
          
          body: JSON.stringify({
              "likes": toy.likes + 1
            })
        })
      })

      cardDiv.append(cardHead, cardImg, cardLikes, cardButton);
      toyCollection.append(cardDiv);
    })
  }

  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toys => cards(toys))
})