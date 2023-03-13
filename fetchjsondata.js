function fetchData(){

    fetch("https://reqres.in/api/users")
    .then(response =>{
        console.log(response);
        if(!response.ok){
            throw Error("Error");
        }
        return response.json();

    })
    .then(data =>{
        console.log(data.data);
        const html = data.data.map
        (user =>{
            return `<div class="user"><p>Name: ${user.first_name}</p>
            <p>Name: ${user.last_name}</p></div>`;
            // return `<p>Name: ${user.first_name}</p>`;
        }).join("");
        console.log(html);
        document.querySelector('#app').insertAdjacentHTML("afterbegin",html);
    })
    .catch(error =>{
        console.log(error);
    })


}

fetchData();
