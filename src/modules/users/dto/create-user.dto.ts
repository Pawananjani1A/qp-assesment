import { ROLES } from "src/common/constants/environment_constants";

export class CreateUserDto {
  public firstname: string;
  public lastname: string;
  public email: string;
  public userType: ROLES;
}
