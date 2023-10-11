import React, { useState } from "react";
import "./priceOffer.scss";
import NewWindow from "react-new-window";
import { useEffect } from "react";
import {
  Person,
  CalendarMonth,
  Add,
  Remove,
  Send,
  AddPhotoAlternateOutlined,
  Delete,
  Edit,
  Cached,
  Bolt,
  SaveAlt,
  Archive,
  Clear,
} from "@mui/icons-material";
import PriceOfferTable from "../../components/priceOfferTable/PriceOfferTable";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

export default function PriceOffer() {
  const [generate, setGenerate] = useState(false);
  const [inputItem, setInputItem] = useState({
    title: "",
    details: [],
    pending: [],
    picture: "",
    remarks: [],
    price: "",
    client: "",
    offerNumber: "",
  });
  const [addDetailsModal, setAddDetailsModal] = useState(false);
  const [openPictureModal, setOpenPictureModal] = useState(false);
  const [currentInputDetails, setCurrentInputDetails] = useState("");
  const [currentInputPending, setCurrentInputPending] = useState("");
  const [currentInputRemark, setCurrentInputRemark] = useState("");
  const [detailsArray, setDetailsArray] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);
  const [remarkArray, setRemarkArray] = useState([]);
  const [addPendingModal, setAddPendingModal] = useState(false);
  const [addRemarksModal, setAddRemarksModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  //create an algorithm for automatically insert an offer number
  const [offerNumber, setOfferNumber] = useState("");
  const [file, setFile] = useState("");
  const [idArray, setIdArray] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [saveData, setSaveData] = useState({});
  const [refreshList, setRefreshList] = useState(false);
  const [updateOffer, setUpdateOffer] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState("");

  const handleInput = (e) => {
    setInputItem({ ...inputItem, [e.target.name]: e.target.value });
  };

  const handleInputDetails = (e) => {
    setCurrentInputDetails(e.target.value);
  };

  const handleInputPending = (e) => {
    setCurrentInputPending(e.target.value);
  };

  const handleInputRemark = (e) => {
    setCurrentInputRemark(e.target.value);
  };

  const handleAddDetail = () => {
    setDetailsArray([...detailsArray, currentInputDetails]);
    setCurrentInputDetails("");
    setAddDetailsModal(false);
  };

  const handleAddPending = () => {
    setPendingArray([...pendingArray, currentInputPending]);
    setCurrentInputPending("");
    setAddPendingModal(false);
  };

  const handleAddRemark = () => {
    setRemarkArray([...remarkArray, currentInputRemark]);
    setCurrentInputRemark("");
    setAddRemarksModal(false);
  };

  const handleAddImage = () => {
    setOpenPictureModal(false);
  };

  const handleRemoveDetailsItem = (item) => {
    setDetailsArray(detailsArray.filter((detail) => detail !== item));
    setInputItem({ ...inputItem, details: detailsArray });
  };

  const handleRemovePendingItem = (item) => {
    setPendingArray(pendingArray.filter((pending) => pending !== item));
    setInputItem({ ...inputItem, pending: pendingArray });
  };

  const handleRemoveRemarkItem = (item) => {
    setRemarkArray(remarkArray.filter((remark) => remark !== item));
    setInputItem({ ...inputItem, remarks: remarkArray });
  };

  useEffect(() => {
    setInputItem({
      ...inputItem,
      details: detailsArray,
      pending: pendingArray,
      remarks: remarkArray,
    });
  }, [detailsArray, pendingArray, remarkArray]);

  const handlePushToList = async (e) => {
    e.preventDefault();
    
    console.log(inputItem)
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "projectHandler");

    try {
      if (file) {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dydivylgi/image/upload",
          data
        );
        const { url } = uploadRes.data;
        inputItem.picture = url;
      } else {
        inputItem.picture =
          "https://res.cloudinary.com/dydivylgi/image/upload/v1670355595/projectHandler/generic_xihl2c.png";
      }

      const response = await axios.post("/priceofferitem", inputItem);
      idArray.push(response.data._id);
    } catch (err) {
      console.log(err);
    }

    setItemList([...itemList, inputItem]);
    setDetailsArray([]);
    setPendingArray([]);
    setRemarkArray([]);
    setFile("");
    setInputItem({
      title: "",
      details: [],
      pending: [],
      picture: "",
      remarks: [],
      price: "",
      client: client,
      offerNumber: offerNumber,
    });
  };

  const handleGenerate = () => {
    if (generate) {
      setGenerate(false);
    } else {
      setGenerate(true);
    }
  };

  const dateFormated = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    const formatedDate = day + "/" + month + "/" + year;

    return formatedDate;
  };

  const handleDeleteDisplayRow = async (id) => {
    if(updateOffer){
      try {
        axios.delete(`/priceofferitem/${id}`)
        
      } catch (err) {
        console.log(err)
      }
    }else{
      const deleted = itemList.splice(id, 1);
      setItemList(itemList.filter((item) => item !== deleted));
    }
    
    
  };

  const handleEditDisplayRow = (index) => {
    setEdit(true);
    setEditIndex(index);
    const objToEdit = itemList[index];
    setInputItem({
      title: objToEdit.title,
      picture: objToEdit.picture,
      price: objToEdit.price,
    });

    setDetailsArray(objToEdit.details);
    setPendingArray(objToEdit.pending);
    setRemarkArray(objToEdit.remarks);
  };

  const handleUpdateToList = () => {
    itemList[editIndex] = inputItem;
    setEdit(false);
    setDetailsArray([]);
    setPendingArray([]);
    setRemarkArray([]);
    setInputItem({
      title: "",
      details: [],
      pending: [],
      picture: "",
      remarks: [],
      price: "",
    });
  };

  const handleInputClient = (e) => {
    setClient(e.target.value);
  };

  const handleInputProject = (e) => {
    setProject(e.target.value);
  };

  const handleInputOfferNumber = (e) => {
    setOfferNumber(e.target.value);
  };

  const handleClearItem = () => {
    setEdit(false);
    setDetailsArray([]);
    setPendingArray([]);
    setRemarkArray([]);
    setOfferNumber("")
    setProject("")
    setClient("")
    setInputItem({
      title: "",
      details: [],
      pending: [],
      picture: "",
      remarks: [],
      price: ""
    });
  };

  const handleClearList = () => {
    setItemList([]);
    setUpdateOffer(false);
  };
  //populate itemList with the items from the priceOffer from database
  const sendPriceOfferToList = async (index) => {
    setUpdateOffer(true);
    setIdToUpdate(index);
    const priceOffer = await axios.get(`/priceoffer/${index}`);
    const offerNumber = priceOffer.data.offerNumber;
    setOfferNumber(offerNumber)
    setClient(priceOffer.data.client)
    setProject(priceOffer.data.summary)
    
    const list = await axios.get(`/priceofferitem/offerNumber/${offerNumber}`);

    setItemList(list.data);
    console.log(list.data);
  };

  
  const handleSaveOffer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/priceoffer", saveData);
    } catch (err) {
      console.log(err)
    }
    
    setRefreshList(!refreshList);
    setOfferNumber("");
    setClient("");
    setProject("");
    setItemList([]);
  };

  const handleUpdateOffer = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`/priceoffer/${idToUpdate}`, saveData)
    } catch (err) {
      console.log(err)
    }

    setRefreshList(!refreshList);
    setOfferNumber("");
    setClient("");
    setProject("");
    setItemList([]);
  }

  useEffect(() => {
    let price = 0;
    itemList.map((item) => (price = parseInt(price) + parseInt(item.price)));
    setSaveData({
      ...saveData,
      client: client,
      offerNumber: offerNumber,
      date: dateFormated(),
      items: idArray,
      price: price.toString(),
      summary: project,
    });
  }, [itemList, client, offerNumber]);


  useEffect(() => {
    setInputItem({ ...inputItem, client: client, offerNumber: offerNumber });
  }, [client, offerNumber]);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <>
      {/* Generate offer */}
      {generate && (
        <NewWindow features="width=800,height=400,left=300">
          <div className="offerWrapper">
            <div className="offerHeader">
              <div className="headerLogo">
                <img
                  src="https://res.cloudinary.com/dydivylgi/image/upload/v1668337393/kribstudio/krib_Studio_logo_v1_offer_xnfted.png"
                  alt=""
                />
              </div>
              <div className="headerText">
                <ul>
                  <li>
                    {" "}
                    <h3>Oferta preliminara</h3>
                  </li>
                  <li>
                    <Person />
                    <h4>{client}</h4>
                  </li>
                  <li>
                    <CalendarMonth /> <h4>{dateFormated()}</h4>
                  </li>
                </ul>
              </div>
            </div>
            <div className="offerBody">
              {itemList.map((item, index) => (
                <div className="offerItem" key={index}>
                  <div className="offerItemLeft">
                    <div className="title">{item.title}</div>
                    <div className="subtitle details">Detalii</div>
                    <ul className="details">
                      {item.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                    <div className="subtitle pending">In asteptare</div>
                    <ul className="pending">
                      {item.pending.map((pending, index) => (
                        <li key={index}>{pending}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="offerItemRight">
                    <div className="picture">
                      <img src={item.picture} alt="" />
                    </div>

                    <div className="subtitle obs">Observatii</div>
                    <ul className="obs">
                      {item.remarks.map((remark, index) => (
                        <li key={index}>{remark}</li>
                      ))}
                    </ul>

                    <div className="subtitle pret">Pret: </div>
                    <ul className="pret">
                      <li>{item.price} RON</li>
                      <li>
                        * Pretul poate oscila in functie de modificarile aduse{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </NewWindow>
      )}

      <div className="inputAreaWrapper">
        <div className="inputAreaForm">
          <div className="inputAreaElement">
            <div className="inputAreaItem">
              <div className="itemClient">
                <span>Offer number</span>
                <input
                  name="title"
                  type="text"
                  value={offerNumber}
                  onChange={handleInputOfferNumber}
                  readOnly = {updateOffer ? true : false}
                ></input>
              </div>
              <div className="itemClient">
                <span>Client</span>
                <input
                  name="title"
                  type="text"
                  value={client}
                  onChange={handleInputClient}
                  readOnly = {updateOffer ? true : false}
                ></input>
              </div>
              <div className="itemClient">
                <span>Project name</span>
                <input
                  name="title"
                  type="text"
                  value={project}
                  onChange={handleInputProject}
                  readOnly = {updateOffer ? true : false}
                ></input>
              </div>

              <div className="itemFirstRow">
                {openPictureModal && (
                  <div className="pictureModal">
                    <h5>Add image url</h5>
                    <div className="pictureModalContent">
                      <input
                        name="picture"
                        type="text"
                        value={inputItem.picture}
                        onChange={handleInput}
                      ></input>
                      <Send
                        onClick={handleAddImage}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                )}
                <div className="itemTitle">
                  <span>Title</span>
                  <input
                    name="title"
                    type="text"
                    value={inputItem.title}
                    onChange={handleInput}
                  ></input>
                </div>
                <div className="itemPicture">
                  <label htmlFor="file">
                    <AddPhotoAlternateOutlined
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
                <div className="itemPrice">
                  <span>Price</span>
                  <input
                    name="price"
                    type="text"
                    value={inputItem.price}
                    onChange={handleInput}
                  ></input>
                </div>
              </div>

              <div className="itemSecondRow">
                <div className="itemDetails">
                  <div className="detailsTop">
                    <h4>Details</h4>
                    {addDetailsModal ? (
                      <Remove
                        onClick={() => setAddDetailsModal(false)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Add
                        onClick={() => setAddDetailsModal(true)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                  {addDetailsModal && (
                    <div className="inputAddDetailsModal">
                      <input
                        name="addDetail"
                        type="text"
                        value={currentInputDetails}
                        onChange={handleInputDetails}
                      ></input>
                      <Send
                        style={{ color: "#7fc6a480", cursor: "pointer" }}
                        onClick={handleAddDetail}
                      />
                    </div>
                  )}
                  <ul>
                    {detailsArray.map((item, index) => (
                      <li key={index}>
                        {item}{" "}
                        <Remove
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleRemoveDetailsItem(item)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="itemDetails">
                  <div className="detailsTop">
                    <h4>Pending</h4>
                    {addPendingModal ? (
                      <Remove
                        onClick={() => setAddPendingModal(false)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Add
                        onClick={() => setAddPendingModal(true)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                  {addPendingModal && (
                    <div className="inputAddDetailsModal ">
                      <input
                        className="border-pending"
                        name="addDetail"
                        type="text"
                        value={currentInputPending}
                        onChange={handleInputPending}
                      ></input>
                      <Send
                        style={{ color: "#d7826a80", cursor: "pointer" }}
                        onClick={handleAddPending}
                      />
                    </div>
                  )}
                  <ul>
                    {pendingArray.map((item, index) => (
                      <li className="pending" key={index}>
                        {item}
                        <Remove
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleRemovePendingItem(item)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="itemThirdRow">
                <div className="itemDetails">
                  <div className="detailsTop">
                    <h4>Remarks</h4>
                    {addRemarksModal ? (
                      <Remove
                        onClick={() => setAddRemarksModal(false)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Add
                        onClick={() => setAddRemarksModal(true)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                  {addRemarksModal && (
                    <div className="inputAddDetailsModal">
                      <input
                        className="border-remark"
                        name="addDetail"
                        type="text"
                        value={currentInputRemark}
                        onChange={handleInputRemark}
                      ></input>
                      <Send
                        style={{ color: "#fed86680", cursor: "pointer" }}
                        onClick={handleAddRemark}
                      />
                    </div>
                  )}
                  <ul>
                    {remarkArray.map((item, index) => (
                      <li className="remark" key={index}>
                        {item}
                        <Remove
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => handleRemoveRemarkItem(item)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="buttons">
                {edit ? (
                  <button
                    className="updateItemFromList"
                    onClick={handleUpdateToList}
                  >
                    Update <Cached />{" "}
                  </button>
                ) : (
                  <button className="addItemToList" onClick={handlePushToList}>
                    Push to list <Send />
                  </button>
                )}
                <button
                  className="clearItemsFromList"
                  onClick={handleClearItem}
                >
                  Clear <Clear />
                </button>
              </div>
            </div>
          </div>
          <div className="outputAreaElement">
            <div className="outputAreaContent">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "35%" }}>Title</th>
                    <th style={{ width: "15%" }}>Price</th>
                    <th style={{ width: "10%" }}>Details</th>
                    <th style={{ width: "10%" }}>Pending</th>
                    <th style={{ width: "10%" }}>Remarks</th>
                    <th style={{ width: "10%" }}>Image</th>
                    <th style={{ width: "10%" }}>Actions</th>
                  </tr>
                </thead>

                {itemList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.details.length}</td>
                    <td>{item.pending.length}</td>
                    <td>{item.remarks.length}</td>
                    <td>
                      {item.picture &&
                      item.picture !==
                        "https://res.cloudinary.com/dydivylgi/image/upload/v1670355595/projectHandler/generic_xihl2c.png"
                        ? "Yes"
                        : "No"}
                    </td>
                    <td>
                      <Delete
                        style={{ color: "#d7826a", cursor: "pointer" }}
                        onClick={updateOffer ? () => handleDeleteDisplayRow(item._id) : () => handleDeleteDisplayRow(index)}
                      />
                      <Edit
                        style={{ color: "#fed766", cursor: "pointer" }}
                        onClick={() => handleEditDisplayRow(index)}
                      />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            <div className="buttons">
              <button onClick={handleGenerate} className="generateButton">
                {" "}
                {generate ? "Refresh" : "Generate"}
                <Bolt />
              </button>
              {updateOffer ? (
                <button onClick={handleUpdateOffer} className="generateButton">
                  Update offer <Cached />
                </button>
              ) : (
                <button onClick={handleSaveOffer} className="saveButton">
                  Save offer <SaveAlt />
                </button>
              )}

              <button className="saveButton">
                Transfer offer to project <Archive />
              </button>
              <button className="clearItemsFromList" onClick={handleClearList}>
                Clear <Clear />
              </button>
            </div>
          </div>
        </div>

        <div className="inputAreaForm">
          <PriceOfferTable
            sendPriceOfferToList={sendPriceOfferToList}
            refreshList={refreshList}
          />
        </div>
      </div>
    </>
  );
}
