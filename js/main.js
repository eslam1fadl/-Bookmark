var bookmarkName=document.getElementById('bookmarkName');
var bookmarkURL=document.getElementById('bookmarkURL');
var tableBody=document.getElementById('tableBody');
var bookmarkList=[];
if(localStorage.getItem('bookmarks')){
    bookmarkList=JSON.parse(localStorage.getItem('bookmarks'));
    display();
}
function addBookmark(){
    if (!(nameValidation() && urlValidation())) {
        Swal.fire({
            icon: 'error',
            text: 'Site name must contain at least 3 characters, and Site URL must be valid.',
        });
        return; 
    }
    var obj={
        bname:bookmarkName.value,
        burl:bookmarkURL.value

    }
    for(var i=0;i<bookmarkList.length;i++){
        if (bookmarkList[i].bname.toLowerCase() === obj.bname.toLowerCase()) {
            Swal.fire({
                icon: 'error',
                text: `Site name must contain at least 3 characters , Site URL must be a valid one ,This site name already exists`,
            });
            return;
        }
        

    }
    bookmarkList.push(obj);
    console.log(bookmarkList);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkList));
    removeBookmark();
    display();
}
function display(){
    var box='';
    for(var i=0;i<bookmarkList.length;i++){
        box+=`
        <tr>
        <td>${bookmarkList[i].bname}</td>
        <td>${i}</td>
        <td><button onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
        <td><a href="${bookmarkList[i].burl}" target="_blank"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        </tr>
        `
    }
    tableBody.innerHTML=box;
}

function removeBookmark(){
    bookmarkName.value=null;
    bookmarkURL.value=null;   
}

function deleteBookmark(index){
    bookmarkList.splice(index,1);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarkList));
    display();

}

function nameValidation(){
    var Regex=/^[A-z][a-z]{2,}$/
    if(Regex.test(bookmarkName.value)){
        bookmarkName.classList.add('is-valid');
        bookmarkName.classList.remove('is-invalid');

        return true
    }
    else{
        bookmarkName.classList.add('is-invalid');
        bookmarkName.classList.remove('is-valid');

        return false
    }
}
function urlValidation(){
    var Regex = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/.*)?$/; 
    if(Regex.test(bookmarkURL.value)){
       bookmarkURL.classList.add('is-valid');
        bookmarkURL.classList.remove('is-invalid');
        return true


       
    }
    else{
        bookmarkURL.classList.add('is-invalid');
       bookmarkURL.classList.remove('is-valid');
        return false

    }

}



