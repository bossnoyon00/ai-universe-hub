const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayData(data.data.tools))
}

const displayData = (datas) => {
    const container = document.getElementById('data-load');
    for (const data of datas) {
        // console.log(data);
        const newCard = document.createElement('div');
        newCard.classList.add('col')
        newCard.innerHTML = `
        <div class="card h-100">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2>Feature</h2>
            <h5 class="card-title">1.${data.features[0]}</h5>
            <h5 class="card-title">2.${data.features[1]}</h5>
            <h5 class="card-title">3.${data.features[2]}</h5>
            <hr />
        
        </div>
        <div class="d-flex justify-content-between align-items-center px-5">
        <div>
        <h5>${data.name}</h5>
        <h6><i class="fa-solid fa-calendar-days"></i> ${data.published_in}</h6>
        </div>
        <div><i class="fa-solid fa-arrow-right" onclick="modalLoad('${data.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
        </div>
    </div>
        `;
        container.appendChild(newCard);
    }
}

const modalLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showModalData(data.data))
}

const showModalData = (details) => {
    console.log(details);
    const container = document.getElementById('modal-two');
    container.innerText = '';
    const newCard = document.createElement('div');
    newCard.classList.add('col');
    newCard.innerHTML = `
    <div class="card h-100">
        <div>
        <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${details.description}</h5>
        
      </div>
    </div>
        </div>
        `;
    container.appendChild(newCard);

    const container2 = document.getElementById('modal-three');
    container2.innerText = '';
    const newCard2 = document.createElement('div');
    newCard2.classList.add('col');
    newCard2.innerHTML=`
<div>
<div class="card">
<img src="${details.image_link[0]}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="">${details.input_output_examples?.[0].input ? details.input_output_examples[0].input : 'Sorry no data available'}</h5>
<p class="">${details.input_output_examples?.[0].output ? details.input_output_examples[0].output : 'Sorry no data available'}</p>

</div>
</div>
</div>
    `;
    container2.appendChild(newCard2);
}

loadData();


