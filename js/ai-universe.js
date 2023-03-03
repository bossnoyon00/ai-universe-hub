window.addEventListener('load', function () {
    const loading = document.getElementById('load-spin');
    loading.classList.add('d-none')
    loading.addEventListener('transitionend', function () {
        document.body.removeChild('load-spin');
    })
})

const loadData = async () => {
    // fetch('https://openapi.programming-hero.com/api/ai/tools')
    //     .then(res => res.json())
    //     .then(data => displayData(data.data.tools))
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    displayData(data.data.tools.slice(0, 6));
}

const showAllData = async () => {

    // fetch('https://openapi.programming-hero.com/api/ai/tools')
    //     .then(res => res.json())
    //     .then(data => displayData(data.data.tools));

    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const showAll = document.getElementById('show-all');
    const container = document.getElementById('data-load');
    if (data.length > 6) {
        data = data.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        container.innerText = '';
        displayData(data.data.tools);
        showAll.classList.add('d-none');
    }

};

const displayData = (datas) => {
    const container = document.getElementById('data-load');

    for (const data of datas) {
        console.log(data);
        const newCard = document.createElement('div');
        newCard.classList.add('col')
        newCard.innerHTML = `
        <div class="card h-100">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2>Feature</h2>
        <ol>
                    <li>${data.features[0] ? data.features[0] : 'No data found'}</li>
                    <li>${data.features[1] ? data.features[1] : 'No data found'}</li>
                    <li class ="${data.features[2] ? data.features[2] : 'd-none'}">${data.features[2] ? data.features[2] : 'No data found'}</li>
                    <li class ="${data.features[3] ? data.features[3] : 'd-none'}">${data.features[3] ? data.features[3] : ''}</li>
                    
                    
                    </ol>
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
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showModalData(data.data))
}

const showModalData = (details) => {
    console.log(details.features['2']);
    const container = document.getElementById('modal-two');
    container.innerText = '';
    const newCard = document.createElement('div');
    newCard.classList.add('col');
    newCard.innerHTML = `
    <div class="card bg-danger h-100">
        <div>
        <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${details.description}</h5>
        <div class="d-flex mt-3 justify-content-between">
        <p class="bg-primary-subtle p-2 rounded text-danger">${details.pricing ? details.pricing[0].price : 'free of cost'} /<br/> ${details.pricing ? details.pricing[0].plan : ''}</p>
        <p class="bg-primary-subtle p-2 rounded text-success">${details.pricing ? details.pricing[1].price : 'free of cost'} /<br/> ${details.pricing ? details.pricing[1].plan : ''}</p>
        <p class="text-warning bg-primary-subtle p-2 rounded">${details.pricing ? details.pricing[2].price : 'free of cost'} /<br/> ${details.pricing ? details.pricing[2].plan : ''}</p>
        </div>
        <div class="d-flex justify-content-between mt-3">
        <div>
        <h3>Features</h3>
        <li>${details.features['1'].feature_name}</li>
                            <li>${details.features['2'].feature_name}</li>
                            <li>${details.features['3'].feature_name}</li>
                            <li class = "${details.features['4'] ? details.features['4'].feature_name : 'd-none'}">${details.features['4'] ? details.features['4'].feature_name : "not found"}</li>
        </div>
        <div>
        <h3>Integrations</h3>
        <p>${details.integrations ? integrationsData(details.integrations) : 'not found'}</p>

        </div>
        </div>
      </div>
    </div>
        </div>
        `;
    container.appendChild(newCard);

    const container2 = document.getElementById('modal-three');
    container2.innerText = '';
    const newCard2 = document.createElement('div');
    newCard2.classList.add('col');
    newCard2.innerHTML = `
<div>
<div class="card">
<button class = "${details.accuracy.score ? details.accuracy.score * 100 : 'd-none'} btn btn-danger" style="position: absolute; top: -10px;right:-5px " >${details.accuracy.score ? details.accuracy.score * 100 : ''} %accuracy </button>
<img src="${details.image_link[0]}" class="card-img-top" alt="...">
<div class="card-body">
<h3 class="">${details.input_output_examples?.[0].input ? details.input_output_examples[0].input : 'Can you giv any example?'}</h3>
<p class="">${details.input_output_examples?.[0].output ? details.input_output_examples[0].output : 'No! Not yet! take a break!!!'}</p>

</div>
</div>
</div>
    `;
    container2.appendChild(newCard2);
}



loadData();


const integrationsData = (integrations) => {
    let innerHTML = ''
    for (let i = 0; i < integrations.length; i++) {
        innerHTML += `<li class="card-text">${integrations[i]} </li>`
    }
    return innerHTML;
}