import React, { useState } from "react";
import "./projectDetails.scss";
import {
  Add,
  Apartment,
  DoorFront,
  Person,
  Kitchen,
  Chair,
  Shower,
  KingBed,
  Sell,
  Paid,
  AccessTime,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { ItemModal } from "../itemModal/ItemModal";


export default function ProjectDetails(props) {
  const dataToShow = props.dataToShow;



  const [itemModal, setItemModal] = useState(false)
  const [itemId, setItemId] = useState("")
  const [itemInfo, setItemInfo] = useState({})

  const handleOpenModal = (id) => {
    setItemInfo(dataToShow.items.filter((item) => item._id === id))
    setItemId(id)
    setItemModal(true)
        
  }
  

  const handleCloseItemModal = () => {
    setItemModal(false);
    
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

  return (
    <>
    <div className="cardItem">
      <div className="topbarCardItem">
        <h4>Details</h4>
        <button>
          <Add /> Add new
        </button>
      </div>
      <div className="detailsContents">
        <ul>
          <li>
            <Apartment /> {dataToShow.summary}
          </li>
          <li className="subItemSection">
            {Object.keys(dataToShow).length !== 0 &&
              dataToShow.items.map((item, index) => (
                <div className="itemSection">
                  <div className="itemName" onClick={()=>handleOpenModal(item._id)}>
                    {" "}
                    <span>{item.name}</span>
                    <span>{item.stage}</span>
                      <span>{item.price} {" LEI"}</span>
                  </div>
                </div>
              ))}
          </li>
          <li>
            <Person /> {dataToShow.client}
          </li>
          <li>
            <Sell />
            {"Pret "} {dataToShow.price}
            {" lei"}
          </li>
          <li>
            <Paid />
            {"Avans "} {dataToShow.avans}
            {" lei"} - {dateFormat(parseInt(dataToShow.dataAvans))}
          </li>
          <li>
            <AccessTime />
            {"Deadline "} {dateFormat(parseInt(dataToShow.deadline))}
          </li>
        </ul>
      </div>
    </div>

    {itemModal && (
        <div className="itemModal">
          <div className="modal-content">
            <div
              className="closeModal"
              onClick={() => handleCloseItemModal()}
            >
              <CloseIcon />
            </div>

            {/* here is the modal */}
                <ItemModal item={itemInfo} itemId={itemId}/>
           
            <div className="botModal">
              {/* <div className='saveBtn'>Save</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
