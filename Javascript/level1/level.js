import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

console.log(BANK_LIST);
console.log(ACCOUNT_FORM);

//1. 계좌번호 양식과 은행명은 import 되어 js console.log에 찍어두었습니다.
//2. 은행을 드롭박스로 선택할 수 있게 해야하며 양식에 맞추어 계좌번호 12자리를 피싱하면 됩니다. 단 앞2자리와 끝 2자리를 제외한 모든 자리 **
//3. 어떠한 경우에도 HTML 하드 코딩이 되어서는 안되며 12자리가 맞지 않는다면 alert를 띄워주세요

const $form = document.querySelector("#account-send-form");
const $bankSelector = document.querySelector("#bank-selector"); //은행 선택
const $accountInput = document.querySelector("#account-input"); //계좌 입력 input
const $accountList = document.querySelector("#account-list");

// BANK_LIST에서 은행을 순서대로 추출하여 배열에 넣기
let bankListArr = Object.values(BANK_LIST); //은행 이름 추출 (value 값을 가져옴)
console.log(Object.values(BANK_LIST)); //배열로 온다

// 은행 선택하는 옵션 메뉴에 들어갈 형태로 만들기
let bankList = bankListArr.map((el) => `<option>${el}</option>`).join("");
console.log(bankList);

// 은행 선택하는 select 안에 bankList 집어넣기
$bankSelector.innerHTML = bankList;
console.log($bankSelector);

//제출이벤트
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let currentBank = $bankSelector.options[$bankSelector.selectedIndex].text; //[0] => 성용은행
  // console.log(currentBank);

  let currentBankKey = Object.keys(BANK_LIST).find(
    (key) => BANK_LIST[key] === currentBank
  );
  //console.log(currentBankKey);

  let accountInput = $accountInput.value;
  // console.log(account);

  if (accountInput.length != 12) {
    alert("12자리를 입력해주세요");
    accountInput = "";
  } else {
    // 현재 입력된 은행의 key값과 같은 key값을 가진 ACCOUNT_FORM 찾기
    const currentAccountForm = ACCOUNT_FORM[currentBankKey];
    //console.log(currentAccountForm);  문자열 반환

    const currentAccountFormArr = [...currentAccountForm]; //Array.from(), 계좌번호형식 배열화
    console.log(currentAccountFormArr);
    let accountArr = Array.from(accountInput); //[...accountInput] 계좌번호
    console.log(accountArr);

    let accountArrIndex = 0;
    for (let i = 0; i < currentAccountFormArr.length; i++) {
      if (currentAccountFormArr[i] == 0) {
        //00-0000-0000-00 //123412341234
        currentAccountFormArr[i] = accountArr[accountArrIndex];
        accountArrIndex++;
      }
    }
    //12-341234-123
    let realAccount = currentAccountFormArr.join("");
    console.log(realAccount);

    //계좌번호 파싱
    let accountParsed = currentAccountFormArr
      .map((el, i) => {
        if (i <= 1 || i >= realAccount.length - 2) return el;
        if (el == "-") return el;
        else return "*";
      })
      .join("");
    console.log(accountParsed);

    const $li = document.createElement("li");
    $accountList.appendChild($li);
    $li.innerText = `${currentBank} : ${accountParsed}`;
  }
});
