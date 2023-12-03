import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./activities.scss";
import { activities } from "../../dummyData";
import { DataGrid } from "@mui/x-data-grid";
import {
  CheckCircleOutline,
  Comment,
  AttachFile,
  CleaningServices,
  Delete,
  Edit,
  Close,
} from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../context/AuthContext";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ActivityModal from "../activityModal/activityModal";

export default function Activities() {
  // Manage appearence of the data table
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "summary",
      headerName: "Summary",
      width: 760,
      renderCell: (params) => {
        return <div className="activitySummary">{params.row.summary}</div>;
      },
    },
    {
      field: "asignee",
      headerName: "Asignee",
      width: 130,
      renderCell: (params) => {
        return <div>{params.row.asignee}</div>;
      },
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 90,
      renderCell: (params) => {
        return (
          <div
            className={`activityPriority ${
              params.row.priority === "high"
                ? "red"
                : params.row.priority === "medium"
                ? "yellow"
                : "green"
            }`}
          >
            {params.row.priority}
          </div>
        );
      },
    },
    {
      field: "stage",
      headerName: "Stage",
      width: 130,
      renderCell: (params) => {
        return (
          <div
            className={`activityStage ${
              params.row.stage === "completed"
                ? "green"
                : params.row.stage === "assigned"
                ? "gray"
                : params.row.stage === "in progress"
                ? "yellow"
                : "gray"
            }`}
          >
            {params.row.stage}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <button className="activityListView">View</button>
            {/* <CheckCircleOutline className='activityListDone' /> */}
          </>
        );
      },
    },
    {
      field: "extra",
      headerName: "Extra",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            {params.row.comment.length !== 0 ? <><Comment />{params.row.comment.length}</> : ""}
            {params.row.parent.length !== 0  ? <><SupervisorAccountIcon />{params.row.parent.length}</> : ""}
            {params.row.attach.length !== 0 ? <AttachFile /> : ""}
          </>
        );
      },
    },
  ];

  //fetches all the activities from the database
  const { data, loading, error, reFetch } = useFetch("/activities");
  const { user } = useContext(AuthContext);

  // Manage useStates

  const [activityModal, setActivityModal] = useState(false);
  const [addNewModal, setAddNewModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [inputActivity, setInputActivity] = useState({});
  const [currentId, setCurrentId] = useState("");
  const [currentAsignee, setCurrentAsignee] = useState("all");
  const [dataToShow, setDataToShow] = useState({});
  const [currentPriority, setCurrentPriority] = useState("all");
  const [currentStage, setCurrentStage] = useState("all");
  const [editSummaryModal, setEditSummaryModal] = useState(false);
  const [inputEditSummary, setInputEditSummary] = useState({});
  const [completedChecked, setCompletedChecked] = useState(false);
  const [mainData, setMainData] = useState({});
  const [middleStage, setMiddleStage] = useState({})
  

  //maps a frontend id to each row from the database and checks if the remove completed button is active
  useEffect(() => {
    data.forEach((item, i) => {
      item.id = i + 1;
    });

    if (completedChecked) {
      const findIndexWhereCompleted = (arrayObjects) => {
        const arrayOfIndex = [];
        arrayObjects.forEach((item, i) => {
          if (item.stage === "completed") {
            arrayOfIndex.push(i);
          }
        });

        return arrayOfIndex;
      };

      //if the remove completed checkbox is active the data is being filtered
      const newData = data.filter((item) => item.stage !== "completed");
      setMainData(newData);
      console.log(newData);
    } else {
      setMainData(data);
    }
  }, [data, completedChecked]);

  useEffect(() => {
    setDataToShow(mainData);
  }, [mainData]);

  //What happens when the user clicks on one activity in the data table
  const handleViewActivity = async (id) => {
    const rowObject = dataToShow.filter((item) => item.id === id)
    
    const getRow = await axios.get(`/activities/find/${rowObject[0]._id}`)
    setCurrentId(getRow.data._id);
    setActivityModal(true);
    setMiddleStage(getRow.data);
    
  };

  useEffect(() => {
    setRowData(middleStage)
  },[middleStage])

  console.log(rowData)

  //actions done when the remove complete checkbox is active
  const handleCompletedChecked = () => {
    setCompletedChecked(!completedChecked);
    setCurrentAsignee("all");
    setCurrentPriority("all");
    setCurrentStage("all");
  };

  


  // What happens when the user closes the View activity Modal
  const handleCloseActivityModal = () => {
    setActivityModal(false);
    reFetch()
    // setCurrentAsignee("all")
    // setCurrentPriority("all")
    // setCurrentStage("all")
  };

  // Open modal for adding new activity
  const handleAddNewActivity = () => {
    setAddNewModal(true);
  };

  

  // Manage the input of data in the add new activity modal
  const handleInput = (e) => {
    setInputActivity({ ...inputActivity, [e.target.name]: e.target.value });
  };

  // Add asignee to the inputActivity object
  const handleAsignee = (e) => {
    setInputActivity({ ...inputActivity, asignee: e.target.value });
  };

  //Handle ADD new activity to database
  const handleAddNewActivityToDatabase = async () => {
    const activity = { ...inputActivity, comment: [], attach: [] };
    try {
      const savedActivity = await axios.post(`/activities`, activity);
      setRowData(savedActivity.data);
    } catch (err) {
      console.log(err);
    }
    setInputActivity({});
    setAddNewModal(false);
    reFetch();
  };

  // Add priority to the inputActivity object
  const handlePriority = (e) => {
    setInputActivity({ ...inputActivity, priority: e.target.value });
  };

  // Add stage to the inputActivity object
  const handleStage = (e) => {
    setInputActivity({ ...inputActivity, stage: e.target.value });
  };

  //handle open edit summary modal
  const handleOpenEditSummaryModal = () => {
    setEditSummaryModal(!editSummaryModal); // open the modal
    setInputEditSummary({ summary: rowData.summary }); // initialize the input with current summary value
  };

  //handle edit summary

  const handleEditSummaryModal = (e) => {
    setInputEditSummary({
      ...inputEditSummary,
      [e.target.name]: e.target.value,
    });
  };

  //handle UPDATE summary
  const handleUpdateSummary = async () => {
    const saveData = { summary: inputEditSummary.summary };

    try {
      await axios.put(`/activities/${currentId}`, saveData);
      const newRow = await axios.get(`/activities/find/${currentId}`);
      setRowData(newRow.data);
      setEditSummaryModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle filters in the main page
  const handleFilterAsignee = (e) => {
    setCurrentAsignee(e.target.value);
  };

  const handleFilterPriority = (e) => {
    setCurrentPriority(e.target.value);
  };

  const handleFilterStage = (e) => {
    setCurrentStage(e.target.value);
  };

 

  //Handle row selection in DataGrid
  const handleRowsSelection = (ids) => {
    const selectedRowsData = ids.map((id) =>
      dataToShow.find((row) => row.id === id)
    );
  };

  //filter based on asignee, priority and stage
  useEffect(() => {
    if (
      currentAsignee === "all" &&
      currentPriority === "all" &&
      currentStage === "all"
    ) {
      setDataToShow(mainData);
    }

    if (
      currentAsignee === "all" &&
      currentPriority !== "all" &&
      currentStage === "all"
    ) {
      setDataToShow(
        mainData.filter((item) => item.priority === currentPriority)
      );
    }

    if (
      currentAsignee === "all" &&
      currentPriority === "all" &&
      currentStage !== "all"
    ) {
      setDataToShow(mainData.filter((item) => item.stage === currentStage));
    }

    if (
      currentAsignee !== "all" &&
      currentPriority === "all" &&
      currentStage === "all"
    ) {
      setDataToShow(mainData.filter((item) => item.asignee === currentAsignee));
    }

    if (
      currentAsignee !== "all" &&
      currentPriority !== "all" &&
      currentStage === "all"
    ) {
      const asigneeList = mainData.filter(
        (item) => item.asignee === currentAsignee
      );
      setDataToShow(
        asigneeList.filter((item) => item.priority === currentPriority)
      );
    }

    if (
      currentAsignee !== "all" &&
      currentPriority === "all" &&
      currentStage !== "all"
    ) {
      const asigneeList = mainData.filter(
        (item) => item.asignee === currentAsignee
      );
      setDataToShow(asigneeList.filter((item) => item.stage === currentStage));
    }

    if (
      currentAsignee === "all" &&
      currentPriority !== "all" &&
      currentStage !== "all"
    ) {
      const stageList = mainData.filter((item) => item.stage === currentStage);
      setDataToShow(
        stageList.filter((item) => item.priority === currentPriority)
      );
    }

    if (
      currentAsignee !== "all" &&
      currentPriority !== "all" &&
      currentStage !== "all"
    ) {
      const stageList = mainData.filter((item) => item.stage === currentStage);
      const priorityList = stageList.filter(
        (item) => item.priority === currentPriority
      );
      setDataToShow(
        priorityList.filter((item) => item.asignee === currentAsignee)
      );
    }
  }, [currentAsignee, currentPriority, currentStage, completedChecked, dataToShow]);

  //show the date in a readable format. Must pass an int
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

  return (
    <div className="activities">
      {/* Top Buttons */}
      <div className="topButtons">
        <div className="addNewButton" onClick={() => handleAddNewActivity()}>
          Add New
        </div>

        {/* Filter buttons on main page */}
        <div className="filterByName">
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="demo-select-small">asignee</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={currentAsignee}
              label="priority"
              onChange={handleFilterAsignee}
            >
              <MenuItem value={"all"}>all</MenuItem>
              <MenuItem value={"unassigned"}>unassigned</MenuItem>
              <MenuItem value={"george"}>george</MenuItem>
              <MenuItem value={"mihai"}>mihai</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="demo-select-small">priority</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={currentPriority}
              label="priority"
              onChange={handleFilterPriority}
            >
              <MenuItem value={"all"}>all</MenuItem>
              <MenuItem value={"low"}>low</MenuItem>
              <MenuItem value={"medium"}>medium</MenuItem>
              <MenuItem value={"high"}>high</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="demo-select-small">stage</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={currentStage}
              label="priority"
              onChange={handleFilterStage}
            >
              <MenuItem value={"all"}>all</MenuItem>
              <MenuItem value={"raised"}>raised</MenuItem>
              <MenuItem value={"in progress"}>in progress</MenuItem>
              <MenuItem value={"completed"}>completed</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="completedCheckbox">
          <Checkbox
            checked={completedChecked}
            onClick={() => handleCompletedChecked()}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
          />
          Remove completed
        </div>
      </div>

      {/* Data Grid view for the activities on the main page */}
      <div className="activitiesWrapper">
        <DataGrid
          rows={dataToShow}
          columns={columns}
          disableSelectionOnClick
          onRowClick={(rows) => {
            handleViewActivity(rows.id);
          }}
          pageSize={50}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => handleRowsSelection(ids)}
        />
      </div>

      {/*View activity modal */}
      {activityModal && (
        <div className="activityModal">
          <div className="modal-content">
            <div
              className="closeModal"
              onClick={() => handleCloseActivityModal()}
            >
              <CloseIcon />
            </div>

            <ActivityModal activityId={currentId}/> 

           
            <div className="botModal">
              {/* <div className='saveBtn'>Save</div> */}
            </div>
          </div>
        </div>
      )}

      {/*  Add new activity Modal  */}
      {addNewModal && (
        <div className="addNewModal">
          <div className="modal-content">
            <div className="closeModal" onClick={() => setAddNewModal(false)}>
              <CloseIcon />
            </div>

            <div className="topModal">
              <div className="modalSummary">
                <h3>Add new activity</h3>
                <span>Summary</span>
                <input
                  name="summary"
                  type="text"
                  value={inputActivity.summary}
                  onChange={handleInput}
                />
              </div>

              <div className="topLeftModal">
                <div className="modalAsignee">
                  <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <InputLabel id="demo-select-small">asignee</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={inputActivity.asignee}
                      label="Asignee"
                      onChange={handleAsignee}
                    >
                      <MenuItem value={"unassigned"}>unassigned</MenuItem>
                      <MenuItem value={"george"}>george</MenuItem>
                      <MenuItem value={"mihai"}>mihai</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  className={`modalPriority ${
                    inputActivity.priority === "high"
                      ? "red"
                      : inputActivity.priority === "medium"
                      ? "yellow"
                      : "green"
                  }`}
                >
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">priority</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={inputActivity.priority}
                      label="priority"
                      onChange={handlePriority}
                    >
                      <MenuItem value={"low"}>low</MenuItem>
                      <MenuItem value={"medium"}>medium</MenuItem>
                      <MenuItem value={"high"}>high</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div
                  className={`modalStage ${
                    inputActivity.stage === "completed"
                      ? "green"
                      : inputActivity.stage === "raised"
                      ? "gray"
                      : inputActivity.stage === "in progress"
                      ? "yellow"
                      : "gray"
                  }`}
                >
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">stage</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={inputActivity.stage}
                      label="stage"
                      onChange={handleStage}
                    >
                      <MenuItem value={"raised"}>raised</MenuItem>
                      <MenuItem value={"in progress"}>in progress</MenuItem>
                      <MenuItem value={"completed"}>completed</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>

            {/* <div className='midModal'>
                   
                    <div className='commentSectionModal'>
                      <div className='topCommentSection'>
                        <span>Comments</span>
                        <button><AddIcon />Add New</button>
                      </div>
                      <div className='allCommentsSection'>
                          
                      </div>
                        
                    </div>
                    <div className='attachSectionModal'>
                    <div className='topAttachSection'>
                        <span>Attachments</span>
                        <button><AddIcon />Add New</button>
                      </div>
                    </div>
                </div> */}
            <div className="botModal">
              <div
                className="saveBtn"
                onClick={() => handleAddNewActivityToDatabase()}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
