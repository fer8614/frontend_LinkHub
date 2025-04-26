import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginViews";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkHubView from "./views/LinkHubView";
import ProfileView from "./views/ProfileView";
import HandleView from "./views/HandleView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkHubView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        <Route path="/:handle" element={<AuthLayout />} >
          <Route element={<HandleView />} index={true} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
