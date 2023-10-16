/* 
레시피 재료 추가하기
*/

const $form = document.querySelector("#ingredient-form"); //form 태그 불러오기
const $inputIngredientName = document.querySelector("#input-ingredient-name"); //재료명 인풋
const $inputWeight = document.querySelector("#input-weight"); //용량 인풋
const $th = document.querySelectorAll(".thead > th"); //재료, 무게, 관리

const $ingredientList = document.querySelector("#ingredient-list"); //제출 ul칸

const $addBtn = document.querySelector("#input-all");
const $table = document.querySelector("table");

$form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let ingredientArr = [];
$addBtn.addEventListener("click", () => {
  const $tr = document.createElement("tr");
  const inputIngredientName = $inputIngredientName.value; //재료명에 적은 인풋 대임
  const inputWeight = $inputWeight.value; //용량명에 적은 인풋 대입

  //재료명 겹치지 않게
  if (ingredientArr.includes(inputIngredientName)) {
    alert("이미 존재하는 재료입니다.");
    $inputIngredientName.value = "";
    $inputWeight.value = "";
  } else {
    ingredientArr.push(inputIngredientName);
    const $td = document.createElement("td");
    $td.className = "td-class";
    const arr = [inputIngredientName, inputWeight, " "];
    console.log(arr);
    for (let i = 0; i < $th.length - 1; i++) {
      $tr.innerHTML += `<td class="text-td">${arr[i]}</td>`;
    }

    $table.append($tr);
    $tr.append($td); //추가

    //삭제버튼 추가
    const $delBtn = document.createElement("button");
    $delBtn.className = "delete-btn";

    $delBtn.innerText = "삭제";
    $td.append($delBtn);
    //$tr.append($td);

    $tr.className = "thead";

    //입력후 비워주기
    $inputIngredientName.value = "";
    $inputWeight.value = "";

    // 삭제 버튼 이벤트
    $delBtn.addEventListener("click", (e) => {
      // input 재저장
      const deleteInputValue = inputIngredientName;
      // ingredientArr에 저장된 length만큼 돌린다
      for (let i = 0; i < ingredientArr.length; i++) {
        // 만약 ingredientArr[i] 가 저장된 input과 같다면
        if (ingredientArr[i] === deleteInputValue) {
          //splice한다 i위치 부터 1까지
          ingredientArr.splice(i, 1);
          // 인덱스 빼서 당겨주기
          i--;
        }
      }
      e.target.parentNode.parentNode.remove();
      // e.target.parentNode.parentNode.innerHTML = "";
    });
  }
});

// 제출버튼 눌렀을 때 tr의 td의 값을 불러와서 갯수만큼 리스트 추가해주고 리스트에 대입

const $submitBtn = document.querySelector("#submit_button");
const $tdClass = document.querySelectorAll(".td-class");

$submitBtn.addEventListener("click", (e) => {
  const tdText = document.querySelectorAll(".text-td");
  $ingredientList.innerText = "";
  const q = [];

  for (let i = 0; i < tdText.length; i++) {
    q.push(tdText[i].innerText);
    console.log(q);
  }

  for (let i = 0; i < q.length; i += 2) {
    const sliceArr = q.slice(i, i + 2);

    const joinArr = sliceArr.join(":");
    const $submitLi = document.createElement("li");
    $submitLi.innerText = joinArr;
    $ingredientList.append($submitLi);
  }
});
