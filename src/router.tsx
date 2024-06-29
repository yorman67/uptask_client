import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import CreateprojectView from './views/projects/CreateprojectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccount'
 import NewCodeView from './views/auth/NewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import ProjectTeamView from './views/projects/ProjectTeamView'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileLayout from './layouts/ProfileLayout'
import NotFound from './views/404/NotFound'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />} >
                    <Route path="/" element={<DashboardView />} index/>
                    <Route path="/projects/create" element={<CreateprojectView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                    <Route path="/projects/:projectId/details" element={<ProjectDetailsView />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamView />} />
                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout/>} >
                    <Route path="auth/login" element={<LoginView />} />
                    <Route path="auth/register" element={<RegisterView />} />
                    <Route path="auth/confirm-account" element={<ConfirmAccountView />} />
                    <Route path="auth/new-code" element={<NewCodeView />} />
                    <Route path="auth/forgot-password" element={<ForgotPasswordView />} />
                    <Route path="auth/new-password" element={<NewPasswordView />} />
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="/404" element={<NotFound />} />
                   
                </Route>
            </Routes>
        </BrowserRouter>
    )
}