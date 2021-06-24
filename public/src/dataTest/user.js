
const User = (id,  address, email, hotline, storeManager, stt) => {
    return { id,  address, email, hotline, storeManager, stt };
};

export const users = [
    User(1, 'Quận 1 - TP HCM', 'thecfhouse@gmail.com','03311225544',  'Nguyen Van A','active' ),
    User(2, 'Quận 1 - TP HCM', 'thecfhouse@gmail.com','03311225544',  'Nguyen Van A','active' ),
    User(3, 'Quận 1 - TP HCM', 'thecfhouse@gmail.com','03311225544',  'Nguyen Van A','active' ),
    User(4, 'Quận 1 - TP HCM', 'thecfhouse@gmail.com','03311225544',  'Nguyen Van A','active' ),
];