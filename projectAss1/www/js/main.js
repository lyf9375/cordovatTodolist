
var app=
{
    userid:'',
    email:'',
}

window.addEventListener('load', onWindowLoad);

function onWindowLoad()
{
    hide();
    firebase.auth().onAuthStateChanged(function (user) 
    {
        if (user) {
            app.userid = user.uid;
            app.email = user.email;
            getEmail(app.userid);
            loadList();
            fixButton();
            document.getElementById("hello").innerHTML="Hello&nbsp"+app.email;
    
        } 
        else {
            app.userid = '';
            app.email = '';
            loadList();
            fixButton();
            document.getElementById("task-list").innerHTML="";
        }
    });
    loadList();
}

function savetask()
{
    
    var inputform = document.getElementById("input-form");
    var task=document.getElementById("task").value;
    var date=document.getElementById("date").value;
    if(task!="" && task!=undefined){
        createTask(task,date);
        inputform.reset();
    }
};

function createTask(task,date){
    var id = new Date().getTime();
    var ref='users/'+app.userid+'/tasks/'+id;
    var obj={
        task:task,
        date:date
    };
    writeData(ref,obj);
}

function loadList(){
    firebase.database().ref('users/'+app.userid+'/tasks').once('value')
    .then(function (snapshot)
    {
        var tasks=snapshot.val();
        renderList(tasks);
    })
    .catch(function (error) {
        console.log(error.message);
    });
}

function renderList(obj){
    var taskcontainer = document.getElementById("task-list");
    hide();
    taskcontainer.innerHTML="";
    var itemstotal = Object.keys(obj).length;
    var itemkey = Object.keys(obj);
    var itemvalue =Object.values(obj);
    
    
    for(var i=0;i<itemstotal;i++){
        var item = itemkey[i];
        var taskname = itemvalue[i].task;
        var taskdate = itemvalue[i].date;
        //notification(taskname,taskdate);
        
        
        
        var listitem = document.createElement('LI');
        listitem.setAttribute("class","list-group-item");
        listitem.setAttribute("id","l"+item);
        var tasklisttext = document.createTextNode(taskname);
        var datelisttext = document.createTextNode(taskdate);
        var head = document.createElement('H5');
        head.setAttribute("class","list-group-item-heading");
        head.appendChild(datelisttext);
        var text = document.createElement('H5');
        text.setAttribute("class","list-group-item-text");
        text.appendChild(tasklisttext);
        
        var span=document.createElement('SPAN');
        span.setAttribute("class","pull-right");
        var button = document.createElement('BUTTON');
        var buttontext = document.createTextNode("DELETE");
        button.appendChild(buttontext);
        button.setAttribute("id",item);
        //button.setAttribute("onclick",deleteTask(item))
        button.onclick=function(val){return function(){deleteTask(val);}}(item);
        
        span.appendChild(button);
        
        var right = document.createElement('DIV');
        right.setAttribute("class","col-xs-9");
        
        var left = document.createElement('DIV');
        left.setAttribute("class","col-xs-3");
        
        right.appendChild(span);
        left.appendChild(head);
        left.appendChild(text);
        
        var container= document.createElement('DIV');
        container.setAttribute("class","container");
        
        container.appendChild(left);
        container.appendChild(right);
        
        listitem.appendChild(container);
        
        taskcontainer.appendChild(listitem);
        
    }
}

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
    document.addEventListener("notification",function(){notification()},false);
}

function notification(task,date){
    
    cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Notification",
        text: task,
        at: date,
    });
    vibrate();
    playBeep();
}

function vibrate() {
    navigator.notification.vibrate(2000);
}

function playBeep() {
    navigator.notification.beep(3);
}

$scope


function register() 
{
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () 
    {
        var userid = firebase.auth().currentUser.uid;
        var ref = 'users/' + userid;
        var obj = {
            email:email
        };
        app.email = email;
        app.userid=userid;
        writeData(ref,obj);
    })
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
    document.getElementById('login-form').reset();
}


function login() 
{
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
        var userid=firebase.auth().currentUser.uid;
        getEmail(userid);
        fixButton()
        loadList();
    })
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
    document.getElementById('login-form').reset();
}


function logout()
{
    firebase.auth().signOut()
    .then(function () {
        fixButton()
        loadList();
    })
    .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });   
}


function getEmail(userid)
{
    firebase.database().ref('users/'+userid).once('value')
    .then(function(snapshot)
    {
        var email=snapshot.val().email;
        app.email=email;
    });
}

function writeData(ref,obj)
{
    firebase.database().ref(ref).set(obj)
    .then(function (result) 
    {
      console.log(result);
    });
}


function deleteTask(id)
{
    var appendtask=document.getElementById("l"+id);
    appendtask.parentNode.removeChild(appendtask);
    console.log(appendtask);
    var ref='users/'+app.userid+'/tasks/'+id;
    firebase.database().ref(ref).remove()
    .then(function (result){
      console.log(result);
    })
}

function fixButton(){
    if(!app.userid)
    {
        document.getElementById("loginBtn").style.display="block";
        document.getElementById("logoutBtn").style.display="none";
    }
    else
    {
        document.getElementById("loginBtn").style.display="none";
        document.getElementById("logoutBtn").style.display="block";
    }
}

