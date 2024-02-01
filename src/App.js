import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import DefaultLayout from "./layouts/DefaultLayout";
import MoviesDetailPage from "./pages/MoviesDetailPage";
import { AuthProvider } from "./contexts/auth.context";
import MyPage from "./pages/MyPage";
import { ProfileProvider } from "./contexts/profile.context";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/movies/:movieId" element={<MoviesDetailPage />} />
          </Route>
        </Routes>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
