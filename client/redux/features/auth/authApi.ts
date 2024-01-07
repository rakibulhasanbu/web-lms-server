import { apiSlice } from "../api/appSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

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

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "social_auth",
        method: "POST",
        body: { name, email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(_arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;
