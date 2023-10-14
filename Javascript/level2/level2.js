import { RESERVATION_LIST } from "./reservation .js";
console.log(RESERVATION_LIST);

// 1. 예약 고객 리스트는 js로 이미 import 되어 console.log에 찍어두었습니다.
// 2. 고객 리스트에 없는 고객정보의 경우 일치하는 항목이 없습니다라는 console.log와 함께 텍스트가 나타납니다.
// 3. 이름과 핸드폰 번호 모두 일치하지 않으면 고객은 검색할 수 없습니다.
// 4. 고객데이터가 있으면 고객번호가 텍스트로 나타납니다v

/* 
예약 고객확인하기
*/

const $form = document.querySelector("form");
const $inputName = document.querySelector(".user-name");
const $inputPhone = document.querySelector(".user-phone");
const $btn = document.querySelector("button");
const $reservationNum = document.querySelector("#reservation-number");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
});
//$btn.addEventListener("click", reservationBtnClick);
//예약 고객리스트 받아오기
$btn.addEventListener("click", () => {
  let check = 0;
  for (let i = 0; i < RESERVATION_LIST.length; i++) {
    console.log(RESERVATION_LIST[i]);
    if (RESERVATION_LIST[i].phone === $inputPhone.value) {
      if (RESERVATION_LIST[i].name === $inputName.value) {
        $reservationNum.innerHTML = RESERVATION_LIST[i].number;
        check = 1;
      }
    }
  }
  if (check == 0) {
    $reservationNum.innerHTML = "일치하는 내역이 없습니다.";
    alert("일치하는 내역이 없습니다.");
  }
});
