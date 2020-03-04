const User = require('./user');

var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const models = {};
/*
모든 모델을 한곳에서 처리
재사용 CRUD는 ./controller/reuseCRUD.js임
models.Menu, model.Control등으로 접근
/router/reuseCRUD.js에서 접근처리
*/
const menuSchema = new Schema({
    id: String,
    pid: String,
    comp: { type: Schema.ObjectId, ref: 'Company' },
    title: String,
    desc: String,
    creator: [{ type: Schema.ObjectId, ref: 'User' }],
    seq: Number,
    private: Boolean,
    access: [{ type: Schema.ObjectId, ref: 'accessGroup' }],
    layout: [{
        ctrid: { type: Schema.ObjectId, ref: 'control' },
        seq: Number,
        size: Number,
    }]
});

const accessGroupSchema = new Schema({
    comp: { type: Schema.ObjectId, ref: 'Company' },
    name: String,
    desc: String,
    users: [{ type: Schema.ObjectId, ref: 'User' }],
    subGroup: [{ type: Schema.ObjectId, ref: 'accessGroup' }]
});

const controlSchema = new Schema({
    comp: { type: Schema.ObjectId, ref: 'Company' },
    type: String,
    title: String,
    desc: String,
    created: { type: Date, default: Date.now },
    originctrid: { type: Schema.ObjectId, ref: 'control' },
    access: [{ type: Schema.ObjectId, ref: 'accessGroup' }],
    private: Boolean
});
const simpleSchema = new Schema({
    name: String,
    company: { type: Schema.ObjectId, ref: 'Company' },
    subgroup: [{ type: Schema.ObjectId, ref: 'simple' }]
});
const companySchema = new Schema({
    id: String,
    name: String,
    language: String,
    module: String
});
models.Control = mongoose.model("control", controlSchema);
models.Menu = mongoose.model("menu", menuSchema);
models.accessGroup = mongoose.model("accessGroup", accessGroupSchema);
models.simple = mongoose.model("simple", simpleSchema);
models.company = mongoose.model("Company", companySchema);

module.exports = models;