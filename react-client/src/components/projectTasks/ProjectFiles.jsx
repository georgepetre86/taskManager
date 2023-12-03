import React, { useContext, useRef, useState } from "react";
import "./projectFiles.scss";
import { Add, AddPhotoAlternateOutlined, Close } from "@mui/icons-material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { tasks } from "../../dummyData";
import { useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


export default function ProjectFiles(props) {

    const { user } = useContext(AuthContext);
   

  const [addNewFileModal, setAddNewFileModal] = useState(false);
  const [inputFileDetails, setInputFileDetails] = useState({user: user.username});
  const [file, setFile] = useState("");

  const stageArray = [
    "ofertare",
    "avans",
    "proiectare",
    "comanda materiale",
    "productie",
    "livrare",
    "montaj",
  ];

  const handleInputFileDetails = (e) => {
    setInputFileDetails({ ...inputFileDetails, note: e.target.value });
  };

  const handleChangeStage = (e) => {
    setInputFileDetails({ ...inputFileDetails, stage: e.target.value });
  };

  const basicUpload = async (params) => {
    const baseUrl  = "https://api.bytescale.com";
  const path     = `/v2/accounts/${params.accountId}/uploads/binary`;
  const entries  = obj => Object.entries(obj).filter(([,val]) => (val ?? null) !== null);
  const query    = entries(params.querystring ?? {})
                     .flatMap(([k,v]) => Array.isArray(v) ? v.map(v2 => [k,v2]) : [[k,v]])
                     .map(kv => kv.join("=")).join("&");
  const response = await fetch(`${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`, {
    method: "POST",
    body: params.requestBody,
    headers: Object.fromEntries(entries({
      "Authorization": `Bearer ${params.apiKey}`,
      "X-Upload-Metadata": JSON.stringify(params.metadata)
    }))
  });
  const result = await response.json();
  if (Math.floor(response.status / 100) !== 2)
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  return result;
  }

  const handleAddFileToDatabase = async (e) => {
    

    try {
      if (file) {
        
        const response = await basicUpload({accountId: "12a1ygv",
        apiKey: "public_12a1ygv9mk9Gvmd43GWXR6mghHNP",
        requestBody: file})

        inputFileDetails.file = response.fileUrl;
      } 

      const response = await axios.put(`/projects/addAnotherFile/${props.projectId}`, inputFileDetails)
      console.log(response)
    }
    catch (err) {
        console.log(err);
      }

      setInputFileDetails({user: user.username})
      setAddNewFileModal(false)
      setFile("")
      props.reFetch()
}

  return (
    <>
      <div className="cardItem">
        <div className="topbarCardItem">
          <h4>Files</h4>
          <button onClick={() => setAddNewFileModal(true)}>
            <Add /> Add new
          </button>
        </div>
        <div className="tableTasks">
          <div className="filterTasks">
            <div className="filteredTasksItem active">Proiectare</div>
            <div className="filteredTasksItem">Productie</div>
          </div>
          <div className="tableHead">
            <ul>
              <li style={{ width: "13%" }}>Stage</li> 
              <li style={{ width: "47%" }}>Note</li>
              <li style={{ width: "20%" }}>Date</li>
              <li style={{ width: "10%" }}>Submitter</li>
            </ul>
          </div>
          <div className="tableContents">
            {Object.keys(props.dataToShow).length !== 0 && props.dataToShow.files.map((item, index) => (
                <ul>
                <li style={{ width: "13%" }}>{item.stage}</li> 
                <li style={{ width: "47%" }}><a href={`${item.file}`} target={"_blank"}>{item.note}</a></li>
                <li style={{ width: "20%" }}>{item.date.split("T")[0]}</li>
                <li style={{ width: "10%" }}>{item.user}</li>
              </ul>
            ))}

          </div>
        </div>
      </div>

      {addNewFileModal && (
        <div className="addNewFile">
          <div className="topLine">
            <span>Add new file</span>
            <Close
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => {
                setAddNewFileModal(false);
                setInputFileDetails({});
              }}
            />
          </div>
          <div className="middleStage">
            <FormControl
              sx={{ m: 1, minWidth: 100, width: "fit-content" }}
              size="small"
            >
              <InputLabel id="demo-select-small">stage</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={inputFileDetails.stage}
                label="stage"
                onChange={handleChangeStage}
              >
                {stageArray.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="file">
              <label htmlFor="file">
                <AttachFileIcon
                  className={`itemPicture ${file ? "green" : "red"}`}
                />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <input
            name="note"
            type="text"
            value={inputFileDetails.note}
            onChange={handleInputFileDetails}
          />
          <button onClick={() => handleAddFileToDatabase()}>Add</button>
        </div>
      )}
    </>
  );
}
