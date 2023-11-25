const { nanoid } = require("nanoid");
const { notes } = require("./notes");

const getNotes = (request, h) => {
    const data = {
        status: "success",
        data: {
            notes,
        },
    };
    return data;
};

const getNote = (request, h) => {
    const { id } = request.params;
    const cekData = notes.filter((note) => note.id === id);
    if (cekData.length > 0) {
        const response = h.response({
            status: "success",
            data: {
                note: cekData[0],
            },
        });
        response.code(200);
        return response;
    } 
    const response = h.response({
        status: "fail",
        message: "Catatan tidak ditemukan",
    }).code(404);
    return response;
};

const addNote = (request, h) => {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const { title, tags, body } = request.payload;

    notes.push({
        id, title, createdAt, updatedAt, tags, body,
    });

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
 
    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Catatan berhasil ditambahkan",
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
};

const editNote = (request, h) => {
    const { id } = request.params;
    const updatedAt = new Date().toISOString();
    const { title, tags, body } = request.payload;

    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "Catatan berhasil diperbarui",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui catatan. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

const deleteNote = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Catatan berhasil dihapus",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = {
    getNotes, getNote, addNote, editNote, deleteNote,
};