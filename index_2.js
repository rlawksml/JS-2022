var input_txt = '';
var list_count = 0;

// item list만들기 함수
function MakeItems(input_txt) {
  var new_li = document.createElement('li');
  new_li.classList.add('todo-list__item');
  var new_div = document.createElement('div');
  new_div.classList.add('todo-list__item');
  new_div.classList.add('item-wraper');
  var new_input = document.createElement('input');
  new_input.classList.add('todo-list__item__chk');
  new_input.setAttribute('type', 'checkbox');
  new_input.setAttribute('onclick', 'item_checked(event)');

  var new_p = document.createElement('p');
  new_p.classList.add('todo-list__item__text');
  new_p.innerText = input_txt;
  new_p.setAttribute('ondblclick', 'Item_dbclick(event)');

  var new_replace_input = document.createElement('input');
  new_replace_input.classList.add('todo-list__item__text--input');
  new_replace_input.setAttribute('onkeyup', 'Item_txt_change(event)');

  var new_button_modi = document.createElement('button');
  new_button_modi.innerText = '수정';
  new_button_modi.classList.add('todo-list__item__btn-x');
  new_button_modi.setAttribute('onclick', 'modi_btn(event)');

  var new_button = document.createElement('button');
  new_button.innerText = '삭제';
  new_button.classList.add('todo-list__item__btn-x');
  new_button.setAttribute('onclick', 'del_btn(event)');

  new_div.appendChild(new_input);
  new_div.appendChild(new_p);
  new_div.appendChild(new_replace_input);
  new_div.appendChild(new_button_modi);
  new_div.appendChild(new_button);
  new_li.appendChild(new_div);

  return new_li;
}

// item 더블클릭시
function Item_dbclick(event) {
  $(event.target).parents('div').parents('li').addClass('editing');
  $(event.target).next('input').addClass('active');
  $(event.target).next('input').val(event.target.innerText);
}

// item 더블클릭 중 input에서 enter esc 이벤트 처리
function Item_txt_change(event) {
  if (window.event.keyCode == 13) {
    $(event.target).prev('p').text(event.target.value);
    $(event.target).parents('div').parents('li').removeClass('editing');
    $(event.target).removeClass('active');
  }
  if (window.event.keyCode == 27) {
    $(event.target).parents('div').parents('li').removeClass('editing');
    $(event.target).removeClass('active');
  }
}

// 아이템이 체크 되었을때 클레스 추가해주기
function item_checked(event) {
  if ($(event.target).is(':checked')) {
    $(event.target).parents('div').parents('li').addClass('completed');
  } else {
    $(event.target).parents('div').parents('li').removeClass('completed');
  }
}

// 삭제 함수
function del_btn(event) {
  if (confirm('삭제하시겠습니까?') == true) {
    $(event.target).closest('div').remove();
    list_count--;
    document.querySelector('.count_number').innerText = list_count;
  }
}

function modi_btn(event) {
  if (confirm('수정 하시겠습니까?') == true) {
    var text = prompt('대체하실 메뉴를 입력해주세요');
    if (text != '') {
      $(event.target).prev('input').prev('p').text(text);
    }
  }
}

// input에서 함수 넣어놓기
function TextEnter(event) {
  // 엔터키 누름
  if (window.event.keyCode == 13) {
    input_txt = event.target.value;

    // 빈값이 아닐때만 실행
    if (input_txt != '') {
      var new_li = MakeItems(input_txt);
      $(event.target).closest('div').next('ul').append(new_li);

      event.target.value = '';
      // 아이템 리스트 길이 확인 및 푸터에 값 넣어주기
      list_count++;
      document.querySelector('.count_number').innerText = list_count;
      localStorage.setItem('new_number', $(event.target).closest('div').next('ul'));
    }
  }
}
// input 옆 확인 버튼 클릭시
function input_btn_click(event) {
  input_txt = document.querySelector('.input-container input').value;

  if (input_txt != '') {
    var new_li = MakeItems(input_txt);
    $(event.target).closest('div').next('ul').append(new_li);

    event.target.value = '';
    // 아이템 리스트 길이 확인 및 푸터에 값 넣어주기
    list_count++;
    document.querySelector('.count_number').innerText = list_count;
    localStorage.setItem('new_number', event.target.closest('div'));
  }

  document.querySelector('.input-container input').value = '';
}

// footer 구현하기
// 아이템 카운트 기능 추가 구현하기

function allItem_click(event) {
  // html 컬렉션
  const completed_items = event.target.parentElement.previousElementSibling.children;
  // 배열
  const completed_items_list = Array.from(completed_items);
  completed_items_list.forEach((list) => {
    list.style.display = 'flex';
  });
}

function activeItem_click(event) {
  // html 컬렉션
  const completed_items = event.target.parentElement.previousElementSibling.children;
  // 배열
  const completed_items_list = Array.from(completed_items);
  completed_items_list.forEach((list) => {
    if (list.classList.contains('completed') == true) {
      list.style.display = 'none';
    } else {
      list.style.display = 'flex';
    }
  });
}

function completedItem_click(event) {
  // html 컬렉션
  const completed_items = event.target.parentElement.previousElementSibling.children;
  // 배열
  const completed_items_list = Array.from(completed_items);
  completed_items_list.forEach((list) => {
    if (list.classList.contains('completed') == false) {
      list.style.display = 'none';
    } else {
      list.style.display = 'flex';
    }
  });
}

function clearItem_click(event) {
  // html 컬렉션
  const completed_items = event.target.parentElement.previousElementSibling.children;
  // 배열
  const completed_items_list = Array.from(completed_items);

  completed_items_list.forEach((list) => {
    if (list.classList.contains('completed') == true) {
      list.remove();
      list_count--;
      document.querySelector('.count_number').innerText = list_count;
    }
  });
}

// object로 저장해야하는 것 아닌가??

(function () {
  console.log(localStorage.getItem('new_item'))
  console.log('hi')
})()