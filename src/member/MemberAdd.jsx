import React, { useEffect, useState } from "react"
import axios from "axios";
import "./MemberAdd.css"

const MemberAdd = () => {

    const componentDidMount = () => {
        const style = document.createElement("link");

        style.href = "vendor/datatables/dataTables.bootstrap4.min.css";
        style.rel = "stylesheet";
        style.async = true;

        document.head.appendChild(style);

        const scriptDataTablesDemo = document.createElement("script");

        scriptDataTablesDemo.src = "js/demo/datatables-demo.js";
        scriptDataTablesDemo.async = true;

        document.body.appendChild(scriptDataTablesDemo);
    }

    const backOnClick = () => {
        window.location = "/member";
    }

    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState("");
    const [positions, setPositions] = useState([]); // Data posisi
    const [selectedPosition, setSelectedPosition] = useState("");
    const [reportToList, setReportToList] = useState([]); // Data reportTo
    const [picture, setPicture] = useState("");

    // Fetch organisasi
    useEffect(() => {
        axios.get("http://localhost:9000/api/v1/test/org")
            .then((response) => {
                setOrganizations(response.data);
                if (response.data.length > 0) {
                    setSelectedOrganization(response.data[0].code); // Set default organisasi
                }
            })
            .catch((error) => {
                console.error("Error fetching organizations:", error);
            });
    }, []);

    // Fetch posisi berdasarkan organisasi
    useEffect(() => {
        if (selectedOrganization) {
            axios.get("http://localhost:9000/api/v1/test/pos/" + selectedOrganization)
                .then((response) => {
                    setPositions(response.data);
                    if (response.data.length > 0) {
                        console.log("mau: " + response.data[0].code);
                        setSelectedPosition(response.data[0].code); // Set default posisi
                        callReportTo(response.data[0].code);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching positions:", error);
                });
        }
    }, [selectedOrganization]);

    // Fungsi untuk memanggil API reportTo
    const handlePositionChange = (e) => {
        const selectedPositionCode = e.target.value;
        setSelectedPosition(selectedPositionCode);
        callReportTo(selectedPositionCode);
    };

    const callReportTo = (val) => {
        // Memanggil API reportTo setelah posisi dipilih
        axios.get("http://localhost:9000/api/v1/test/member/reportTo/" + val)
            .then((response) => {
                // Menyimpan hasil API dalam state reportToList
                setReportToList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching reportTo:", error);
            });
    }

    const handleOrganizationChange = (e) => {
        setSelectedOrganization(e.target.value);
    };

    const [statusMessage, setStatusMessage] = useState(""); // Menyimpan pesan status
    const [isError, setIsError] = useState(false); // Menyimpan status error

    const handleSubmit = (event) => {
        event.preventDefault();  // Mencegah refresh halaman saat submit

        const formData = {
            name: document.getElementById("inputName").value,  // Ambil nilai nama dari input
            picture: picture,
            reportToId: document.getElementById("selectReportTo").value,  // Ambil nilai Report To
            positionCode: selectedPosition,  // Ambil nilai posisi yang terpilih
        };

        // Kirim data ke API dengan menggunakan POST
        axios.post("http://localhost:9000/api/v1/test/member", formData)
            .then((response) => {
                setStatusMessage("Member added successfully!"); // Pesan sukses
                setIsError(false); // Tidak ada error
                document.getElementById("inputName").value = "";
                document.getElementById("inputPicture").value = "";                
                document.getElementById("idPicture").remove();
                ;
            })
            .catch((error) => {
                if (error.response) {
                    // Jika ada respons error dari server
                    const errorData = JSON.stringify(error.response, null, 2);
                    console.log("sdaas: " + errorData);
                    const errorMessage = error.response.data.messages || 'Error adding member. Please try again.';
                    const errorDetail = error.response.data.detail || '';
                    setStatusMessage(errorMessage || " " || errorDetail); // Pesan error dari server
                } else if (error.request) {
                    // Jika tidak ada respons dari server
                    setStatusMessage("No response received from the server. Please try again.");
                } else {
                    // Jika ada kesalahan lainnya
                    setStatusMessage("An error occurred: " + error.message);
                }
                setIsError(true); // Ada error
            });
    };

    const [selectedPicture, setSelectedPicture] = useState(null);

    // Fungsi untuk menangani perubahan file gambar
    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        const maxFileSize = 5 * 1024 * 1024; // 5 MB dalam byte

        if (file) {
            // Validasi jenis file
            if (!file.type.startsWith("image/")) {
                setStatusMessage("Please upload only image files.");
                setIsError(true);
                setSelectedPicture(null);
                return;
            }

            // Validasi ukuran file
            if (file.size > maxFileSize) {
                setStatusMessage("File size exceeds 5 MB. Please choose a smaller file.");
                setIsError(true);
                setSelectedPicture(null);
                return;
            }

            // Panggil API untuk meng-upload file jika ukurannya melebihi 5 MB
            const formData = new FormData();
            formData.append("file", file);

            // Kirim data file gambar ke API untuk di-upload
            axios.post("http://localhost:9000/api/v1/test/member/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // Dapatkan URL atau respons lain dari server setelah upload sukses
                const pictureUrl = response.data; // Sesuaikan dengan respons dari API Anda
                setStatusMessage("File uploaded successfully!");
                setIsError(false);
                setPicture(pictureUrl);
                //setSelectedPicture(pictureUrl); // Menyimpan URL gambar yang di-upload
            })
            .catch((error) => {
                if (error.response) {
                    setStatusMessage("Failed to upload file. " + error.response.data.message);
                } else {
                    setStatusMessage("Error: " + error.message);
                }
                setIsError(true);
            });

            // Jika validasi lolos, atur URL gambar yang dipilih
            // setStatusMessage(""); // Reset pesan error
            // setIsError(false);
            setSelectedPicture(URL.createObjectURL(file));
        } else {
            // Reset jika tidak ada file yang dipilih
            setSelectedPicture(null);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <h1 className="h3 mb-1 text-gray-800">Member</h1>

                <p className="mb-4" />

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Add</h6>
                                {statusMessage && (
                                    <div className={`alert ${isError ? "alert-danger" : "alert-success"}`} role="alert">
                                        {statusMessage}
                                    </div>
                                )}
                            </div>

                            <div className="card-body">
                                <form className="row g-3">
                                    <div className="row-highlight col-sm-12 bg-gray-100">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label htmlFor="inputCode" className="col-sm-3 col-form-label margin-top-rem-1 label-bold label-mandatory">Organization</label>
                                                <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                                <select
                                                    className="col-sm-7 form-control margin-top-rem-1"
                                                    id="selectOrganization"
                                                    value={selectedOrganization}
                                                    onChange={handleOrganizationChange}
                                                >
                                                    {organizations.map((org) => (
                                                        <option key={org.code} value={org.code}>
                                                            {org.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label htmlFor="inputName" className="col-sm-3 col-form-label margin-top-rem-1 label-bold label-mandatory">Position</label>
                                                <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                                <select
                                                    className="col-sm-7 form-control margin-top-rem-1"
                                                    id="selectPosition"
                                                    value={selectedPosition}
                                                    onChange={handlePositionChange} // Menambahkan pemanggilan API saat posisi berubah
                                                >
                                                    {positions.map((position) => (
                                                        <option key={position.code} value={position.code}>
                                                            {position.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-highlight col-sm-12 bg-gray-200">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label htmlFor="inputDescription" className="col-sm-3 col-form-label margin-top-rem-1 label-bold">Report To</label>
                                                <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                                <select className="col-sm-7 form-control margin-top-rem-1" id="selectReportTo">
                                                    {reportToList.length > 0 ? (
                                                        reportToList.map((reportTo) => (
                                                            <option key={reportTo.id} value={reportTo.id}>
                                                                {reportTo.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option value="">Select Report To</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label htmlFor="inputAlternateDescription" className="col-sm-3 col-form-label margin-top-rem-1 label-bold">Name</label>
                                                <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                                <input type="text" className="col-sm-7 form-control margin-top-rem-1" id="inputName" placeholder="Name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-highlight col-sm-12">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label htmlFor="inputDescription" className="col-sm-3 col-form-label margin-top-rem-1 label-bold">Upload Picture</label>
                                                <label className="col-sm-1 col-form-label margin-top-rem-1">:</label>
                                                <input type="file" className="col-sm-7 form-control margin-top-rem-1" id="inputPicture" placeholder="Upload Picture"
                                                    onChange={handlePictureChange}

                                                />
                                                <div className="col-sm-6" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                {selectedPicture && (
                                                    <img
                                                        src={selectedPicture}
                                                        alt="Preview"
                                                        className="img-thumbnail"
                                                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                                                        id="idPicture"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-highlight col-sm-12">
                                        <div className="col-md-11">
                                            <button type="submit" className="btn btn-primary float-right margin-top-rem-1 btn-min-width" id="addAction" onClick={handleSubmit}>Add</button>
                                        </div>

                                        <div className="col-md-1">
                                            <button type="button" className="btn btn-primary float-right margin-top-rem-1 btn-min-width" onClick={backOnClick}>Back</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MemberAdd

