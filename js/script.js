let imgdis = document.querySelector(".imgdis");
let imgpop = document.querySelector(".imgpop");
let searchinput = document.querySelector("#search");
let searchbtn = document.querySelector(".search");
let showmoreBtn = document.querySelector(".btn");

const downloadimg = (element) => {
    fetch(element).then(res => res.blob()).then(file => {
        let tempurl = URL.createObjectURL(file);
        console.log(tempurl);
        let aTag = document.createElement("a");
        aTag.href = tempurl;
        aTag.download = "filename";
        document.body.appendChild(aTag);
        aTag.click()
        aTag.remove();
    })
}

const imgpopup = (element) => {
    imgpop.classList.toggle("active");
    imgpop.innerHTML = `
        <div>
            <i class="fa-solid fa-times"></i>
            <img src="${element.urls.thumb}" alt="">
            <i class="fa-solid fa-download"></i>
        </div>
    `;

    document.querySelector(".fa-times").addEventListener("click", () => imgpop.classList.remove("active"));
    document.querySelector(".fa-download").addEventListener("click", () => downloadimg(element.urls.thumb));
}

const searchimg = async () => {
    imgdis.innerHTML = ``;

    const searchurl = await fetch(`https://api.unsplash.com/search/photos?query=${searchinput.value}&client_id=jvTX7L8CsqkSktu_Kc7wf_lB_M8o2eEE6QU66qOYEtI`);
    const searchjson = await searchurl.json();
    // console.log(searchjson);
    let searchResult = searchjson.results;
    console.log(searchResult);
    // console.log(searchinput.value);
    searchinput.value = "";

    searchResult.forEach(element => {
        let cdiv = document.createElement("div");
        cdiv.innerHTML += `
            <img src="${element.urls.thumb}" alt="" class="imgclick">
        `;

        cdiv.querySelector(".imgclick").addEventListener("click", () => imgpopup(element))

        imgdis.insertAdjacentElement("afterbegin",cdiv)
    });
    showmoreBtn.style.display = "block";
}

searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchimg();
})
