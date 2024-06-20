import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import CreateprojectView from './views/projects/CreateprojectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectDetailsView from './views/projects/ProjectDetailsView'


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />} >
                    <Route path="/" element={<DashboardView />} index/>
                    <Route path="/projects/create" element={<CreateprojectView />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
                    <Route path="/projects/:projectId/details" element={<ProjectDetailsView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}