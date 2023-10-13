// import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

// console.log(BANK_LIST);
// console.log(ACCOUNT_FORM);

//1. 계좌번호 양식과 은행명은 import 되어 js console.log에 찍어두었습니다.
//2. 은행을 드롭박스로 선택할 수 있게 해야하며 양식에 맞추어 계좌번호 12자리를 피싱하면 됩니다. 단 앞2자리와 끝 2자리를 제외한 모든 자리 **
//3. 어떠한 경우에도 HTML 하드 코딩이 되어서는 안되며 12자리가 맞지 않는다면 alert를 띄워주세요

//banklist에 있는 내용들을 selector안에 option으로 넣어야 함

//혜련..
// const $containerBankList = document.querySelector("#bank-selector");

// for (let i = 1; i < Object.keys(BANK_LIST).length; i++) {
//   const $optionAdd = document.createElement("option"); //옵션 태그 추가
//   $containerBankList.append($optionAdd);
//   $optionAdd.innerHTML = BANK_LIST[i];
// }

//진솔

import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

console.log(BANK_LIST);

const $form = document.querySelector("#account-send-form");
const $bankSelector = document.querySelector("#bank-selector");
const $input = document.querySelector("#account-input");
const $outputBtn = document.querySelector("#account-send-form > button");
const $ul = document.querySelector("#account-list");
const $li = document.createElement("li");
const $body = document.querySelector("body");

let bankList = 1;
let bankValues = "";
let accArr = [];
let accArrKeys = [];
let str = "";
let result = "";

$form.addEventListener("submit", (e) => {
  e.preventDefault();
});

for (let i = bankList; i <= 8; i++) {
  bankList += "<option>" + BANK_LIST[i] + "</option>";
  bankValues = Object.values(BANK_LIST);
}
$bankSelector.innerHTML = bankList;

//제출버튼 클릭이벤트
$outputBtn.addEventListener("click", (e) => {
  let bankSelectText = $bankSelector.options[$bankSelector.selectedIndex].text;

  let inputValues = Array.from($input.value);

  if (inputValues.length !== 12) {
    alert("계좌번호 12자리가 아닙니다. 다시 입력하세요.");
    $input.value = "";
  }

  switch (bankSelectText) {
    case BANK_LIST[1]:
      fnc(1, 11);
      break;
    case BANK_LIST[2]:
      fnc(2, 11);
      break;
    case BANK_LIST[3]:
      fnc(3, 11);
      break;
    case BANK_LIST[4]:
      fnc(4, 12);
      break;
    case BANK_LIST[5]:
      fnc(5, 11);
      break;
    case BANK_LIST[6]:
      fnc(6, 11);
      break;
    case BANK_LIST[7]:
      fnc(7, 11);
      break;
    case BANK_LIST[8]:
      fnc(8, 11);
      break;
  }
});

function fnc(num, num1) {
  let inputValues = Array.from($input.value);
  accArr = [];
  accArr = Array.from(ACCOUNT_FORM[num]);
  accArrKeys = Object.keys(accArr);
  str = $input.value;

  for (let i = 0; i < accArr.length; i++) {
    if (accArr[i] !== "-") {
      accArr[i] = inputValues[i];
      if (i > 2 && i <= num1) {
        accArr[i] = "*";
      }
    } else if (accArr[i] === "-") {
      inputValues.splice(accArr[i + 1], 0, "");
    }
  }
  let result = BANK_LIST[num] + " : " + accArr.join("");

  $ul.innerHTML += "<li>" + result + "</li>";
}

/*
/* 태형
import { BANK_LIST, ACCOUNT_FORM } from "./account.js";

console.log(BANK_LIST);
console.log(ACCOUNT_FORM);

const $form = document.querySelector("#account-send-form");
const $bankSelector = document.querySelector("#bank-selector");
const $accountInput = document.querySelector("#account-input");
const $accountList = document.querySelector("#account-list");

// BANK_LIST에서 은행을 순서대로 추출하여 배열에 넣기
let bankListArr = Object.values(BANK_LIST);
console.log(Object.values(BANK_LIST));

// 은행 선택하는 옵션 메뉴에 들어갈 형태로 만들기
let bankList = bankListArr.map((el) => `<option>${el}</option>`);
console.log(bankList);

// 은행 선택하는 select 안에 bankList 집어넣기
$bankSelector.innerHTML = bankList;
console.log($bankSelector);
// 은행과 account form은 key 값으로 맞추기

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    let currentBank = $bankSelector.options[$bankSelector.selectedIndex].text;
    // console.log(currentBank);
    let currentBankKey = Object.keys(BANK_LIST).find(
        (key) => BANK_LIST[key] === currentBank
    );
    // console.log(currentBankKey);
    let accountInput = $accountInput.value;
    // console.log(account);
    if (accountInput.length != 12) {
        alert("12자리를 입력해주세요");
        accountInput = "";
    } else {
        // 현재 입력된 은행의 key값과 같은 key값을 가진 ACCOUNT_FORM 찾기
        const currentAccountForm = ACCOUNT_FORM[currentBankKey];
        //console.log(currentAccountForm);
        const currentAccountFormArr = [...currentAccountForm];
        console.log(currentAccountFormArr);
        let accountArr = Array.from(accountInput);
        let accountArrIndex = 0;
        for (let i = 0; i < currentAccountFormArr.length; i++) {
            if (currentAccountFormArr[i] == 0) {
                currentAccountFormArr[i] = accountArr[accountArrIndex];
                accountArrIndex++;
            }
        }
        let realAccount = currentAccountFormArr.join("");
        console.log(realAccount);

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
});*/
