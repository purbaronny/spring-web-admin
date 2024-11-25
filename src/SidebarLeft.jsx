import { NavLink, useNavigate } from "react-router-dom"

const SidebarLeft = () => {

	const onSelectClick = (e) => {
		e.className = e.className + " active";
	}

	const navigate = useNavigate();

  // Fungsi Logout
  const handleLogout = () => {
    // Hapus token atau status login dari localStorage
    localStorage.removeItem("user");

    // Arahkan ke halaman login
    navigate("/login");
  };

	return (
		<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
			<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
				<div className="sidebar-brand-icon rotate-n-15">
					<i className="fas fa-laugh-wink"></i>
				</div>

				<div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
			</a>

			<hr className="sidebar-divider my-0"></hr>

			<li className="nav-item active">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Dashboard</span></a>
			</li>

			<hr className="sidebar-divider"></hr>

			<li className="nav-item">
				<a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMaintenance" aria-expanded="true" aria-controls="collapseMaintenance">
					<i className="fas fa-fw fa-wrench"></i>

					<span>Member-nya Disini</span>
				</a>

				<div id="collapseMaintenance" className="collapse" aria-labelledby="headingMaintenance" data-parent="#accordionSidebar">
					<div className="bg-white py-2 collapse-inner rounded">

						<NavLink className="collapse-item" to="/member">Member</NavLink>

						<NavLink className="collapse-item" to="/memberChart">Organization Chart</NavLink>

					</div>
				</div>
			</li>

			<hr className="sidebar-divider my-0"></hr>

			<li className="nav-item active">
			<button className="nav-link btn btn-link text-left text-white" onClick={handleLogout}>
          <i className="fas fa-fw fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
			</li>


		</ul>
	)
}

export default SidebarLeft