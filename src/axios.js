// Frontend connection with backend with axios


// AXIOS INSTANCE
const axiosInstance = axios.create({
    baseURL: 'https://cc19todoapp.herokuapp.com'
});

// AXIOS GLOBALS 
axios.defaults.headers.common['x-auth-token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE4NjhjZTExZjBmZDAwMTc4ZWFmMjgiLCJsb2dpbiI6IkpvaG5ueUJyYXZvMDA3IiwiZW1haWwiOiJqb2hubnkwMDdAYnJhdm8uY29tIiwiaWF0IjoxNTc4NjYwNDQ2fQ.Ecu9bj-qUX2vmRWESmuLyIyH3wHK1s4ADoF-x6F49W4";


// // // NAVBAR

//TASKS / method GET
// All tasks
const getDataAll = () => {
    axiosInstance.get("/api/tasks/")
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// Checked tasks
const getDataChecked = () => {
    axiosInstance.get("/api/tasks?checked=true")
        .then(response => {
            console.log(response);
        });
};

// Unchecked tasks
const getDataUnchecked = () => {
    axiosInstance.get("/api/tasks?checked=false")
        .then(response => {
            console.log(response);
        });
};

// SIGN OUT / method POST ==== we have no logic for sign out ?
// sendSignOut = () => {
//     axiosInstance.post("/api/auth/:id", { 
//             userId: String
//         })
//         .then(response => {
//             console.log(response);
//         });
// };

// REGISTER /  method POST
const sendData = () => {
    const login = document.getElementById('formGroupExampleInput').addEventListener('input', function (e) {
        const val = this.value;
        console.log(val);
    });
    const email = document.getElementById('exampleInputEmail1').addEventListener('input', (evt) => {
        save(this.value);
    });
    const password = document.getElementById('exampleInputPassword1').addEventListener('input', (evt) => {
        save(this.value);
    });
    axiosInstance.post("/api/auth/", {
            login: login,
            email: email,
            password: password
        }).then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// SIGN IN FORM / method POST
const sendSignIn = () => {
    axiosInstance.post("/api/auth/", {
            email: email,
            password: password
        })
        .then(response => {
            showLogin(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// MODAL - CREATE NEW TASK / method POST 
const sendDataTask = () => {
    axiosInstance.post("/api/tasks/", {
            // _userID: req.body.userID,
            // _listID: req.body.listID,
            // name: req.body.name
            _userID: userID,
            name: name
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// CHECKBOX = MARK A SINGLE TASK AS Checked / Unchecked / method PATCH
const checkTask = () => {
    axiosInstance.patch("/api/tasks/:id", {
            checked: "true" || "false"
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// ADD TASK TO A GIVEN LIST / method POST 
const sendTaskToList = () => {
    axiosInstance.post("/api/tasks/", {
            _userID: userID,
            _listID: listID,
            name: name
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// Move task to another list / method PATCh
const moveTaskFromList = () => {
    axiosInstance.patch("/api/tasks/:id/move_to/:listID")
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// Remove task from tasks collection / method DELETE
const removeTask = () => {
    axiosInstance.delete("/api/tasks/:id") // id task
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// TODO LIST = CARDS
// Return all lists belonging to the given users / method GET
const getDataAllLists = () => {
    axiosInstance.post("/api/lists/", {
            _userID: userID
        })
        .then(response => {
            console.log(response);
        });
};

// ADD NEW LIST / method POST
const sendDataList = () => {
    const name = document.getElementById('name-list').addEventListener('change');

    axiosInstance.post("/api/lists/", {
            params: {
                _userID: req.user._id,
                name: req.body.name
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err, err.response);
        });
};

// EDIT LIST TITLE / method PATCH 
const editListTitle = () => {
    axiosInstance.patch("/api/lists/:id", {
            name: name
            // list.name:
            //  const list = new List({
            //_     userID: req.user._id,
            //      name: req.body.name,
            //  });
        })
        .then(response => {
            console.log(response);
        });
};

// DELETE LIST / method DELETE
const deleteListCard = () => {
    axiosInstance.delete("/api/lists/:id")
        .then(response => {
            console.log(response);
        });
};



// INTERCEPTING REQUESTS & RESPONSES 

// SHOW OUTPUT IN BROWSER

function showLogin(response) {
    document.getElementById('show-login').innerHTML = `
        <div class="form-group">
            <label for="formGroupExampleInput">Your Name ${JSON.stringify(response.data, null, 2)}</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="First name"
                autocomplete="username">
        </div>

    `
};

// function showOutput(res) {
//     document.getElementById('res').innerHTML = `
//         <div class = "card">
//             <div class = "card-body">
//                 <pre> Response here: ${JSON.stringify(res.data, null, 2)}</pre> 
//             </div>
//         < /div>
//     `
// };
// const getAll = document.getElementById('get').addEventListener('click', simData);







// EVENT LISTENERS

// ______All tasks
document.getElementById('get-all-tasks').addEventListener('click', getDataAll);
// ______All checked tasks
document.getElementById('get-checked-tasks').addEventListener('click', getDataChecked);
// ______All unchecked tasks
document.getElementById('get-unchecked-tasks').addEventListener('click', getDataUnchecked);
// ______Sign out
// document.getElementById('post-sign-out').addEventListener('click', sendSignOut);
// ______Register user
document.getElementById('post-sign-up').addEventListener('click', sendData);
// ______Sign in user
document.getElementById('post-sing-in').addEventListener('click', sendSignIn); //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ?????
// ______Create new task
document.getElementById('post-task').addEventListener('click', sendDataTask);
// ______Checked / Unchecked tasks
document.getElementById('inlineCheckbox1').addEventListener('change', checkTask);
// ______Add task to list
document.getElementById('post-task-to-list').addEventListener('change', sendTaskToList);
// ______Move task to another list 
document.getElementById('post-task-to-list').addEventListener('change', moveTaskFromList);
// ______Remove task from list
document.getElementById('delete-task').addEventListener('click', removeTask);
// ______Return all lists belonging to the given users
document.getElementById('get-all-lists').addEventListener('change', getDataAllLists); // _____Event listener type "loadend"????
// ______Create new list
document.getElementById('post-new-list').addEventListener('click', sendDataList);
// ______Edit list title
document.getElementById('patch-list-title').addEventListener('click', editListTitle);
// ______Delete list
document.getElementById('delete-list').addEventListener('click', deleteListCard);