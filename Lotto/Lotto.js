const todaySpan = document.getElementById("today")
const numbersDiv = document.querySelector('.numbers')
const drawButton =  document.querySelector('#draw')
const resetButton = document.querySelector('#reset')

let lottoNumbers=[]

//번호 표시
function paintNumber(number){
    const eachNumDiv = document.createElement("div")
    eachNumDiv.classList.add("eachnum")
    eachNumDiv.textContent = number;
    numbersDiv.append(eachNumDiv)
}

drawButton.addEventListener("click", function(){
//추첨 버튼 누를시 현재 시간정보 생성
    const today = new Date()
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDay();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    todaySpan.textContent = `${year}년 ${month}월 ${day}일 ${hour}:${min}:${sec}`
//추첨 버튼 누를시 배열이 차 있다면 비우기
    if(lottoNumbers.length === 6){
        lottoNumbers.splice(0,6)
        numbersDiv.innerHTML = "";
    }
//추첨 버튼 누를시 배열의 크기가 6보다 작으면 중복하지 않는 랜덤숫자 채워넣기
    let count = 0;
    const interval = setInterval(function() {
        if(lottoNumbers.length < 6) {
            let rn = Math.floor(Math.random() * 45) + 1
            if(lottoNumbers.indexOf(rn) === -1) {
                lottoNumbers.push(rn)
                paintNumber(rn)
            }
        } else {
            clearInterval(interval); // 6개의 번호가 모두 생성되면 반복 중지
        }
        count++;
    }, 1000); // 1000ms (1초) 간격으로 번호가 뜨도록 설정
})
//다시 버튼 누를 시 초기화
resetButton.addEventListener("click", function(){
    lottoNumbers.splice(0,6)
    numbersDiv.innerHTML = "";
})