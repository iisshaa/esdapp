api_url = "https://ishaesd.herokuapp.com/user";
function loadData(records=[]){
    console.log(records);
    table_data = ``;
    for(let i=0;i<records.length;i++){
        //console.log(records[i].name);
        table_data += `<tr>`;
        table_data += `<td>${i + 1}</td>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].age}</td>`;
		table_data += `<td>${records[i].city}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;

    }
   document.getElementById('table_data').innerHTML = table_data;
}
    function getData(){
    fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        loadData(data);
    });
}

function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
		console.log(data);
        document.getElementById('id').value = data[0]._id;
        document.getElementById('name').value = data[0].name;
        document.getElementById('age').value = data[0].age;
        document.getElementById('city').value = data[0].city;
	
	});
}

function putData() {
	
	var id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var city = document.getElementById("city").value;
	
	data = {id: id, name: name, age: age, city: city};
    console.log(data);
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function postData(){
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var city = document.getElementById('city').value;
    data = {name:name,age:age,city:city};
   // console.log(data);
   fetch(api_url,{
       method:"POST",
       headers:{
           'Accept':'application/json',
           'Content-Type':'application/json',

       },
       body: JSON.stringify(data)
   })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        window.location.href = 'index.html';

    })

}


function deleteData(id,name) {
	user_input = confirm(`Are you sure you want to delete ${name} record?`);
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id}),
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}