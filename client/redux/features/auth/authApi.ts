import { apiSlice } from "../api/appSlice";
import { userRegistration } from "./authSlice";

interface RegistrationResponse {
  message: string;
  activationToken: string;
}

interface RegistrationData {}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data: any) => ({
        url: "register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "activate_user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
