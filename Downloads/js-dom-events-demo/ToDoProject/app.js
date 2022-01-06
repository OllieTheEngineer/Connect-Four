const input = document.querySelector('#Add-To-List');
const ul = document.querySelector('#List-Items');
const clearBtn = document.querySelector('.clear');
const form = document.querySelector('#Add-ToDos');
const li = document.getElementsByTagName('li');


form.addEventListener('submit', function(e){
    e.preventDefault();
    // console.log(input.value);
    const list = document.createElement('li');
    list.innerText = input.value;
    list.inserBefore;
    input.value = '';
    ul.append(list);

    clearBtn.addEventListener('click', function(event){
        event.reset(ul.value);
    })
})

function removeItem(li){
    let itemRemove = document.getElementById('li');
}

ul.addEventListener('click', function(evt){
    if(evt.target.tagName == 'li'){
        evt.target.classList.toggle('done');
    }
})
