export default interface IUpdateUserDTO {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}
