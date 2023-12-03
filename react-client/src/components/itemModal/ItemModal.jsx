import React, { useEffect, useState } from 'react'
import "./itemModal.scss"

export const ItemModal = (props) => {

    const [itemId, setItemId] = useState("")
    const [itemInfo, setItemInfo] = useState({})

    useEffect(() => {
        setItemId(props.itemId)
        setItemInfo(props.item[0])
    }, [props])

    console.log(itemInfo)
  return (
    <div className="itemSection">
    <div className="itemName">
      {" "}
      <span>{itemInfo.name}</span>
      <span>{itemInfo.stage}</span>
    <span>{itemInfo.price} {" LEI"}</span>
    </div>
    <div className="itemTable">
      
      
        <div className="materialsSection">
            <h3>Materiale</h3>
          <div className="materialsHeader">
            <span style={{ width: "30%" }}>Material</span>
            <span style={{ width: "10%" }}>mp</span>
            <span style={{ width: "50%" }}>Cod</span>
            <span style={{ width: "10%" }}>Placi</span>
          </div>
          {Object.keys(itemInfo).length !== 0 && itemInfo.materiale.map((mat, index) => (
            <div className="materialsRow" key={index}>
              <span style={{ width: "30%" }}>{mat.tip}</span>
              <span style={{ width: "10%" }}>
                {mat.suprafata}
              </span>
              <span style={{ width: "50%" }}>{mat.cod}</span>
              <span style={{ width: "10%" }}>
                {Math.ceil((mat.suprafata * 1.1) / 5.8)}
              </span>
            </div>
          ))}
        </div>
        <div className="accesoriesSection">
            <h3>Accesorii</h3>
        <div className="accesoriesHeader">
            <span style={{ width: "40%" }}>Accesoriu</span>
            <span style={{ width: "15%" }}>numar</span>
            <span style={{ width: "35%" }}>pret</span>
            <span style={{ width: "10%" }}>total</span>
          </div>
          {Object.keys(itemInfo).length !== 0 && itemInfo.accesorii.map((acc, index) => (
            <div className="accesoriesRow" key={index}>
              <span style={{ width: "40%" }}>{acc.nume}</span>
              <span style={{ width: "15%" }}>{acc.numar}</span>
              <span style={{ width: "35%" }}>{acc.pret}</span>
              <span style={{ width: "10%" }}>
                {Math.round(acc.pret * acc.numar * 100) / 100}
              </span>
            </div>
          ))}
        </div>
      </div>
     
  </div>
  )
}
