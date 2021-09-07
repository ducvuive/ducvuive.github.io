
var btAdd = document.getElementById("bt_add")
// so san pham mac dinh la 3
numberProduct = 3;
var table = document.getElementById("tb")
console.log(table.rows.length)

function change_background()
{
    document.getElementById("body1").style.background = '#d3d3d3';
    document.getElementById("body1").style.opacity='30%';
}

function return_background(){
    document.getElementById("body1").style.background = '#FFFFFF';
    document.getElementById("body1").style.opacity='100%';
}

// begin : Thêm sản phẩm
function add_info(){
    numberProduct++;
    var id = "sp" + numberProduct;
    var rowTable = table.rows.length;
    var row = table.insertRow(rowTable);
    row.setAttribute("id",id)
    console.log(typeof id)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    document.getElementById("inputName").value='';
    document.getElementById("inputMoney").value='';
    cell1.innerHTML = '<input type="checkbox">';
    cell2.innerHTML = namePro;
    cell3.innerHTML = moneyPro;
    cell4.innerHTML = "Sửa";
    cell4.setAttribute("onclick",`updateProduct('${id}')`)
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
    return_background();
}

document.getElementById("cancel").onclick = function(){
    card.style.display = "none"
    return_background();
}
var cells ;
var kt =0;

/* Xoá sản phẩm */
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
    else{}
}
var cells1,cells2,cells3,html;
/* Summit sản phẩm */ 
document.getElementById("bt_summit").onclick = function(){

    for(var i=2;i<table.rows.length;i++){
        cells = table.rows[i].cells[0].childNodes[0];       
           if(cells.checked===true){
           kt = 11;
       }
    }   
    if(kt===11){
        html='';
        change_background();
        var addPro = document.querySelector('#Confirm_product .listProduct')
        var confirmSummit = document.querySelector('#agreeSummit')
        var cancelSummit = document.querySelector('#cancelSummit')
        document.getElementById("Confirm_product").style.display="block"



            for(var i=2;i<table.rows.length;i++){
                cells1 = table.rows[i].cells[0].childNodes[0];       
                cells2 = table.rows[i].cells[1].childNodes[0];       
                cells3 = table.rows[i].cells[2].childNodes[0];       

                if(cells1.checked===true){
             
                      html += `<li>Sản phẩm: ${ cells2.nodeValue} và giá tiền: ${ cells3.nodeValue}</li>`
                    
                }
            }
            addPro.innerHTML = html;
            
            // return background
            confirmSummit.onclick = function(){
                document.getElementById("Confirm_product").style.display="none"
                return_background();

            }

            cancelSummit.onclick = function(){
                document.getElementById("Confirm_product").style.display="none"
                return_background();
            }
        }   
 }

 /* Sửa dữ liệu */
var click = 0;
var checkId ;
var valueUpdate = [];
function updateProduct(id){
    click++;

    numberProduct = document.querySelector("#"+id);
    var infor_numberProduct = numberProduct.querySelectorAll("td")

    lengthProperties = infor_numberProduct.length;
    getIndexInfoUpdate = 0;
    if(click%2==0 ){
        infor_numberProduct[lengthProperties-1].innerText = "Sửa"
        infor_numberProduct[0].innerHTML = '<input type="checkbox">';    
        for (var i=1; i<lengthProperties-1;i++){
            if(valueUpdate[getIndexInfoUpdate]=="undefined")
                infor_numberProduct[i].innerText=""
            else
            infor_numberProduct[i].innerText=valueUpdate[getIndexInfoUpdate];
            getIndexInfoUpdate ++;
        }
        valueUpdate=[];
    }
    // else if(click%2==0 && checkId !=id){
    //     if(a=[]){

    //     }
    // }
    else{
    checkId = id;
    infor_numberProduct[lengthProperties-1].innerText = "Đồng ý"
    infor_numberProduct[0].innerText = "Huỷ"    
     for (var i=1; i<lengthProperties-1;i++){
        //console.log( infor_numberProduct[i]) 
        text = infor_numberProduct[i].innerText;
        valueUpdate[getIndexInfoUpdate] = text ;
        console.log(valueUpdate[getIndexInfoUpdate],i,getIndexInfoUpdate,"cccccccc")
        infor_numberProduct[i].innerHTML = '<input type="text" size="12">'
        //console.log(infor_numberProduct[i])
        var t = infor_numberProduct[i].querySelector('input')
        t.value =text;
        // infor_numberProduct[i];
        //a.push(infor_numberProduct[i].innerText)
      
           getIndexInfoUpdate++;
        }
        getIndexInfoUpdate=0;
        for (var i=1; i<lengthProperties-1;i++){
            infor_numberProduct[i].onchange = function(e){
                // console.log(e)
                // valueUpdate[getIndexInfoUpdate++] = e.target.value;
                // console.log(valueUpdate[getIndexInfoUpdate],i,getIndexInfoUpdate)
                // console.log(e.target.value)
                //getIndexInfoUpdate++;
                 console.log(i)
               }
        }
    }
}

