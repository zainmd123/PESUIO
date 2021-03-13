
function addItem(){
    var item_name = document.getElementById("itemname").value
    var item_qty = document.getElementById("itemqty").value
    axios({
        method: 'post',
        url: 'http://localhost:8000/newitem',
        data: {
           name: item_name,
           quantity: item_qty
        }
    }).then(response => {
            
            console.log(response.data)
            console.log("added item! Click get list to refresh list")
    })
}

function deleteItem(){
    var deleteId = document.getElementById("delete_id").value
    axios({
        method: 'delete',
        url: 'http://localhost:8000/removeitem/{deleteID}',
        data: {
            item_id: deleteId
        }
    }).then(response => {
        console.log(response.data)
        console.log("Item has been deleted! Click get list to refresh list")
    
    })
}
function updateItem(){
    var updateID = document.getElementById("update_id").value
    var updateName = document.getElementById("itemname").value
    var updateQty = document.getElementById("itemqty").value

    axios({
        method: 'put',
        url: 'http://localhost:8000/edititem/{updateID}',
        data: {
            item_id: updateID,
            name: updateName,
            quantity: updateQty
        }
    }).then(response => {
        console.log(response.data)
        console.log("Item has been updated! Click get list to refresh the list")
    
    })
}


function getList(){
    document.getElementById("list_title").innerHTML = "View list"

    var list = document.getElementById('grocery-list');
    list.innerHTML =  "";
    
    axios({
        method: 'get',
        url: 'http://localhost:8000/grocerylist',
    }).then(response => {
        var i;
        var res = response.data.grol

        for (i=0; i < res.length; i++) {
            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(res[i]['name'] + "," + res[i]['quantity']));
            list.appendChild(entry);
        }
       
       
    
    })
}
