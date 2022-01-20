const $ = (select) => document.querySelector(select);

const menuTemplate = (menuname) => `${menuname}`

function App() {

}


let current_menu = 'espresso'


window.addEventListener('load', () => {
  console.log(current_menu)
  document.getElementById('menu-list').innerHTML = get_localdata(current_menu)
})

function CountingItems() {
  const menu_count = document.getElementById('menu-list').childElementCount;
  // const menu_count = document.getElementById('menu-list').querySelectorAll('li').length
  document.getElementById('menu-count').innerText = `총 ${menu_count}개`;
}

function ModifyItem(e) {
  if (confirm('수정하시겠습니까?')) {
    const modified_ItemName = prompt('수정 값을 입력해주세요');
    if (modified_ItemName.length != 0) {
      e.closest('li').outerHTML = MakeMenu_template(modified_ItemName);
    }
  }
  CountingItems();


  save_localdata(current_menu, document.getElementById('menu-list').innerHTML)
}

function DeleteItem(e) {
  if (confirm('메뉴를 삭제하시겠습니까?')) {
    e.closest('li').remove();
  }
  CountingItems();

  save_localdata(current_menu, document.getElementById('menu-list').innerHTML)
}

function SoldoutItem(e) {
  if (e.closest('li').classList.contains('sold-out')) {
    e.closest('li').classList.remove('sold-out');
  } else {
    e.closest('li').classList.add('sold-out');
  }

  // save_localdata(key,value)
}

function MakeMenu_template(input_value) {
  const item  = `<li class="menu-list__item">
  <span class="menu-list__item__name">${input_value}</span>
  <button type="button" class="menu-list__item__okBtn" onClick="SoldoutItem(this)">
  품절</button>
  <button type="button" class="menu-list__item__okBtn" onClick="ModifyItem(this)">
    수정
  </button>
  <button type="button" class="menu-list__item__cancleBtn" onClick="DeleteItem(this)">
    삭제
  </button>
  </li>`;

  // const item = (input_value)  => `<li class="menu-list__item">
  // <span class="menu-list__item__name">${input_value}</span>
  // <button type="button" class="menu-list__item__okBtn" onClick="SoldoutItem(this)">
  // 품절</button>
  // <button type="button" class="menu-list__item__okBtn" onClick="ModifyItem(this)">
  //   수정
  // </button>
  // <button type="button" class="menu-list__item__cancleBtn" onClick="DeleteItem(this)">
  //   삭제
  // </button>
  // </li>`;

  return item
}

function MakeItem() {
  const input_value = document.querySelector('#newMenu-input').value;

  document.querySelector('#newMenu-input').value = '';

  const item = MakeMenu_template(input_value)

  document.getElementById('menu-list').insertAdjacentHTML('afterbegin', item);

  const value = document.getElementById('menu-list').innerHTML

  // 로컬데이터 저장하기
  save_localdata(current_menu, value)
}

document.getElementById('newMenu-input').addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && e.target.value != '') {
    MakeItem();
  }
  CountingItems();
});

document.querySelector('#input-btn').addEventListener('click', (e) => {
  if (document.getElementById('newMenu-input').value != '') {
    MakeItem();
  }
  CountingItems();
});


function select_menu(e) {
  current_menu = e.dataset.name

  document.getElementById('current_menu_title').innerText = current_menu + " Management"

  document.getElementById('menu-list').innerHTML = get_localdata(current_menu)

  CountingItems();
}

function save_localdata(key, value) {
  localStorage.setItem(key, value)
}

function get_localdata(key) {
  return localStorage.getItem(key)
}