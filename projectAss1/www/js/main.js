var todo = [];

window.addEventListener("load",function(){
    hide();
    loadList(todo);
    // var tasklist = document.getElementById("task");
    // document.getElementById("task").addEventListener("click",function(event){
    //     var id=event.target.getAttribute("id");
    //     var elm=document.getElementById(id);
    //     if(elm.classList.contains("done")){
    //         changeStatus(id,0);
    //     }
    //     else{
    //         changeStatus(id,1);
    //     }
    //     showButton("remove",todo);
    // });

    document.getElementById("remove").addEventListener("touchend",function(){
        var len = todo.length-1;
        for(i=len;i>=0;i--){
            var item = todo[i];
            if(item.status==1){
                todo.splice(i,1);
                saveList(todo);
                renderList(todo);
            }
        }
        // showButton("remove",todo);
    });
});

function savetask()
{
    
    var inputform = document.getElementById("input-form");
    task=document.getElementById("task").value;
    date=document.getElementById("date").value;
    if(task!="" && task!=undefined){
        createTask(task,date);
        inputform.reset();
    }
};

function createTask(task,date){
    id = new Date().getTime();
    taskitem ={id:id,task:task,date:date,status:0};
    todo.push(taskitem);
    renderList(todo);
}

function saveList(list_array){
    if(window.localStorage){
        localStorage.setItem("tasks",JSON.stringify(list_array));
    }
}

function loadList(list_array){
    if(window.localStorage){
        try{
            if(JSON.parse(localStorage.getItem("tasks"))){
                todo = JSON.parse(localStorage.getItem("tasks"));
            }
        }
        catch(error){
            console.log("error"+error);
        }
    }
    renderList(todo);
}

function renderList(list_array){
    var taskcontainer = document.getElementById("task-list");
    // var datecontainer = document.getElementById("date-list");
    // var buttoncontainer = document.getElementById("button-list");
    saveList(list_array);
    hide();
    taskcontainer.innerHTML="";
    // datecontainer.innerHTML="";
    itemstotal = list_array.length;
    for(i=0;i<itemstotal;i++){
        item = list_array[i];
        
        
        // listitem = document.createElement('LI');
        // listitem.setAttribute("class","list-group-item");
        // tasklisttext = document.createTextNode(item.task);
        // listitem.appendChild(tasklisttext);
        // listitem.setAttribute("id",item.id);
        // listitem.setAttribute("data-status",item.status);
        
        
        // listitem2 = document.createElement('LI');
        // listitem2.setAttribute("class","list-group-item");
        // datelisttext = document.createTextNode(item.date);
        // listitem2.appendChild(datelisttext);
        // listitem2.setAttribute("id",item.id);
        // listitem2.setAttribute("data-status",item.status);
        
        // listitem3 = document.createElement('LI');
        // listitem3.setAttribute("class","list-group-item");
        // button = document.createElement('BUTTON');
        // buttontext = document.createTextNode("DELETE");
        // button.appendChild(buttontext);
        // button.setAttribute("id","remove");
        // listitem3.appendChild(button);
        
        listitem = document.createElement('LI');
        listitem.setAttribute("class","list-group-item");
        tasklisttext = document.createTextNode(item.task);
        datelisttext = document.createTextNode(item.date);
        head = document.createElement('H5');
        head.setAttribute("class","list-group-item-heading");
        head.appendChild(datelisttext);
        text = document.createElement('H5');
        text.setAttribute("class","list-group-item-text");
        text.appendChild(tasklisttext);
        
        span=document.createElement('SPAN');
        span.setAttribute("class","pull-right");
        button = document.createElement('BUTTON');
        buttontext = document.createTextNode("DELETE");
        button.appendChild(buttontext);
        button.setAttribute("id","remove");
        span.appendChild(button);
        
        right = document.createElement('DIV');
        right.setAttribute("class","col-xs-9");
        
        left = document.createElement('DIV');
        left.setAttribute("class","col-xs-3");
        
        right.appendChild(span);
        left.appendChild(head);
        left.appendChild(text);
        
        container= document.createElement('DIV');
        container.setAttribute("class","container");
        
        container.appendChild(left);
        container.appendChild(right);
        
        listitem.appendChild(container);
        
        taskcontainer.appendChild(listitem);
        // datecontainer.appendChild(listitem2);
        // taskcontainer.appendChild(listitem);
        // buttoncontainer.appendChild(listitem3);
        
    }
}

// function changeStatus(id,status){
//     switch(status){
//         case 1:
//             document.getElementById(id).setAttribute("class","done");
//             for(i=0;i<todo.length;i++){
//                 taskitem = todo[i];
//                 if(taskitem.id == id){
//                     taskitem.status = 1;
//                     saveList(todo);
//                 }
//             }
//         break;
//         case 0:
//             document.getElementById(id).removeAttribute("class");
//             for(i=0;i<todo.length;i++){
//                 taskitem = todo[i];
//                 if(taskitem.id == id){
//                     taskitem.status = 0;
//                     saveList(todo);
//                 }
//             }
//         break;
//         default:
//             break;
//     }
// }

function hide(){
    document.getElementById("view1").style.display="none";
    document.getElementById("view2").style.display="block";
}

function show(){
    document.getElementById("view1").style.display="block";
    document.getElementById("view2").style.display="none";
}

function addCordovaEvents(){
    document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady(){
    document.addEventListener("pause",function(){saveList(todo);},false);
    document.addEventListener("resume",function(){loadList(todo);},false);
    document.addEventListener("backbutton",function(){saveList(todo);navigator.app.exitApp();},false);
}