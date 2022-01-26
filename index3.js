import {
  $
} from './dom.js'
import store from './store.js'


function App() {

  // 메뉴 저장 객체
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
  };

  // 현재 메뉴 표시
  this.current_menu = 'espresso'

  // 실행함수
  this.init = () => {
    if (store.get_localdata()) {
      this.menu = store.get_localdata()
    }
    render();
    initEventListners();
  }

  const render = () => {
    const template = this.menu[this.current_menu].map((item, index) => {
      return `<li data-menu-id="${index}" class="menu-list__item">
    <span class="menu-list__item__name">${item.name}</span>
    <button type="button" class="menu-list__item__okBtn sold-out">
    품절</button>
    <button type="button" class="menu-list__item__okBtn modify">
      수정
    </button>
    <button type="button" class="menu-list__item__cancleBtn delete">
      삭제
    </button>
    </li>`;
    }).join("")

    $('#menu-list').innerHTML = template
    CountingItems();
  }

  const CountingItems = () => {
    const menu_count = document.getElementById('menu-list').querySelectorAll('li').length
    document.getElementById('menu-count').innerText = `총 ${menu_count}개`;
  }

  const ModifyItem = (e) => {
    if (confirm('수정하시겠습니까?')) {
      const modified_ItemName = prompt('수정 값을 입력해주세요');
      if (modified_ItemName.length != 0) {
        e.target.closest('li').querySelector('span').innerText = modified_ItemName;

        const idx = e.target.closest('li').dataset.menuId
        this.menu[this.current_menu][idx].name = modified_ItemName
        store.save_localdata(this.menu)
      }
    }
    render();

  }

  const DeleteItem = (e) => {
    if (confirm('메뉴를 삭제하시겠습니까?')) {
      e.target.closest('li').remove();
      const index_n = (e.target.closest('li').dataset.menuId)
      this.menu[this.current_menu].splice(index_n, 1)
      store.save_localdata(this.menu)
      render();
    }

    const SoldoutItem = (e) => {
      const is_soldout = e.target.closest('li').classList.contains('sold-out')
      if (is_soldout) {
        e.target.closest('li').classList.remove('sold-out');
      } else {
        e.target.closest('li').classList.add('sold-out');
      }
      store.save_localdata(this.menu)
      render();
    }

    const AddItem = () => {
      const input_value = document.querySelector('#newMenu-input').value;

      this.menu[this.current_menu].push({
        name: input_value
      })
      // 로컬데이터 저장하기
      store.save_localdata(this.menu)
      render()
      $('#newMenu-input').value = '';
    }


    const initEventListners = () => {
      $('.menu-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('sold-out')) {
          console.log('품절')
          SoldoutItem(e)
        } else if (e.target.classList.contains('modify')) {
          console.log('수정')
          ModifyItem(e)
        } else if (e.target.classList.contains('delete')) {
          console.log('삭제')
          DeleteItem(e)
        }
      })

      document.getElementById('newMenu-input').addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && e.target.value != '') {
          AddItem();
        }
        CountingItems();
      });

      document.querySelector('#input-btn').addEventListener('click', (e) => {
        if (document.getElementById('newMenu-input').value != '') {
          AddItem();
        }
        CountingItems();
      });

      document.querySelector('.menu-select-ct').addEventListener('click', (e) => {
        if (e.target.classList.contains('menu-select-ct__item'))
          this.current_menu = e.target.dataset.name

        document.getElementById('current_menu_title').innerText = this.current_menu + " Management"

        // 새로운 메뉴를 보여주기 render
        render()
        CountingItems();
      })
    }

  }

  const app = new App();
  app.init();

  // const menuTemplate = (menuname) => `${menuname}`