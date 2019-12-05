const mongoose = require('mongoose')

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
})