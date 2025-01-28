// Server
const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();

app.use(express.json()); // Các request & response đều ở dạng JSON để tiện thao tác

// Cấu hình port cụ thể (randomly)
const port = 7000;
app.listen(port, () => {
    console.log(`App run on port ${port}.`)
})

// http://localhost:7000/
// Khi truy cập vào đường dẫn trên thì sẽ chạy vào hàm dưới đây
// Có 2 tham số mặc định là request và response
app.get("/", async (req, res) => {
    res.send("Hello world!"); // Gửi về trình duyệt
})

const sequelize = new Sequelize("duler", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

// Tạo model
const Task = sequelize.define("Task", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING
    }
});

const createTask = async (name, status) => {
    // C1:
    const newTask1 = Task.build({
        name, status
    });

    await newTask1.save();

    // C2:
    const newTask2 = await Task.create({
        name, status
    })
}

// createTask("Học PHP", "New");

const getAllTask = async () => {
    const taskList = await Task.findAll();
    console.log(JSON.stringify(taskList, null, 2));
}

// getAllTask();

const getTaskById = async (id) => {
    const task = await Task.findOne({
        where: {
            id
        }
    });

    console.log(JSON.stringify(task, null, 2));
}

getTaskById(2);

// Đồng bộ model
const syncModel = async () => {
    await Task.sync({ force: true }); // Xóa bảng cũ và tạo bảng mới
    // Task.sync({ alter: true }); // Sửa bảng

    console.log("Sync task model successfully");
}

// syncModel();

const checkConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected');
    }
    catch (error) {
        console.log('Connected failed');
        console.log(error);
    }
}

checkConnect();