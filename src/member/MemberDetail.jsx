import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MemberDetail.css";

const MemberDetail = () => {
  const { id } = useParams(); // Mengambil :id dari URL
  const [member, setMember] = useState(null);
  const [position, setPosition] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [reportToName, setReportToName] = useState("N/A"); // Untuk menyimpan nama Report To
  const [loading, setLoading] = useState(true); // Status loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Ambil data member berdasarkan ID
        const memberResponse = await axios.get(
          `http://localhost:9000/api/v1/test/member/findById/${id}`
        );
        const memberData = memberResponse.data;
        setMember(memberData);

        // 2. Ambil data posisi berdasarkan positionCode
        const positionResponse = await axios.get(
          `http://localhost:9000/api/v1/test/pos/findById/${memberData.positionCode}`
        );
        setPosition(positionResponse.data);
        const positionData = positionResponse.data;

        // 3. Ambil data organisasi berdasarkan organizationCode
        const organizationResponse = await axios.get(
          `http://localhost:9000/api/v1/test/org/${positionData.organizationCode}`
        );
        setOrganization(organizationResponse.data);

        // 4. Ambil nama dari reportToId jika ada
        if (memberData.reportToId) {
          const reportToResponse = await axios.get(
            `http://localhost:9000/api/v1/test/member/findById/${memberData.reportToId}`
          );
          setReportToName(reportToResponse.data.name || "N/A");
        }

        setLoading(false); // Selesai loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Tetap hentikan loading meskipun ada error
      }
    };

    fetchData();
  }, [id]);

  const backOnClick = () => {
    window.location = "/member"; // Navigasi ke halaman member
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
        <div className="container-fluid">
            <h1 className="h3 mb-1 text-gray-800">Member</h1>
            <p className="mb-4" />

            <div className="row">
                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Information</h6>
                    </div>

                    <div className="card-body">
                        <form className="row g-3">
                            <div className="row-highlight col-sm-12 bg-gray-100">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label
                                            htmlFor="inputCode"
                                            className="col-sm-3 col-form-label margin-top-rem-1 label-bold"
                                        >
                                            Organization
                                        </label>
                                        <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                        <label className="col-sm-7 col-form-label margin-top-rem-1 label-bold">
                                        {organization ? organization.name : "N/A"}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label
                                            htmlFor="inputName"
                                            className="col-sm-3 col-form-label margin-top-rem-1 label-bold"
                                        >
                                        Position
                                        </label>
                                        <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                        <label className="col-sm-7 col-form-label margin-top-rem-1 label-bold">
                                            {position ? position.name : "N/A"}
                                        </label>
                                    </div>
                                </div>
                            </div>

                  <div className="row-highlight col-sm-12 bg-gray-200">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label
                          htmlFor="inputDescription"
                          className="col-sm-3 col-form-label margin-top-rem-1 label-bold"
                        >
                          Name
                        </label>
                        <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                        <label className="col-sm-7 col-form-label margin-top-rem-1 label-bold">
                          {member ? member.name : "N/A"}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label
                          htmlFor="inputAlternateDescription"
                          className="col-sm-3 col-form-label margin-top-rem-1 label-bold"
                        >
                          Report To
                        </label>
                        <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                        <label className="col-sm-7 col-form-label margin-top-rem-1 label-bold">
                          {reportToName}
                        </label>
                      </div>
                    </div>
                  </div>

                            <div className="row-highlight col-sm-12 bg-gray-100">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label
                                            htmlFor="inputCode"
                                            className="col-sm-3 col-form-label margin-top-rem-1 label-bold"
                                        >
                                            Picture
                                        </label>
                                        <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                        <label className="col-sm-7 col-form-label margin-top-rem-1 label-bold">                                            
                                        {member && member.picture && member.picture.trim() !== "" ? (
          <img src={member.picture} alt="Member" style={{ maxWidth: "100px", height: "auto" }} />
        ) : (
          "N/A"
        )}
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    
                                </div>
                            </div>

                  <div className="col-12">
                    <div className="form-group row margin-top-rem-1">
                      <div className="col-sm-11"></div>
                      <div className="col-sm-1">
                        <button
                          type="button"
                          className="btn btn-primary btn-min-width"
                          onClick={backOnClick}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDetail;
