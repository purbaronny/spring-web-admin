import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./Member.css"

const Member = () => {
    
    const componentDidMount = () => {
        const style = document.createElement("link");
    
        style.href = "vendor/datatables/dataTables.bootstrap4.min.css";
        style.rel = "stylesheet";
        style.async = true;
    
        document.head.appendChild(style);

        const scriptDataTablesDemo = document.createElement("script");

        scriptDataTablesDemo.src="js/demo/datatables-demo.js";
        scriptDataTablesDemo.async = true;
    
        document.body.appendChild(scriptDataTablesDemo);
    }

    const addOnClick = () => {
        window.location = "/memberAdd";
    }

    const [members, setMembers] = useState([]);
  const [searchBy, setSearchBy] = useState("CODE"); // default pencarian berdasarkan "code"
  const [searchCriteria, setSearchCriteria] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Fungsi untuk mengambil data anggota berdasarkan pencarian
  const fetchMembers = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/v1/test/member/searchBy", {
        searchBy: searchBy,
        searchCriteria: searchCriteria,
        page: page,
        size: 10
      });
      setMembers(response.data.content); // Menyimpan hasil data anggota
      setTotalPages(response.data.totalPages); // Menyimpan total halaman
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchMembers();
  }, [page, searchBy, searchCriteria]); // Menyusun ulang data saat halaman atau parameter pencarian berubah

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearch = () => {
    setPage(0); // Reset ke halaman pertama setiap kali pencarian baru
    fetchMembers();
  };

  // Fungsi untuk mengubah jenis pencarian (code atau name)
  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
  };

  // Fungsi untuk menangani perubahan pada input kriteria pencarian
  const handleSearchCriteriaChange = (event) => {
    setSearchCriteria(event.target.value);
  };

  // Fungsi untuk menangani pergantian halaman
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

    return(
        <>
            <div className="container-fluid">
                <h1 className="h3 mb-1 text-gray-800">Member</h1>

                <p className="mb-4" />                   

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Search</h6>
                            </div>

                            <div className="card-body">
                                <div className="row-highlight col-sm-12 bg-gray-100">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="inputCode" className="col-sm-4 col-form-label margin-top-rem-1 label-bold label-mandatory">Organization Search By</label>
                                            <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                            <div className="col-sm-6 margin-top-rem-1">
                                                <div className="form-check">
                                                    


                                                    <input
                      className="form-check-input"
                      type="radio"
                      name="searchBy"
                      id="searchByCode"
                      value="CODE"
                      checked={searchBy === "CODE"}
                      onChange={handleSearchByChange} />


                                                    <label className="form-check-label" htmlFor="searchByCode">
                                                        Code
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    

                                                    <input
                      className="form-check-input"
                      type="radio"
                      name="searchBy"
                      id="searchByName"
                      value="NAME"
                      checked={searchBy === "NAME"}
                      onChange={handleSearchByChange}
                    />


                                                    <label className="form-check-label" htmlFor="searchByName">
                                                        Name
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6" />
                                </div>
                                <div className="row-highlight col-sm-12 bg-gray-200">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label htmlFor="inputCode" className="col-sm-4 col-form-label margin-top-rem-1 label-bold label-mandatory">Search Criteria</label>
                                            <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                            



                                            <input
                    type="text"
                    className="col-sm-6 form-control margin-top-rem-1"
                    id="searchCriteria"
                    placeholder="Search..."
                    value={searchCriteria}
                    onChange={handleSearchCriteriaChange}
                  />


                                        </div>
                                    </div>

                                    <div className="col-md-6" />
                                </div>

                                <div className="row-highlight col-sm-12">
                                    <div className="col-md-11">
                                        <button type="button" className="btn btn-primary float-right margin-top-rem-1 btn-min-width" onClick={handleSearch}>Search</button>
                                    </div>

                                    <div className="col-md-1">
                                        <button type="button" className="btn btn-primary float-right margin-top-rem-1 btn-min-width" onClick={addOnClick}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Listing</h6>
                            </div>

                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Organization Code</th>
                                                <th>Organization Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {members.length > 0 ? (
                      members.map((member, index) => (
                        <tr key={index}>
                          <td><Link to={`/memberDetail/${member.id}`}>{member.employeeName}</Link></td>
                          <td>{member.positionName}</td>
                          <td>{member.orgCode}</td>
                          <td>{member.orgName}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center">No members found</td>
                      </tr>
                    )}                                
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
              <div className="pagination">
                {page + 1 > 1 && (
                  <button onClick={() => handlePageChange(page - 1)}>&laquo; Previous</button>
                )}
                <span>Page {page + 1} of {totalPages}</span>
                {page + 1 < totalPages && (
                  <button onClick={() => handlePageChange(page + 1)}>Next &raquo;</button>
                )}
              </div>
                            </div>
                        </div>
                    </div>                        
                </div>
            </div>
        </>
    )    
}

export default Member