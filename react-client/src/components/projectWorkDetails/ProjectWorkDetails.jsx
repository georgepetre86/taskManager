import React, { useContext, useEffect, useState } from "react";
import "./projectWorkDetails.scss";
import { Add, Close } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function ProjectWorkDetails(props) {

    const { user } = useContext(AuthContext);

  const [addWorkDetailModal, setAddWorkDetailModal] = useState(false);
  const [inputWorkDetail, setInputWorkDetail] = useState({user: user.username})

  const stageArray = ["ofertare", "avans", "proiectare", "comanda materiale", "productie", "livrare", "montaj"]
  

  const handleOpenAddNewWorkDetailModal = () => {
    setAddWorkDetailModal(true);
  };

  const handleChangeStage = (e) => {
    setInputWorkDetail({...inputWorkDetail, stage: e.target.value})
  }

  const handleInputWorkDetail = (e) => {
    e.preventDefault()
    setInputWorkDetail({...inputWorkDetail, note: e.target.value})
  }

  const handleAddWorkDetailToDatabase = async () => {
    try {
        await axios.put(`/projects/addAnotherWorkDetail/${props.projectId}`, inputWorkDetail)
        setAddWorkDetailModal(false)
        setInputWorkDetail({user: user.username})
        console.log("saved")
        props.reFetch()
    } catch (err) {
        console.log(err)
    }
  }

  return (
    <div className="cardItem">
      <div className="topbarCardItem">
        <h4>Work details</h4>
        <button onClick={() => handleOpenAddNewWorkDetailModal()}>
          <Add /> Add new
        </button>
        {addWorkDetailModal && (
          <div className="addNewComment">
            <div className="topLine">
              <span>Add new comment</span>
              <Close
                style={{ fontSize: "18px", cursor: "pointer" }}
                onClick={() => {
                    setAddWorkDetailModal(false);
                    setInputWorkDetail({});
                }}
              />
            </div>
            <FormControl sx={{ m: 1, minWidth: 100, width: 'fit-content'}} size="small">
                    <InputLabel id="demo-select-small">stage</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={inputWorkDetail.stage}
                      label="stage"
                      onChange={handleChangeStage}
                    >
                        {stageArray.map((item)=>(
                            <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      
                      
                    </Select>
                    
            </FormControl>
            <input
              name="comment"
              type="text"
              value={inputWorkDetail.note}
              onChange={handleInputWorkDetail}
            />
            <button onClick={() => handleAddWorkDetailToDatabase()}>Add</button>
          </div>
        )}
      </div>
      <div className="tableWorkDetails">
        <div className="tableHead">
          <ul>
            <li style={{ width: "10%" }}>Stage</li>
            <li style={{ width: "65%" }}>Note</li>
            <li style={{ width: "10%" }}>Date</li>
            <li style={{ width: "10%" }}>Submitter</li>
          </ul>
        </div>

        <div className="tableContents">
          {Object.keys(props.dataToShow).length !== 0
            ? props.dataToShow.workDetails.map((item, index) => (
                <ul key={index}>
                  <li style={{ width: "10%" }}>{item.stage}</li>
                  <li style={{ width: "65%" }}>{item.note}</li>
                  <li style={{ width: "10%" }}>{item.date.split("T")[0]}</li>
                  <li style={{ width: "10%" }}>{item.user}</li>
                </ul>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
