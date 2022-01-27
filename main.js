import {
  $
} from './dom.js'
import store from './store.js'

function App() {
  this.current_category = "espresso"
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: []
  }

  this.init = () => {
    if (true) {
      store.get_localdata
    }
    render()
    initEventListners()
  }


  // render()함수
  const render = () => {
    const template = this.menu[this.current_category].map((item, index) => {
      return `<li data-name-id = ${index}  class="menu-list__item">
    <span class="menu-list__item__name">${item}</span>
    <button type="button" class="menu-list__item__okBtn sold-out">
    품절</button>
    <button type="button" class="menu-list__item__okBtn modify">
      수정
    </button>
    <button type="button" class="menu-list__item__cancleBtn delete">
      삭제
    </button>
    </li>`;
    }).join('')


    $('#menu-list').innerHTML = template

    store.save_localdata(this.menu)
  }


  const initEventListners = () => {
    $('.menu-list').addEventListener('click', (e) => {
      // 수정
      if (e.target.classList.contains('modify')) {
        const modified_name = prompt('수정하실 값을 넣어주세요')

        if (modified_name != "" && modified_name != null) {
          const idx = e.target.closest('li').dataset.nameId
          this.menu[idx] = modified_name
        }
        render()
      }
      // 삭제
      else if (e.target.classList.contains('delete')) {
        e.target.closest('li').remove()
        const idx = e.target.closest('li').dataset.nameId
        this.menu.splice(idx, 1)
        render()
      }
      // 품절
      else if (e.target.classList.contains('sold-out')) {
        console.log('품절')
      }
    })

    // input값 넣어주기
    $('#newMenu-input').addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        const menu_name = e.target.value
        e.target.value = ""
        this.menu[this.current_category].push(menu_name)

        render()
      }
    })

    $('#input-btn').addEventListener('click', (e) => {

      const menu_name = $('#newMenu-input').value
      $('#newMenu-input').value = ""
      this.menu[this.current_category].push(menu_name)

      render()
    })

    // 카테고리 클릭
    $('.menu-select-ct').addEventListener('click', (e) => {
      this.current_category = e.target.dataset.name
      if (e.target.classList.contains('menu-select-ct__item')) {
        $('#current_menu_title').innerText = e.target.innerText + 'Management'
      }
    })
  }
}


const app = new App();
app.init();