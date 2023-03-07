const renderedRol = document.querySelector('.renderedRol')

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
    console.log(user)
};
  
displayRol();  