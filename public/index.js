let tableInfo = document.getElementById("tableInfo");
fetch('http://localhost:3650/api/v1/users')
.then(response => response.json())
.then( data => {
    let dataGet = data.records;
    dataGet.forEach(element => {
         
    });
})
.catch( err => console.error(err));

