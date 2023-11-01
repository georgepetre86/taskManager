import { Delete, Edit } from '@mui/icons-material'
import React, { useEffect } from 'react'
import "./priceOfferTable.scss"
import useFetch from '../../hooks/useFetch'
import axios from 'axios'

export default function PriceOfferTable({sendPriceOfferToList, refreshList}) {

    const {data, loading, error, reFetch} = useFetch("/priceoffer")

    data.sort((a,b) =>  b.offerNumber.replace('KRB0','') - a.offerNumber.replace('KRB0','') )

    const handleDeleteOffer = async (id, offerNumber) => {
      console.log(id)
      const useOffer = offerNumber.replace('KRB0','')
      try {
        //delete price offer
        await axios.delete(`/priceoffer/${id}`)
        //delete items from price offer
        await axios.delete(`/priceofferitem/offerNumber/${useOffer}`)
      } catch (err) {
        console.log(err)
      }
      reFetch()
    } 

    useEffect(() =>{
      reFetch()
    }, [refreshList])

   
  return (
    <div className="priceoffertable">
        <table>
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Offer Number</th>
                    <th style={{ width: "30%" }}>Summary</th>
                    <th style={{ width: "20%" }}>Client</th>
                    <th style={{ width: "10%" }}>Price</th>
                    <th style={{ width: "10%" }}>Date</th>
                    <th style={{ width: "10%" }}>Items</th>
                    <th style={{ width: "10%" }}>Actions</th>
                  </tr>
                </thead>
                
                {!loading && data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.offerNumber}</td>
                    <td>{item.summary}</td>
                    <td>{item.client}</td>
                    <td>{item.price}</td>
                    <td>{item.date}</td>
                    <td>{item.items.length}</td>
                    <td>
                      <Delete
                        style={{ color: "#d7826a", cursor: "pointer" }}
                        onClick = {()=>handleDeleteOffer(item._id, item.offerNumber)}
                      />
                      <Edit
                        style={{ color: "#fed766", cursor: "pointer" }}
                        onClick={() => {sendPriceOfferToList(item._id)}}
                      />
                    </td>
                  </tr>
                ))}
              </table>
    </div>
  )
}
