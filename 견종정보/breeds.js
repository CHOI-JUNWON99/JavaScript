const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42"
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const request1 = new XMLHttpRequest()
const request2 = new XMLHttpRequest()

const header = document.getElementById("header")
const main = document.getElementById("main")
const input = document.getElementById("filter-text")
const button = document.getElementById("filter-button")
const select = document.getElementById("filter-select")

const currentDogs = [] 

window.addEventListener("load",function(){
    //강아지 사진 뿌리기
    request1.open("get", apiRandomDogs)
    request1.addEventListener("load",function(){
        const response = JSON.parse(request1.response)
        //console.log(response.message)
        response.message.forEach(function(item){
            currentDogs.push(item)
            const dogImgDiv = document.createElement("div")
            dogImgDiv.classList.add("flex-item")
            dogImgDiv.innerHTML = `
                <img src=${item}>
            `
            main.appendChild(dogImgDiv);
        })
    })
    request1.send()

    // 셀렉트에 견종 정보 뿌리기
    request2.open("get", apiAllBreeds)
    request2.addEventListener("load",function(){
        const response = JSON.parse(request2.response);
        //console.log(response)
        //console.log(Object.keys(reponse.message))
        Object.keys(response.message).forEach(function(item){
            const option = document.createElement("option")
            option.textContent = item
            option.value = item
            select.appendChild(option)
        });
    })
    request2.send();
})

button.addEventListener("click", function(){
    main.innerHTML = "";
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(input.value) !== -1;
    })
    
    filteredDogs.forEach(function(item){
        currentDogs.push(item)
        const dogImgDiv = document.createElement("div")
        dogImgDiv.classList.add("flex-item")
        dogImgDiv.innerHTML = `
            <img src=${item}>
        `
        main.appendChild(dogImgDiv);
    })
})
