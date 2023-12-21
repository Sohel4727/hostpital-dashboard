import React, { useEffect, useState } from "react";
import {
  addPatientApi,
  deletePatientApi,
  getAllPatientApi,
  updatePatientApi,
} from "../../Api/Api";
import DataTable from "react-data-table-component";
import { Button, Dialog, TextField, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./LandingPage.css";
import { CSVLink } from "react-csv";
import { ToastContainer, toast } from "react-toastify";
const LandingPage = () => {
  const [allPatient, setAllPatient] = useState([]);
  const [dialogBox, setDialogBox] = useState(false);
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    phone: "",
  });
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = allPatient.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.phone && patient.phone.toString().includes(searchTerm)) ||
      (patient._id && patient._id.toString().includes(searchTerm)) ||
      patient.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getAllPatientApi()
      .then((res) => setAllPatient(res.data))
      .catch((err) => console.log("err", err));
  }, [allPatient]);

  // exports excel file here
  const headers = [
    { label: "id", key: "_id" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Phone", key: "phone" },
    { label: "City", key: "city" },
  ];

  const dialogBoxOpen = () => {
    setDialogBox(true);
    setUpdate(false);
  };
  const dialogBoxClose = () => {
    setDialogBox(false);
    setPatientData({
      firstName: "",
      lastName: "",
      city: "",
      phone: "",
    });
  };

  

  const handleOnChange = (event) => {
    setPatientData({...patientData,[event.target.name]: event.target.value});
  };

  const AddPatient = () => {
    addPatientApi(patientData)
      .then((res) => {
        if (res.status === 201) {
          setPatientData({
            firstName: "",
            lastName: "",
            city: "",
            phone: "",
          });
          setDialogBox(false);
          toast.success("Patient added successfully");
        }
      })
      .catch((err) => toast.error("Patient not added successfully"));
  };

  // delete api here
  const handleDelete = (id) => {
    deletePatientApi(id)
      .then((res) => {
        toast.success("Patient Deleted Successfully");
      })
      .catch((err) => toast.error("Patient Deleted Error"));
  };

  // update api here
  const handleEdit = (id, row) => {
    setDialogBox(true);
    setUpdate(true);
    setId(id);
    setPatientData(row);
  };
  // update api here
  const patientUpdate = () => {
    updatePatientApi(id, patientData)
      .then((res) => {
        if (res.status === 200) {
          setDialogBox(false);
          toast.success("Patient updated successfully");
          setPatientData({
            firstName: "",
            lastName: "",
            city: "",
            phone: "",
          });
        }
      })
      .catch((err) => toast.error("Error updating patient"));
  };

  const columns = [
    { name: "ID", selector: (row, index) => index + 1, sortable: true },
    { name: "First Name", selector: (row) => row.firstName },
    { name: "Last Name", selector: (row) => row.lastName },
    { name: "Phone", selector: (row) => row.phone },
    { name: "city", selector: (row) => row.city },
    // {
    //   name: "Country Flag",
    //   selector: (row) => <img src={row.flag} Height={50} width={50} />,
    // },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <EditIcon
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => handleEdit(row._id, row)}
          />
          <DeleteIcon
            size="small"
            color="error"
            variant="contained"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  // download csv file here
  const handleCSVDownload = () => {
    setTimeout(() => {
      toast.success("CSV file export successfully!");
    }, 5000); // Adjust the timeout duration as needed
  };

  return (
    <>
      <ToastContainer />
      <Dialog open={dialogBox} close={dialogBox}>
        <div className="dialog_container">
          <div className="close_container">
            <CancelIcon
              className="close_icon"
              onClick={dialogBoxClose}
            />
            <h2>Add Patient here </h2>

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="First Name"
              variant="outlined"
              size="small"
              type="text"
              name="firstName"
              value={patientData.firstName}
              onChange={handleOnChange}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Last Name"
              variant="outlined"
              size="small"
              type="text"
              name="lastName"
              value={patientData.lastName}
              onChange={handleOnChange}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Phone"
              variant="outlined"
              size="small"
              type="number"
              name="phone"
              value={patientData.phone}
              onChange={handleOnChange}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="City"
              variant="outlined"
              size="small"
              type="text"
              name="city"
              value={patientData.city}
              onChange={handleOnChange}
            />
            <div className="add_button_container">
              {!update ? (
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  className="add_button"
                  onClick={AddPatient}
                >
                  +ADD
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  className="add_button"
                  onClick={patientUpdate}
                >
                  Update
                </Button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
      <DataTable
        columns={columns}
        data={filteredPatients.reverse()}
        title={
          <Typography variant="h3" className="custom-title">
            Patient List
          </Typography>
        }
        pagination
        fixedHeader
        fixedHeaderScrollHeight="350px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              size="small"
              color="success"
              variant="contained"
              onClick={dialogBoxOpen}
            >
              Add
            </Button>
            <CSVLink
              data={filteredPatients}
              headers={headers}
              filename={"data.csv"}
              onClick={handleCSVDownload}
            >
              <Button size="small" variant="contained">
                Export
              </Button>
            </CSVLink>
          </div>
        }
        subHeader
        subHeaderComponent={
          <TextField
            size="small"
            type="text"
            placeholder="search patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        }
        subHeaderAlign="left"
      />
    </>
  );
};

export default LandingPage;
