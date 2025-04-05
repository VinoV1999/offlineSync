import axios from "axios";

export type UserDetailsType = {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
}

export type UserDetailsTypeResponse = {id: number} & UserDetailsType 
export const saveUserDetails = async (data: UserDetailsType): Promise<UserDetailsTypeResponse | {error: string}> => {
    try {
      const response = await axios.post('http://localhost:8080/api/users', data);
      return response.data as UserDetailsTypeResponse;
    } catch (error: any) {
      if(error.response?.data?.error) {
        return {error: error.response?.data?.error as string || error.message};
      }
      return {error: 'An error occurred while saving user details.'};
    }
};
  