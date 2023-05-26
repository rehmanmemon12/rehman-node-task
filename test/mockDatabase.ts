import {IUserUpdateInputDTO} from "@/interfaces/IUser";
import {ApiError} from "@/interfaces/ApiError";

const users: any[] = [
    {
        "id": 5,
        "name": "Rehman Test Memon",
        "email": "rehmanmemon003@gmail.com",
        "role": "USER",
        "createdAt": "2023-05-26T07:28:27.571Z",
        "updatedAt": "2023-05-26T07:28:27.571Z"
    },
    {
        "id": 11,
        "name": "Carry",
        "email": "carry@gmail.com",
        "role": "USER",
        "createdAt": "2023-05-26T20:11:52.137Z",
        "updatedAt": "2023-05-26T20:11:52.137Z"
    },
    {
        "id": 3,
        "name": "Rehman Memon",
        "email": "rehmanmemon0010@gmail.com",
        "role": "USER",
        "createdAt": "2023-05-25T21:03:29.957Z",
        "updatedAt": "2023-05-26T20:56:59.345Z"
    }
];

export function getAllUsers() {
    return {"users": users};
}

export function getUserById(id: number): any {
    const user = users.find((user) => user.id === id);
    if (user) {
        return user;
    }
    throw new ApiError("User not Found");
}

export function updateUser(iUserUpdateInputDTO: any): boolean {
    const userIndex = users.findIndex((user) => user.id === iUserUpdateInputDTO.id);
    if (userIndex !== -1) {
        users[userIndex] = {...users[userIndex], ...iUserUpdateInputDTO};
        return true;
    }
    throw new ApiError("User not Found");
}
