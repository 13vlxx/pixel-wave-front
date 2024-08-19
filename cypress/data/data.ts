import dayjs from "dayjs";

export class CypressData {
  constructor() {}

  static email = "test@gmail.com";
  static password = "Test1234**";

  static new_pseudo = dayjs().unix().toString();
  static new_email = `${this.new_pseudo}@gmail.com`;
  static new_password = "NewPassword1234**";
}
