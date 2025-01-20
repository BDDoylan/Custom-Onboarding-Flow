interface UserState {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}
