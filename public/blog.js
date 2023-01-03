let API = 'http://localhost:3650/api/v1/blog/'
let tableInfo = document.getElementById("tableInfo");
let renderList = document.createElement('tr');
let tbody = document.getElementById("tbody");
let formHandle = document.getElementById("formHandle");
let toast = document.getElementById("toast");
let toastParent = document.getElementById("toastParent");
toastParent.style.visibility = "hidden";
let UserPanel = document.getElementById("userPanel");
let formRequest = {
    title: '',
    body: '',
}
datarenderList = ``;
let row = document.createElement("tr");
let fetchPage = (pageView) => {
    fetch('http://localhost:3650/api/v1/blog/' + pageView)
        .then(response => response.json())
        .then(data => {
            let dataGet = data.records;
            console.log(dataGet);
            let newHTML = '';
            for (let i = 0; i < dataGet.length; i++) {
                newHTML += `<tr>` + "<td>" + i + "</td><td>" + dataGet[i].id + "</td>" + `<td>` + `<input name='titleBlog' id='titleBlog${i}' class="inputBlogDisable" type="text" value="${dataGet[i].title}"></input>` + "</td>" + `<td>` + `<input name='bodyBlog' id='bodyBlog${i}' class="inputBlogDisable" type="text" value="${dataGet[i].body}" ></input>` + "</td><td>"+ `<img style="width: 100px;" src="${dataGet[i].image}" alt="">` + "</td><td>" + dataGet[i].userId + "</td><td>" + `<div id='updateAndDelete${i}'>` + `<i id= 'remove${i}' class='fa-solid fa-trash'></i><i id= 'update${i}' class='fa-solid fa-pen update'></i>` + "</div>" + "</td>" + `</tr>`;
            }
            tbody.innerHTML = newHTML;
            for (let i = 0; i < dataGet.length; i++) {
                formRequest.title = dataGet[i].title;
                formRequest.body = dataGet[i].body;
                let update = document.getElementById(`update${i}`);
                let remove = document.getElementById(`remove${i}`);
                let updateAndDelete = document.getElementById(`updateAndDelete${i}`);
                let clickUpdate = document.createElement('i');
                let titleBlog = document.getElementById(`titleBlog${i}`);
                let bodyBlog = document.getElementById(`bodyBlog${i}`);
                titleBlog.disabled = true;
                bodyBlog.disabled = true;
                update.style.width = "10px";
                clickUpdate.style.width = "40px";
                clickUpdate.className = 'fa-solid fa-check';
                clickUpdate.id = `clickUpdate${i}`;
                update.addEventListener("click", () => {
                    update.style.visibility = "hidden";
                    update.style.position = "absolute";
                    clickUpdate.style.visibility = "visible";
                    clickUpdate.style.position = "relative";
                    updateAndDelete.append(clickUpdate);
                    titleBlog.className = 'inputBlog';
                    bodyBlog.className = 'inputBlog';
                    titleBlog.disabled = false;
                    bodyBlog.disabled = false;
                    let formHandleNameBlog = formHandle.titleBlog;
                    formHandleNameBlog.forEach(element => {
                        element.addEventListener('input', () => {
                            formRequest.title = element.value;
                        });
                    });
                    let formHandleUsernameBlog = formHandle.bodyBlog;
                    formHandleUsernameBlog.forEach(element => {
                        element.addEventListener('input', () => {
                            formRequest.body = element.value;
                        });
                    });
                });
                clickUpdate.addEventListener("click", () => {
                    clickUpdate.style.visibility = "hidden";
                    clickUpdate.style.position = "absolute";
                    update.style.visibility = "visible";
                    update.style.position = "relative";
                    titleBlog.className = 'inputBlogDisable';
                    bodyBlog.className = 'inputBlogDisable';
                    titleBlog.disabled = true;
                    bodyBlog.disabled = true;
                    let fetchUpdate = (file) => {
                        fetch(file + dataGet[i].id, {
                            method: "PUT",
                            headers: {
                                "content-Type": "application/json"
                            },
                            body: JSON.stringify(formRequest),
                        })
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(err => console.log(err));
                            toastParent.style.visibility = "visible";
                            toast.innerHTML = `<div id="updateSuccess" styl class="updateSuccess">Update success</div>`
                            toastParent.append(toast);
                        }
                    fetchUpdate(API);
                });
                remove.addEventListener("click", () => {
                    row.style.animation = " fade 0.5s linear"
                    let removeParent = remove.parentElement.parentElement.parentElement
                    setTimeout(() => {
                        removeParent.remove();
                        let fetchDelete = (file) => {
                            fetch(file + dataGet[i].id, {
                                method: "DELETE",
                                headers: {
                                    "content-Type": "application/json"
                                },
                            })
                                .then(response => response.json())
                                .then(data => console.log(data))
                                .catch(err => console.log(err))
                                toastParent.style.visibility = "visible";
                                toast.innerHTML = `<div id="removeSuccess" styl class="deleteSuccess">Remove success</div>`
                                toastParent.append(toast);
                               
                        }
                        fetchDelete(API);
                    }, 600);
                });
            };

        })
        .catch(err => console.log(err));
}
fetchPage(1);
const pagination = document.getElementById('pagination');
const perPage = document.querySelectorAll('.perPage');
let paginationFunc = () => {
    pagination.addEventListener("click", (e) => {
        let pageView = '';
        const target = e.target;
        e.preventDefault();
        if (target.tagName === "A") {
            const page = target.getAttribute("data-page");
            switch (page) {
                case "first":
                    fetchPage(1)
                    break;
                    // case "prev":
                    // console.log(pageView);
                    // fetchPage(pageView)
                    break;
                case "last":
                    pageView = "last";
                    fetchPage(pageView);
                    break;
                default:
                    if (page !== "first" || page !== "prev" || page !== "last") {
                        pageView = page;
                        fetchPage(pageView);
                    };
                    break;
            };
        };
    });
};
paginationFunc();



// fetch('http://localhost:3650/api/v1/blog')
//     .then(response => response.json())
//     .then(data => {
//         let dataGet = data.records;
//         dataGet.forEach((element, index) => {
//             var row = document.createElement("tr");
//             row.innerHTML += "<td>" + index + "</td><td>" + element.id + "</td><td>" + element.titleBlog + "</td><td>" + element.body + "</td><td>" + `<img class="imageUsingBlog" src="${element.image}" alt="error"></img>` + "</td><td>"+ element.userId + "</td><td>" + "<div> <i class='fa-solid fa-trash'></i><i id='update' class='fa-solid fa-pen'></i></div>" + "</td>";
//             tbody.appendChild(row);  
//         });
     

//     })
//     .catch(err => console.error(err));




