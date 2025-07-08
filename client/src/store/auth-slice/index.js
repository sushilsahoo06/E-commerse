import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// const initialState = {
//   isAuthenticated: false,
//   isLoading: true,
//   user: null,
// };

// // Register
// export const registerUser = createAsyncThunk("auth/register", async (formData) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/auth/register",
//     formData,
//     { withCredentials: true }
//   );
//   return response.data;
// });

// // Login
// export const loginUser = createAsyncThunk("auth/login", async (formData) => {
//   const response = await axios.post(
//     "http://localhost:5000/api/auth/login",
//     formData,
//     { withCredentials: true }
//   );
//   return response.data;
// });

// // Check Auth
// export const checkAuth = createAsyncThunk("auth/check-auth", async () => {
//   const response = await axios.get(
//     "http://localhost:5000/api/auth/check-auth",
//     {
//       withCredentials: true,
//       headers: {
//         "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
//         Expires: "0",
//       },
//     }
//   );
//   return response.data;
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = !!action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user || null;
//         state.isAuthenticated = false; // Only true if token is sent after register
//       })
//       .addCase(registerUser.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })

//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user || null;
//         state.isAuthenticated = !!action.payload.success;
//       })
//       .addCase(loginUser.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })

//       // Check Auth
//       .addCase(checkAuth.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.user || null;
//         state.isAuthenticated = !!action.payload.success;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;


const getBaseURL=()=>{
  const hostname=window.location.hostname;
  if(hostname === 'localhost'){
    return "http://localhost:5000/api";
  }
  return "http://10.122.231.151:5000/api";
  
}
const api=axios.create({
  baseURL:getBaseURL(),
  withCredentials:true,
})

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Register
export const registerUser = createAsyncThunk("auth/register", async (formData) => {
  const response = await api.post("/auth/register", formData);
  return response.data;
});

// Login
export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const response = await api.post("/auth/login", formData);
  return response.data;
});

// Check Auth
export const checkAuth = createAsyncThunk("auth/check-auth", async () => {
  const response = await api.get("/auth/check-auth", {
    headers: {
      "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
      Expires: "0",
    },
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = false; // Only true if token is sent after register
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;