function spanChecked(id) {
let spans = document.querySelectorAll(".container form .addedContent span.check");

spans.forEach((ele) => {
    ele.addEventListener("click", function(e) {
        if(id == e.currentTarget.parentElement.id) {
            let src  = "images/icon-check.svg";
            ele.classList.toggle("click");
            if(ele.classList.contains("click")) {
                ele.innerHTML = `<img src=${src} alt="icon"/>`;
                ele.previousElementSibling.classList.add("active-item");
            } else {
                ele.innerHTML = ``;
                ele.previousElementSibling.classList.remove("active-item");
            }
        }
    });
});
}

function comptBoxShow(arr) {
    let cpt = 0;
    arr.forEach(e => {
        if(!e.classList.contains("hidden")) {
            cpt += 1;
        }
    });
    document.querySelector(".container form .listItems .footList .inforList .numElem").textContent = `${cpt}`;
}
comptBoxShow(document.querySelectorAll(".container form .addedContent.itemList"));

let listLis = document.querySelectorAll(".container form .listItems .footList > ul.inforList > li.list-child ul > li");

document.querySelector(".container form .listItems .footList > ul.inforList > li.delete").addEventListener("click", function() {
    let items = document.querySelectorAll(".container form .addedContent.itemList");
    items.forEach((ele) => {
        if(ele.children[0].textContent.search(/Complete/i) != -1) {
            ele.remove();
        }
    });
});

function choseItemsWithLis(valueLi) {
    let items = document.querySelectorAll(".container form .addedContent.itemList");
    document.querySelector(".container form .listItems .footList .inforList .numElem").textContent = `${0}`;
    if(valueLi == "All") {
        listLis.forEach((li) => {
            li.classList.remove("active");
        });
        document.querySelector(".container form .listItems .footList > ul.inforList > li.list-child ul > li:first-of-type").classList.add("active");
        items.forEach((ele) => {
            if(ele.classList.contains("hidden")) {
                ele.classList.remove("hidden");
                ele.style.position = "relative";
            }
        });
    } else if(valueLi == "Active") {
        items.forEach((ele) => {
            if(ele.children[1].classList.contains("click")) {
                ele.classList.remove("hidden");
                ele.style.position = "relative";
            } else {
                ele.classList.add("hidden");
                setTimeout(() => {
                    ele.style.position = "absolute";
                }, 350);
            }
        });
    } else if(valueLi == "Completed") {
        items.forEach((ele) => {
            if(ele.children[0].textContent.search(/Complete/i) != -1) {
                ele.classList.remove("hidden");
                ele.style.position = "relative";
            } else {
                ele.classList.add("hidden");
                setTimeout(() => {
                    ele.style.position = "absolute";
                }, 350);
            }
        });
    }
    comptBoxShow(items);
}

listLis.forEach((ele) => {
    ele.addEventListener("click", function(event) {
        if(!event.currentTarget.classList.contains("active")) {
            listLis.forEach((li) => {
                li.classList.remove("active");
            });
            event.currentTarget.classList.add("active");
            choseItemsWithLis(event.currentTarget.dataset.text);
        }
    });
});

function deleteItem(idParent) {
    let listImgsCros = document.querySelectorAll(".container form .addedContent.itemList > img"); 
    listImgsCros.forEach((ele) => {
        ele.addEventListener("click", function(e) {
            if(e.currentTarget.parentElement.id == idParent) {
                ele.parentElement.remove();
                let content = document.querySelector(".container form .listItems .footList .inforList .numElem").textContent;
                document.querySelector(".container form .listItems .footList .inforList .numElem").textContent = `${parseInt(content) - 1}`;
            }
        });
    });
}

function submitIdEle() {
    let listElesContent = document.querySelectorAll(".container form .addedContent");
    listElesContent.forEach((ele) => {
        spanChecked(ele.id);
        deleteItem(ele.id);
    });
}
submitIdEle();

function addItmenTodo(value, id) {
    let listItems = document.querySelector(".container form .listItems");
    let box = document.querySelector(".container form .addedContent").cloneNode(true);
    let img  = document.createElement("img");
    let para = document.createElement("p");
    img.src = ["images/icon-cross.svg"];
    img.setAttribute("alt","iconDel");
    box.classList.add("itemList");
    box.setAttribute("id",id);
    box.appendChild(img);
    box.children[0].remove();
    box.prepend(para);
    box.children[0].textContent = `${value}`;
    listItems.prepend(box);
    spanChecked(id);
    deleteItem(id);
    choseItemsWithLis("All");
}

function createItemValue() {
    let input = document.querySelector(".container form .addedContent input[type='text']");
    let cpt = document.querySelectorAll(".container form .addedContent.itemList").length;
    input.addEventListener("keydown", function(e) {
        if(e.key == "Enter") {
            cpt += 1;
            addItmenTodo(input.value, cpt);
            input.value = ``;
            e.preventDefault();
        }
    });
}

createItemValue();

document.querySelector(".container .header img").addEventListener("click", function() {
    let box =  document.querySelector(".container .header");
    let spans =  document.querySelectorAll(".container form .addedContent span");
    let boxsList = document.querySelectorAll(".container form .addedContent");
    if(!box.children[1].classList.contains("dark")) {
        box.classList.add("dark");
        box.children[1].classList.add("dark");
        box.children[1].src = "images/icon-sun.svg";
        document.body.style.setProperty("--Very-Light-Gray", "hsl(235, 24%, 19%)");
        document.body.style.setProperty("--Very-Dark-Grayish-Blue", "hsl(236, 33%, 92%)");
        document.body.style.setProperty("--Very-Light-Grayish-Blue", "hsl(235, 21%, 11%)");
        document.body.style.setProperty("--Light-Grayish-Blue", "hsl(233, 11%, 84%)");
        document.body.style.setProperty("--Dark-Grayish-Blue", "hsl(234, 11%, 52%)");
        document.body.style.setProperty("--Bright-Blue", "hsl(220, 98%, 61%)");
        document.body.style.setProperty("--dark-para-color","white");
        spans.forEach((ele) => {ele.classList.add("dark");});
        boxsList.forEach((ele) => {ele.classList.add("dark");});
        document.querySelector(".container form .addedContent input[type='text']").classList.add("dark");
        document.querySelector(".container form .listItems .footList").classList.add("dark");
    } else {
        box.classList.remove("dark");
        box.children[1].classList.remove("dark");
        box.children[1].src = "images/icon-moon.svg";
        document.body.style.setProperty("--Very-Light-Gray", "hsl(0, 0%, 98%)");
        document.body.style.setProperty("--Very-Dark-Grayish-Blue", "hsl(235, 19%, 35%)");
        document.body.style.setProperty("--Very-Light-Grayish-Blue", "hsl(236, 33%, 92%)");
        document.body.style.setProperty("--Light-Grayish-Blue", "hsl(233, 11%, 84%)");
        document.body.style.setProperty("--Dark-Grayish-Blue", "hsl(236, 9%, 61%)");
        document.body.style.setProperty("--Bright-Blue", "hsl(220, 98%, 61%)");
        document.body.style.setProperty("--dark-para-color","hsl(235, 21%, 11%)");
        spans.forEach((ele) => {ele.classList.remove("dark");});
        boxsList.forEach((ele) => {ele.classList.remove("dark");});
        document.querySelector(".container form .addedContent input[type='text']").classList.remove("dark");
        document.querySelector(".container form .listItems .footList").classList.remove("dark");
    }
});