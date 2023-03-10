let API = 'http://localhost:3650/api/v1/users/'
let tableInfo = document.getElementById("tableInfo");
let renderList = document.createElement('tr');
let tbody = document.getElementById("tbody");
let formHandle = document.getElementById("formHandle");
let toast = document.getElementById("toast");
let toastParent = document.getElementById("toastParent");
toastParent.style.visibility = "hidden";
let UserPanel = document.getElementById("userPanel");
let formRequest = {
    name: '',
    username: '',
    website: '',
    phone: '',
}
datarenderList = ``;
let row = document.createElement("tr");
let fetchPage = (pageView) => {
    fetch('http://localhost:3650/api/v1/users/' + pageView)
        .then(response => response.json())
        .then(data => {
            let dataGet = data.records;
            let newHTML = '';
            for (let i = 0; i < dataGet.length; i++) {
                newHTML += `<tr>` + "<td>" + dataGet[i].id + "</td><td>" + dataGet[i].id + "</td>" + `<td>` + `<input name='nameBlog' id='nameBlog${i}' class="inputBlogDisable" type="text" value="${dataGet[i].name}"></input>` + "</td>" + `<td>` + `<input name='usernameBlog' id='usernameBlog${i}' class="inputBlogDisable" type="text" value="${dataGet[i].username}" ></input>` + "</td><td>" + dataGet[i].email + "</td>" + `<td>` + `<input name='websiteBlog' id='websiteBlog${i}' class="inputBlogDisable" type="text" value="${dataGet[i].website}" ></input>` + "</td>" + `<td>` + `<input name='phoneBlog' id='phoneBlog${i}' name="usernameBlog" class="inputBlogDisable" type="text" value="${dataGet[i].phone}" ></input>` + "</td><td>" + dataGet[i].street + "</td><td>" + dataGet[i].suite + "</td><td>" + dataGet[i].city + "</td><td>" + dataGet[i].password + "</td><td>" + dataGet[i].role + "</td><td>" + `<div id='updateAndDelete${i}'>` + `<i id= 'remove${i}' class='fa-solid fa-trash'></i><i id= 'update${i}' class='fa-solid fa-pen update'></i>` + "</div>" + "</td>" + `</tr>`;
            }
            tbody.innerHTML = newHTML;
            for (let i = 0; i < dataGet.length; i++) {
                formRequest.name = dataGet[i].name;
                formRequest.username = dataGet[i].username;
                formRequest.website = dataGet[i].website;
                formRequest.phone = dataGet[i].phone;
                let update = document.getElementById(`update${i}`);
                let remove = document.getElementById(`remove${i}`);
                let updateAndDelete = document.getElementById(`updateAndDelete${i}`);
                let clickUpdate = document.createElement('i');
                let nameBlog = document.getElementById(`nameBlog${i}`);
                let usernameBlog = document.getElementById(`usernameBlog${i}`);
                let websiteBlog = document.getElementById(`websiteBlog${i}`);
                let phoneBlog = document.getElementById(`phoneBlog${i}`);
                nameBlog.disabled = true;
                usernameBlog.disabled = true;
                websiteBlog.disabled = true;
                phoneBlog.disabled = true;
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
                    nameBlog.className = 'inputBlog';
                    usernameBlog.className = 'inputBlog';
                    websiteBlog.className = 'inputBlog';
                    phoneBlog.className = 'inputBlog';
                    nameBlog.disabled = false;
                    usernameBlog.disabled = false;
                    websiteBlog.disabled = false;
                    phoneBlog.disabled = false;
                    let formHandleNameBlog = formHandle.nameBlog;
                    formHandleNameBlog.forEach(element => {
                        element.addEventListener('input', () => {
                            formRequest.name = element.value
                        });
                    });
                    let formHandleUsernameBlog = formHandle.usernameBlog;
                    formHandleUsernameBlog.forEach(element => {
                        element.addEventListener('input', () => {
                            formRequest.username = element.value
                        });
                    });
                    let formHandleWebsiteBlog = formHandle.websiteBlog;
                    formHandleWebsiteBlog.forEach(element => {
                        element.addEventListener('input', () => {
                            formRequest.website = element.value
                        });
                    });
                    let formHandlePhoneBlog = formHandle.phoneBlog;
                    formHandlePhoneBlog.forEach(element => {
                        element.addEventListener('input', () => {
                            formRequest.phone = element.value
                        });
                    });
                });
                clickUpdate.addEventListener("click", () => {
                    clickUpdate.style.visibility = "hidden";
                    clickUpdate.style.position = "absolute";
                    update.style.visibility = "visible";
                    update.style.position = "relative";
                    nameBlog.className = 'inputBlogDisable';
                    usernameBlog.className = 'inputBlogDisable';
                    websiteBlog.className = 'inputBlogDisable';
                    phoneBlog.className = 'inputBlogDisable';
                    nameBlog.disabled = true;
                    usernameBlog.disabled = true;
                    websiteBlog.disabled = true;
                    phoneBlog.disabled = true;
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
                                .catch(err => console.log(err));
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
// let a = document.querySelectorAll(".perPage")
// a.forEach(element => {
//     element.addEventListener("click", (e) => {
//         if (e.target) {
//             e.target.style.background = "rgb(78, 189, 219)";
//             e.target.style.color = "#fff";
//         }
//     });
// })


