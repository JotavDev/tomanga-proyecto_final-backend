const renderedRol = document.querySelector('.renderedRol')
const logout = document.getElementById('logout')

async function fetchData() {
    try {
      const response = await fetch('/auth');
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
}
  
const displayRol = async () => {
    const user = await fetchData();
    renderedRol.innerText = ` | ${await user?.user.first_name}`;
    logout.innerHTML = ` 
    <a class="anchorNavbar" href="/auth/logout">
      <b>Cerrar sesion</b>
    </a>`;
    console.log(user)
};
  
displayRol();  