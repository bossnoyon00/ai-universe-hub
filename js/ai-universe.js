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

    // const showAll = document.getElementById('show-all');
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const container = document.getElementById('data-load');
    if (data.length > 6) {
        data = data.slice(0, 6);
        // showAll.classList.remove('d-none');
    }
    else {
        container.innerText = '';
        displayData(data.data.tools);
        // showAll.classList.add('d-none');
    }

};

const displayData = (details) => {
    const container = document.getElementById('data-load');
    container.innerHTML = '';
    for (const data of details) {
        // console.log(data);
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
        <div><i class="fa-solid fa-arrow-right bg-danger text-white p-2 rounded" onclick="modalLoad('${data.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
        </div>
    </div>
        `;
        container.appendChild(newCard);
    }

    if (details.length > 6) {
        const showAll = document.getElementById('btn-show-all');
        showAll.classList.add('d-none');
    }
    else {
        const showAll = document.getElementById('btn-show-all');
        showAll.classList.remove('d-none');
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
    // console.log(details.features['2']);
    const container = document.getElementById('modal-two');
    container.innerText = '';
    const newCard = document.createElement('div');
    newCard.classList.add('row');
    newCard.innerHTML = `
    <div class="col-sm-6">
                           <div class="card bg-danger-subtle">
                             <div class="card-body"  style="border: 1px solid tomato; border-radius: 5px;">
                               <p class="card-text fw-bold">${details.description}/</p>
                               <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 fw-bold"> 
                                <div>
                                <h5 class="card-text fw-bold bg-white text-p1 p-3 rounded">${details.pricing ? details.pricing[0].price : "free of cost"} <br> <span>${details.pricing ? details.pricing[0].plan : ''}</span></h5>
                                </div>
                               
                               <div>
                               <h5 class="card-text fw-bold bg-white text-p2 p-3 rounded">${details.pricing ? details.pricing[1].price : "free of cost"} <br> <span>${details.pricing ? details.pricing[1].plan : ''}</span></h5>
                               </div>
                               <div>
                               <h5 class="card-text bg-white fw-bold text-p3 p-3 rounded">${details.pricing ? details.pricing[2].price : "free of cost"} <br> <span>${details.pricing ? details.pricing[2].plan : ''}</span></h5>
                               </div>
                                
                               </div>
                            

                               <div class="d-flex justify-content-between mt-5 mx-3">
                               <div>
                               <h3 class="card-title">Features</h3>
                               <li>${details.features['1'].feature_name}</li>
                               <li>${details.features['2'].feature_name}</li>
                               <li>${details.features['3'].feature_name}</li>
                               <li class = "${details.features['4'] ? details.features['4'].feature_name : 'd-none'}">${details.features['4'] ? details.features['4'].feature_name : "not found"}</li>
                               </div>
                               <div>
                               <h3 class="card-title">Integrations</h3>
                               <p>${details.integrations ? integrationsData(details.integrations) : 'not found'}</p>
                               </div>
                               </div>
                             </div>
                           </div>
                         </div>
                         <div class="col-sm-6">
                           <div class="card bg-warning text-light fw-bold h-100">
                           <button class = "${details.accuracy.score ? details.accuracy.score * 100 : 'd-none'} btn btn-danger" style="position: absolute; top: -10px;right:-5px " >${details.accuracy.score ? details.accuracy.score * 100 : ''} %accuracy </button>
                           <img src="${details.image_link[0]
        }" class="img-fluid rounded-3 " alt="...">

                             <div class="card-body">
                               <h5 class="card-title text-center">${details.input_output_examples ? details.input_output_examples[0].input : 'Can you give any example?'}</h5>
                               <p class="card-text text-center">${details.input_output_examples ? details.input_output_examples[0].output : 'No! Not yet! Take a break!!!'}</p>
                             </div>
                           </div>
                         
                         </div>
                       
  
    `;
    container.appendChild(newCard);
}



loadData();

const dateSorting = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
        .then(res => res.json())
        .then(data => showSorting(data.data.tools))
}

const showSorting = (date) => {
    console.log(date);
    const sort = date.sort((a, b) => {
        console.log(a);
        return new Date(a.published_in) - new Date(b.published_in);
    })

    displayData(sort)
}

const integrationsData = (integrations) => {
    let innerHTML = '';
    for (let i = 0; i < integrations.length; i++) {
        innerHTML += `<li class="card-text">${integrations[i]} </li>`
    }
    return innerHTML;
}