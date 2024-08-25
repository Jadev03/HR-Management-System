
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
}from "react-router-dom";
import Configure from "./components/configure/UpdateDepartment";
import Append from "./components/append/AddJob";
import Department from './components/modules/Department';
import Adddept from './components/append/Add_dept';
import Addemployee from './components/append/Add_employee';
import Login from './components/modules/Login';
import AdminDashboard from './components/dashborads/AdminDashboard'
import Level1Dashboard from './components/dashborads/Level1Dashboard'
import SupervisorDashboard from './components/dashborads/SupervisorDashboard';
import HRDashboard from './components/dashborads/HRDashboard';
import SecMngUserDashboard from './components/dashborads/SecMngUserDashboard';
import ManagerialEmployeeDashboard from './components/dashborads/ManagerialEmployeeDashboard';
import Employee from './components/modules/Employee';
import Branch from './components/modules/Branch';
import Job from './components/modules/JobTitle';
import LeaveBal from './components/modules/LeaveBalance';
import UpdateLeaveBal from './components/configure/UpdateLeaveBal';
import Paygrade from './components/modules/Paygrade';
import UpdatePaygrade from './components/configure/UpdatePaygrade';
import LeaveRequest from './components/modules/LeaveRequests';
import EmergencyCont from './components/modules/EmergencyCont';
import UpdateEmergencyCont from './components/configure/UpdateEmergCont';
import DependantInfo from './components/modules/DependantInfo';
import AddDependent from './components/append/AddDependent';
import UpdateEmployee from './components/configure/UpdateEmployee';
import Departmenthr from './components/modules/Departmenthr';
import LeaveBalancehr from './components/modules/LeaveBalancehr';
import Report from './components/modules/ReportbyDept';
import Report1 from './components/modules/ReportbyLeave';
import Report2 from './components/modules/ReportbyPaygrade';
import Report3 from './components/modules/ReportbyTitle';
import Report4 from './components/modules/ReportCustom';
import SecMngUserCreate from './components/append/Add_secmng';
import HRUserCreate from './components/append/Add_hr';
import Subordinate from './components/modules/Subordinates';
import ReqLeave from './components/modules/RequestLeave';
import PersonalDetails from './components/modules/PersonalDetails';
import RALeave from './components/modules/RALeaves';
import ActionTake from './components/configure/ActionTake';
import AddNewUser from './components/append/NewUserCreate';
import AddCustomField from './components/append/Add_custom_atttribute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/level1" element={<Level1Dashboard/>}/>
          <Route path="/supervisor" element={<SupervisorDashboard/>}/>
          <Route path="/hr" element={<HRDashboard/>}/>
          <Route path="/secmanager" element={<SecMngUserDashboard/>}/>
          <Route path="/manager" element={<ManagerialEmployeeDashboard/>}/>
          <Route path="/configure/:Dept_ID" element={<Configure/>}/>
          <Route path="/append" element={<Append/>}/>
          <Route path="/department" element={<Department/>}/>
          <Route path="/add_dept" element={<Adddept/>}/>
          <Route path="/employee" element={<Employee/>}/>
          <Route path="/add_employee" element={<Addemployee/>}/>
          <Route path="/branch" element={<Branch/>}/>
          <Route path="/job" element={<Job/>}/>
          <Route path="/leave_bal" element={<LeaveBal/>}/>
          <Route path="/update_leave_bal/:Employee_ID" element={<UpdateLeaveBal/>}/>
          <Route path="/paygrade" element={<Paygrade/>}/>
          <Route path="/update_paygrade/:Paygrade_ID" element={<UpdatePaygrade/>}/>
          <Route path="/leave_request" element={<LeaveRequest/>}/>
          <Route path="/emergency_cont" element={<EmergencyCont/>}/>
          <Route path="/update_emergency_cont/:Emerg_Contact_ID" element={<UpdateEmergencyCont/>}/>
          <Route path="/dependant_info" element={<DependantInfo/>}/>
          <Route path="/add_dependent" element={<AddDependent/>}/>
          <Route path="/update_employee/:Employee_ID" element={<UpdateEmployee/>}/>
          <Route path="/departmenthr" element={<Departmenthr/>}/>
          <Route path="/leavebalancehr" element={<LeaveBalancehr/>}/>
          <Route path="/report" element={<Report/>}/>
          <Route path="/report1" element={<Report1/>}/>
          <Route path="/report2" element={<Report2/>}/>
          <Route path="/report3" element={<Report3/>}/>
          <Route path="/report4" element={<Report4/>}/>
          <Route path="/add_secmng" element={<SecMngUserCreate/>}/>
          <Route path="/add_hr" element={<HRUserCreate/>}/>
          <Route path="/subordinate" element={<Subordinate/>}/>
          <Route path="/request_leave" element={<ReqLeave/>}/>
          <Route path= "/personal-details/:employeeId" element={<PersonalDetails/>}/>
          <Route path= "/request-leave/:employeeId" element={<RALeave/>}/>
          <Route path= "/action-take/:Employee_ID" element={<ActionTake/>}/>
          <Route path= "/add-new-user" element={<AddNewUser/>}/>
          <Route path="/add-custom-field" element={<AddCustomField/>}/>

        </Routes> 
      </BrowserRouter>  
      
    </div>
  );
}

export default App;
