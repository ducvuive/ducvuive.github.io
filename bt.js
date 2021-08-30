
var btAdd = document.getElementById("bt_add")
var namePro,moneyPro;

var table = document.getElementById("tb")
console.log(table.rows.length)

function change_background()
{
    document.getElementById("body1").style.background = '#d3d3d3';
    document.getElementById("body1").style.opacity='30%';
}
function add_info(){
   

    var rowTable = table.rows.length;
    var row = table.insertRow(rowTable);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    document.getElementById("inputName").value=''
    document.getElementById("inputMoney").value=''
    cell1.innerHTML = '<input type="checkbox">';
    cell2.innerHTML = namePro;
    cell3.innerHTML = moneyPro
}

btAdd.onclick = function(e){
    var card = document.getElementById("card")
    

    var name = document.getElementById("infor_pro_name")
    var money = document.getElementById("infor_pro_money")

    namePro=document.getElementById("inputName").value;
    moneyPro=document.getElementById("inputMoney").value;
    console.log(typeof namePro)
    if(namePro===''||moneyPro === ''){
        alert('Nhập tên sản phẩm và giá tiền')
    }
    else{
    change_background();
    card.style.display = "block"
    name.innerHTML='Tên sản phẩm: '+namePro;
    money.innerHTML='Giá sản phẩm: '+ moneyPro;
    }
}

document.getElementById("agree").onclick = function(){
    add_info();
    card.style.display = "none"
    document.getElementById("body1").style.background = '#FFFFFF';
    document.getElementById("body1").style.opacity='100%';
}

document.getElementById("cancel").onclick = function(){
    card.style.display = "none"
    document.getElementById("body1").style.background = '#FFFFFF';
    document.getElementById("body1").style.opacity='100%';
}
var cells ;
var kt =0;
document.getElementById("bt_del").onclick = function(){
    for(var i=2;i<table.rows.length;i++){
        cells = table.rows[i].cells[0].childNodes[0];       
           if(cells.checked===true){
           kt = 11;
       }
    }   
    if(kt===11){
        var check=confirm('Bạn chắc có muốn xoá sản phẩm không')
        if(check ===true){
            for(var i=table.rows.length-1;i>=2;i--){
                cells = table.rows[i].cells[0].childNodes[0];       
                   if(cells.checked===true){
                    table.deleteRow(i);
                    //console.log(1)
               }
            }   
        }
    }
    else{

    }
}