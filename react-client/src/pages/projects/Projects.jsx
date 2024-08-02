import React, { useEffect, useState } from "react";
import ProjectsTopbar from "../../components/projectsTopbar/ProjectsTopbar";
import "./projects.scss";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { projectsRows } from "../../dummyData";
import useFetch from "../../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDataGridProps } from "@mui/x-data-grid/DataGrid/useDataGridProps";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function Projects({ tab }) {
  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "number", headerName: "Project", width: 120 },
    { field: "client", headerName: "Client", width: 140 },
    { field: "summary", headerName: "Summary", width: 330 },
    { field: "priority", headerName: "Priority", width: 80 },
    {
      field: "startDate",
      headerName: "Started at",
      type: "date",
      width: 100,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      type: "date",
      width: 100,
    },
    {
      field: "progress",
      headerName: "Progress",
      width: 200,
      renderCell: (params) => {
        return <progress id="projects" value={params.row.progress} max="100" />;
      },
    },
    { field: "stage", headerName: "Stage", width: 80 },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => {
        return (
          <div
            className={`projectStatus ${
              params.row.status === "ontrack"
                ? "green"
                : params.row.status === "delayed"
                ? "yellow"
                : "red"
            }`}
          >
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {" "}
            <Link to={"/projects/" + params.row._id}>
              <button className="taskListView">View</button>
            </Link>
            <DeleteIcon
              style={{ color: "#aa5042", marginLeft: "10px" }}
              onClick={() => handleDeleteProjectModal(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const { data, loading, error, reFetch } = useFetch("/api/projects");

  const [mainData, setMainData] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [newProjectCreated, setNewProjectCreated] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectNumberForDelete, setProjectNumberForDelete] = useState("");

  const handleDeleteProjectModal = async (arg) => {
    let project;
    try {
      project = await axios.get(`/projects/find/${arg}`);
    } catch (err) {
      console.log(err);
    }
    setProjectNumberForDelete(project.data.number);
    setDeleteId(arg);
    setDeleteModal(true);
  };

  const handleDeleteProject = async () => {
    try {
      const deleteElem = await axios.delete(`/projects/${deleteId}`);
    } catch (err) {
      console.log(err);
    }

    setDeleteModal(false);
    reFetch();
  };

  const dateFormat = (item) => {
    let ConvDate = new Date(item);
    return (
      ConvDate.getDate() +
      "/" +
      (parseInt(ConvDate.getMonth()) + 1) +
      "/" +
      ConvDate.getFullYear()
    );
  };

  useEffect(() => {
    data.forEach((item, i) => {
      item.id = i + 1;
      item.startDate = dateFormat(parseInt(item.startDate));
      item.deadline = dateFormat(parseInt(item.deadline));
    });

    setMainData(data);

    setOpenProjects(mainData.filter((project) => project.step === "open"));
    setCompletedProjects(
      mainData.filter((project) => project.step === "completed")
    );
  }, [data]);

  return (
    <div className="projects">
      <ProjectsTopbar tab={tab} passNewProject={setNewProjectCreated} />

      <div className="projectsWrapper">
        {deleteModal && (
          <div className="addNewProjectModal">
            <div className="modal-content">
              <div className="closeModal" onClick={() => setDeleteModal(false)}>
                <CloseIcon />
              </div>
              <div className="topModal">
                <h3 style={{ fontWeight: "400", color: "#333" }}>
                  Delete Project {projectNumberForDelete}
                </h3>
              </div>
              <div className="midModal">
                <h2>Are you sure you want to delete this project?</h2>
                <div className="deleteOptions">
                  <button className="yes" onClick={() => handleDeleteProject()}>
                    Yes
                  </button>
                  <button className="no" onClick={() => setDeleteModal(false)}>
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="projectsContent">
          <DataGrid
            rows={
              tab === "open"
                ? openProjects
                : tab === "completed"
                ? completedProjects
                : mainData
            }
            columns={columns}
            disableSelectionOnClick
            pageSize={50}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
