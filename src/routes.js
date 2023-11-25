const { getNotes, getNote, addNote, editNote, deleteNote } = require("./handler");

const setRoute = (method, path, handler) => ({
    method,
    path,
    handler,
});

const routes = [
    setRoute("POST", "/notes", addNote),
    setRoute("GET", "/notes", getNotes),
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNote,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: editNote,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNote,
    },
];
 
module.exports = routes;