let myArr = [];
let myStr = [];
let tableBody = document.getElementById('tableBody');

function getAndUpdate() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    
    if (localStorage.getItem('myTodoList')==null){      
        myArr.push([title, description]);
        localStorage.setItem('myTodoList', JSON.stringify(myArr));
    }
    else {        
        myStr = localStorage.getItem('myTodoList');
        myArr = JSON.parse(myStr);
        myArr.push([title, description]);
        localStorage.setItem('myTodoList', JSON.stringify(myArr));
    }
    update();
}

function update() {
    if (localStorage.getItem('myTodoList')==null){
        myArr.splice(0);  
    }
    else {
        myStr = localStorage.getItem('myTodoList');
        myArr = JSON.parse(myStr);
    }

    let str = '';

    myArr.forEach((element, index) => {
      
            str += `
            <tr>
                <th>${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button id="dlt" onclick="deleted(${index})">Delete</button></td>
            </tr>`;
       
    });

    tableBody.innerHTML = str;
    title.value = "";
    description.value = "";

}

let add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
    myStr = localStorage.getItem('myTodoList');
    myArr = JSON.parse(myStr);
    myArr.splice(itemIndex, 1);
    localStorage.setItem('myTodoList', JSON.stringify(myArr));
    update();
}

function clearStorage() {
    if(localStorage.getItem('myTodoList')!=null){
        if(confirm("Do you really want to clear?")){
            localStorage.clear();
            myArr.splice(0);
            update();
        }
    }
}