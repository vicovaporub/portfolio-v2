import { UserService } from "../services/userService";

export const getUserData = async () => {

    const userData = await UserService.getUserData();

    return userData[0];
}