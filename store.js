const store = {
  save_localdata(menu) {
    localStorage.setItem("menu", JSON.stringify(menu))
  },
  
  get_localdata() {
    return JSON.parse(localStorage.getItem("menu")) 
  }  
}


export default store
