(function () {

})()

function CountingItems(){
  var menu_count = document.getElementById('espresso-menu-list').childElementCount
  document.getElementById('menu-count').innerText = `총 ${menu_count}개`
  
}

function ModifyItem(e) {
  if (confirm('수정하시겠습니까?')) {
    var modified_ItemName = prompt('수정 값을 입력해주세요')
    if(modified_ItemName.length != 0){
      console.log(e.closest('li').prev)
    }
  }
  CountingItems()
}

function DeleteItem(e) {
  console.log('누름')
  if(confirm('메뉴를 삭제하시겠습니까?')){
    e.closest('li').remove()
  }
  CountingItems()
}

function MakeItem() {



  var input_value = document.querySelector('#newMenu-input').value
  document.querySelector('#newMenu-input').value = ""

  var item = `<li class="menu-list__item">
  <span class="menu-list__item__name">${input_value}</span>
  <button type="button" class="menu-list__item__okBtn" onClick="ModifyItem(this)">
    수정
  </button>
  <button type="button" class="menu-list__item__cancleBtn" onClick="DeleteItem(this)">
    삭제
  </button>
  </li>`

  document.getElementById('espresso-menu-list').insertAdjacentHTML('afterbegin', item)
}

document.getElementById('newMenu-input').addEventListener('keyup',
  (e) => {
    if (e.keyCode === 13 && e.target.value != "") {
      MakeItem()
    }
    CountingItems()
  })

document.querySelector('#input-btn').addEventListener('click', (e) => {
  if (document.getElementById('newMenu-input').value != "") {
    MakeItem()
  }
  CountingItems()
})