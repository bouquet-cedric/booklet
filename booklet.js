var bookActif = false;

function styleOpen(div) {
    div.style.position = "absolute";
    div.style.bottom = "5px";
    div.style.boxShadow = "0px 0px 10px 2px black";
    div.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    div.style.width = "50%";
    div.style.borderRadius = "50%";
    div.style.height = "15pt";
    div.style.color = "black";
    div.textContent = "\u2727";
    div.style.cursor = "pointer";
}

function styleDiv() {
    var divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
        let div = divs[i];
        if (div.classList.contains("title_page")) {
            div.style.textAlign = "center"
        } else if (div.classList.contains("etagere")) {
            div.style.margin = "auto";
            div.style.width = "80%";
        } else if (div.classList.contains("etage")) {
            div.style.position = "relative";
            div.style.display = "block";
            div.style.backgroundImage = "url('resources/etage2.png')";
            div.style.width = "100%";
            div.style.backgroundSize = "100% 100%";
            div.style.backgroundRepeat = "no-repeat";
            div.style.height = "40vmin";
            let etageTmp = document.createElement("div");
            etageTmp.innerHTML = div.innerHTML;
            etageTmp.classList.add("stage");
            etageTmp.style.position = "absolute";
            etageTmp.style.display = "flex";
            etageTmp.style.width = "90%";
            etageTmp.style.height = "75%";
            etageTmp.style.bottom = "5%";
            etageTmp.style.left = "5%";
            etageTmp.style.zIndex = "300";
            etageTmp.style.flexDirection = "row";
            div.innerHTML = '';
            div.appendChild(etageTmp);
        } else if (div.classList.contains("book")) {
            div.style.backgroundImage = "url('resources/book.png')";
            div.style.backgroundSize = "cover";
            div.style.backgroundRepeat = "no-repeat";
            div.style.position = "relative";
            div.style.width = "5%";
            div.style.color = "antiquewhite";
            div.style.display = "flex";
            div.style.flexDirection = "column";
            div.style.textAlign = "center";
            div.style.alignItems = "center";
            div.style.justifyContent = "center";
        } else if (div.classList.contains("title")) {
            div.style.writingMode = "vertical-rl";
            div.style.backgroundColor = "#fff";
            div.style.color = "black";
            div.style.borderRadius = "20px";
            div.style.padding = "1em 0.2em";
            div.style.boxShadow = "0px 0px 5px 1px white";
        } else if (div.classList.contains("page")) {
            div.style.display = "none";
            div.style.backgroundImage = "url('resources/test.png')";
            div.style.backgroundSize = "100% 100%";
            div.style.backgroundColor = "transparent";
            div.style.backgroundRepeat = "no-repeat";
        } else if (div.classList.contains("one") || div.classList.contains("two")) {
            div.style.width = "50%";
            let newContainer = document.createElement("div");
            let content = div.innerHTML;
            div.innerHTML = '';
            newContainer.innerHTML = content;
            div.appendChild(newContainer);
            newContainer.style.width = "80%";
            newContainer.style.marginLeft = "auto";
            newContainer.style.textAlign = "left";
        }
    }
}

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        return "up";
    } else if (e.keyCode == '40') {
        return "down";
    } else if (e.keyCode == '37') {
        return "left";
    } else if (e.keyCode == '39') {
        return "right";
    } else if (e.keyCode == '27') {
        return "echap";
    }

}

function styleBody() {
    document.body.style.backgroundColor = "rgba(80,60,40,0.5)";
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * max);
}

function displayPage(pages, page) {
    bookActif = true;
    let div = pages[page - 1];
    div.style.display = "flex";
    div.style.width = "90%";
    div.style.position = "fixed";
    div.style.top = "5%";
    div.style.left = "5%";
    div.style.height = "90%";
    div.style.color = "blue";
    div.style.zIndex = "100";
    var activeRight = true;
    var activeLeft = true;
    if (page == pages.length) activeRight = false;
    if (page == 1) activeLeft = false;
    let btnLeft = document.createElement("button");
    let btnRight = document.createElement("button");
    let boutons = [btnLeft, btnRight];
    for (let i in boutons) {
        let elt = boutons[i];
        elt.style.position = "absolute";
        elt.style.cursor = "pointer";
        elt.style.bottom = "0";
        elt.addEventListener("click", function() {
            let newpage = -1;
            if (this == btnLeft) newpage = page - 1;
            else newpage = page + 1;
            this.remove();
            pages[page - 1].style.display = "none";
            displayPage(pages, newpage);
        });
        document.onkeydown = function(e) {
            let newpage = -1;
            if (checkKey(e) == "left") {
                newpage = page - 1;
            } else if (checkKey(e) == "right") {
                newpage = page + 1;
            }
            if (checkKey(e) == "right" && activeRight && bookActif) {
                pages[page - 1].style.display = "none";
                displayPage(pages, newpage);
            }
            if (checkKey(e) == "left" && activeLeft && bookActif) {
                pages[page - 1].style.display = "none";
                displayPage(pages, newpage);
            }
            if (checkKey(e) == "echap") {
                for (let i in pages) {
                    pages[i].style.display = "none";
                }
                let btns = document.getElementsByTagName("button");
                for (let i of btns) {
                    i.remove();
                }
                document.getElementById("closer").remove();
                bookActif = false;
            }
        }
    }
    btnRight.style.right = "0";
    btnLeft.style.left = "0";
    btnRight.textContent = ">";
    btnLeft.textContent = "<";
    if (activeLeft) div.appendChild(btnLeft);
    if (activeRight) div.appendChild(btnRight);
    let close = document.createElement("span");
    close.id = "closer";
    close.style.backgroundColor = "red";
    close.textContent = "\u2716";
    close.style.position = "fixed";
    close.style.fontSize = "24px"
    close.style.top = "0";
    close.style.right = "0";
    close.style.color = "white";
    close.style.padding = "0.5em";
    close.style.cursor = "pointer";
    div.appendChild(close);
    close.addEventListener("click", function() {
        for (let i in pages) {
            pages[i].style.display = "none";
        }
        let btns = document.getElementsByTagName("button");
        for (let i of btns) {
            i.remove();
        }
        this.remove();
        bookActif = false;
    });
}

function initBooks() {
    var all = document.getElementsByClassName("book");
    let next = -1;
    for (let i = 0; i < all.length; i++) {
        let randi = getRandomInt(5, 10);
        while (next == randi) {
            randi = getRandomInt(5, 10);
        }
        next = randi;
        all[i].style.top = randi + "%";
        all[i].style.height = (100 - randi) + "%";
        let openbloc = document.createElement("div");
        styleOpen(openbloc);
        openbloc.classList.add("open");
        all[i].appendChild(openbloc);
        all[i].id = all[i].children[0].textContent;
        console.log(openbloc);
        openbloc.addEventListener("click", function(event) {
            let prt = this.parentElement;
            console.log(prt);
            let pages = [];
            let cpt = 1;
            for (let j = 0; j < prt.children.length; j++) {
                if (prt.children[j].classList.contains("page")) {
                    pages.push(prt.children[j]);
                    pages[cpt - 1].style.display = "none";
                    cpt++;
                }
            }
            if (pages.length > 0) displayPage(pages, 1);
        })
    }
}

function initBooklet() {
    styleBody();
    styleDiv();
    initBooks();
}