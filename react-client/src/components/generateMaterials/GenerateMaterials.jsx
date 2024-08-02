import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "./generateMaterials.scss"

export default function GenerateMaterials({room}) {

    //KITCHEN
    const [inputValues, setInputValues] = useState({})
    const [outputValues, setOutputValues] = useState({})
    const [totalValues, setTotalValues] = useState({})

    //BEDROOM
    const [inputValuesBedroom, setInputValuesBedroom] = useState({})
    const [outputValuesBedroom, setOutputValuesBedroom] = useState({})

    //KITCHEN
    const handleInput = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }

    //BEDROOM
    const handleInputBedroom = (e) => {
      setInputValuesBedroom({
        ...inputValuesBedroom,
        [e.target.name]: e.target.value
      })
    }

    const calculateMPbaza = () => {
      const hBazaM = inputValues.hCorpuriBaza / 100; // hbaza in m
      const corpMediu = inputValues.lungimeBaza / inputValues.nrCorpuriBaza // latime corp mediu in m
      const laterale = (hBazaM * 0.55) * 2;
      const fundTopPolita = corpMediu * 0.55 * 2 + corpMediu * 0.10 * 2

      return Math.round((laterale + fundTopPolita) * inputValues.nrCorpuriBaza*100)/100
    }

    const calculateMPsuspendat = () => {
      const hSuspendatM = inputValues.hCorpuriSuspendat / 100;
      const corpMediu = inputValues.lungimeSuspendat / inputValues.nrCorpuriSuspendat 
      const laterale = (hSuspendatM * 0.3) * 2;
      const fundTopPolite = corpMediu * 0.3 * 4;

      return Math.round((laterale + fundTopPolite) * inputValues.nrCorpuriSuspendat*100)/100
    }

    const calculateMPsoldat = () => {
      const hSoldatM = inputValues.hCorpuriSoldat / 100;
      const corpMediu = inputValues.lungimeSoldat / inputValues.nrCorpuriSoldat
      const laterale = (hSoldatM * 0.6) * 2
      const fundTop = corpMediu * 0.6 * 4

      return Math.round((laterale + fundTop) * inputValues.nrCorpuriSoldat*100)/100
    }

    const calculateMPsertare = () => {
      const corpMediu = inputValues.lungimeBaza / inputValues.nrCorpuriBaza
      const sertare = inputValues.nrSertareMetalice * corpMediu * 0.5

      return Math.round(sertare*100)/100
    }

    const calculateMPFronturi = () => {
      const fronturiBaza = (inputValues.lungimeBaza * inputValues.hCorpuriBaza / 100) - (0.6 * inputValues.hElectrocasniceBaza / 100)
      const fronturiSuspendat = inputValues.lungimeSuspendat * inputValues.hCorpuriSuspendat / 100
      const fronturiSoldat = (inputValues.lungimeSoldat * inputValues.hCorpuriSoldat / 100) - (inputValues.lungimeSoldat / inputValues.nrCorpuriSoldat * inputValues.hElectrocasniceSoldat / 100)

      return Math.round((fronturiBaza + fronturiSoldat + fronturiSuspendat) * 100)/100
    }

    const calculateMPtotal = () => {
      const totalCarcase = outputValues.mpBaza + outputValues.mpSoldat + outputValues.mpSuspendat;
      const sertare = outputValues.mpSertare

      return Math.round((totalCarcase + sertare)*100)/100
    }

    const calculateMPCarcasaBedroom = () => {
      const lateraleDivizori = (parseInt(inputValuesBedroom.inaltimeBaza) / 100 * parseInt(inputValuesBedroom.adancimeBaza) / 100 ) * (parseInt(inputValuesBedroom.nrUsiBaza) + 1 )
      const topFund = inputValuesBedroom.inaltimeBaza > 200 ? (inputValuesBedroom.latimeBaza / 100 * inputValuesBedroom.adancimeBaza / 100 * 4) : (inputValuesBedroom.latimeBaza / 100 * inputValuesBedroom.adancimeBaza / 100 * 2)
      const polite = inputValuesBedroom.latimeBaza * inputValuesBedroom.adancimeBaza * inputValuesBedroom.nrPoliteBaza / 10000
      const sertare = (inputValuesBedroom.latimeBaza / inputValuesBedroom.nrUsiBaza * inputValuesBedroom.adancimeBaza * 2.2) * inputValuesBedroom.nrSertareBaza / 10000

      return Math.round(((lateraleDivizori+sertare+topFund+polite))*100)/100
    }

    const calculateMPFronturiBedroom = () => {
      return Math.round(inputValuesBedroom.latimeBaza / 100 * inputValuesBedroom.inaltimeBaza / 100 * 100)/100

    
    }

    //calculate output Values KITCHEN
    useEffect(() => {
      setOutputValues({
        ...outputValues,
        mpBaza: calculateMPbaza(),
        mpSuspendat: calculateMPsuspendat(),
        mpSoldat: calculateMPsoldat(),
        mpSertare: calculateMPsertare(),
      })
    }, [inputValues])

    //calculate Total Values KITCHEN
    useEffect(() => {
      setTotalValues({
        ...totalValues,
        mpTotal: calculateMPtotal(),
        mpFronturi: calculateMPFronturi(),
      })
    })


    //calculate outputValues BEDROOM
    useEffect(() => {
      setOutputValuesBedroom({
        ...outputValuesBedroom,
        mpCarcasa: calculateMPCarcasaBedroom(),
        mpFronturi: calculateMPFronturiBedroom(),
      })
    })


  return (
    <div className="generateMaterialsWrapper">
      {/* KITCHEN */}
        {room === "kitchen" && <div className="inputArea">
            <div className='inputAreaItem'>
                <h4>Corpuri baza</h4>
                <div className="inputItemSubitem">
                      <span>lungime baza(m):</span>{" "}
                      <input
                        name="lungimeBaza"
                        type="text"
                        value={inputValues.lungimeBaza}
                        onChange={handleInput}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>nr corpuri:</span>{" "}
                      <input
                        name="nrCorpuriBaza"
                        type="text"
                        value={inputValues.nrCorpuriBaza}
                        onChange={handleInput}
                      />{" "}
                </div>
                <div className="inputItemSubitem">
                      <span>h corpuri(cm):</span>{" "}
                      <input
                        name="hCorpuriBaza"
                        type="text"
                        value={inputValues.hCorpuriBaza}
                        onChange={handleInput}
                      />{" "}
                </div>
                <div className="inputItemSubitem">
                      <span>h electrocasnice(cm):</span>{" "}
                      <input
                        name="hElectrocasniceBaza"
                        type="text"
                        value={inputValues.hElectrocasniceBaza}
                        onChange={handleInput}
                      />{" "}
                </div>

            </div>
            <div className='inputAreaItem'>
                <h4>Corpuri suspendate</h4>
                <div className="inputItemSubitem">
                      <span>lungime suspendat(m):</span>{" "}
                      <input
                        name="lungimeSuspendat"
                        type="text"
                        value={inputValues.lungimeSuspendat}
                        onChange={handleInput}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>nr corpuri:</span>{" "}
                      <input
                        name="nrCorpuriSuspendat"
                        type="text"
                        value={inputValues.nrCorpuriSuspendat}
                        onChange={handleInput}
                      />{" "}
                </div>
                <div className="inputItemSubitem">
                      <span>h corpuri(cm):</span>{" "}
                      <input
                        name="hCorpuriSuspendat"
                        type="text"
                        value={inputValues.hCorpuriSuspendat}
                        onChange={handleInput}
                      />{" "}
                </div>

            </div>
            <div className='inputAreaItem'>
                <h4>Soldati</h4>
                <div className="inputItemSubitem">
                      <span>lungime totala(m):</span>{" "}
                      <input
                        name="lungimeSoldat"
                        type="text"
                        value={inputValues.lungimeSoldat}
                        onChange={handleInput}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>nr corpuri:</span>{" "}
                      <input
                        name="nrCorpuriSoldat"
                        type="text"
                        value={inputValues.nrCorpuriSoldat}
                        onChange={handleInput}
                      />{" "}
                </div>
                <div className="inputItemSubitem">
                      <span>h corpuri(cm):</span>{" "}
                      <input
                        name="hCorpuriSoldat"
                        type="text"
                        value={inputValues.hCorpuriSoldat}
                        onChange={handleInput}
                      />{" "}
                </div>
                <div className="inputItemSubitem">
                      <span>h electrocasnice(cm):</span>{" "}
                      <input
                        name="hElectrocasniceSoldat"
                        type="text"
                        value={inputValues.hElectrocasniceSoldat}
                        onChange={handleInput}
                      />{" "}
                </div>

            </div>
            <div className='inputAreaItem'>
                <h4>Accesorii</h4>
                <div className="inputItemSubitem">
                      <span>Sertare metalice:</span>{" "}
                      <input
                        name="nrSertareMetalice"
                        type="text"
                        value={inputValues.nrSertareMetalice}
                        onChange={handleInput}
                      />{" "}
                      
                </div>
                

            </div>
            
        </div>}
      {/* BEDROOM */}

        {room === "bedroom" && <div className='inputArea'>
          <div className="inputAreaItem">
              <h4>Corp baza</h4>
                <div className="inputItemSubitem">
                      <span>latime baza(cm):</span>{" "}
                      <input
                        name="latimeBaza"
                        type="text"
                        value={inputValuesBedroom.latimeBaza}
                        onChange={handleInputBedroom}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>adancime baza(cm):</span>{" "}
                      <input
                        name="adancimeBaza"
                        type="text"
                        value={inputValuesBedroom.adancimeBaza}
                        onChange={handleInputBedroom}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>inaltime baza(cm):</span>{" "}
                      <input
                        name="inaltimeBaza"
                        type="text"
                        value={inputValuesBedroom.inaltimeBaza}
                        onChange={handleInputBedroom}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>nr usi:</span>{" "}
                      <input
                        name="nrUsiBaza"
                        type="text"
                        value={inputValuesBedroom.nrUsiBaza}
                        onChange={handleInputBedroom}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>nr polite:</span>{" "}
                      <input
                        name="nrPoliteBaza"
                        type="text"
                        value={inputValuesBedroom.nrPoliteBaza}
                        onChange={handleInputBedroom}
                      />{" "}
                      
                </div>
                <div className="inputItemSubitem">
                      <span>nr sertare:</span>{" "}
                      <input
                        name="nrSertareBaza"
                        type="text"
                        value={inputValuesBedroom.nrSertareBaza}
                        onChange={handleInputBedroom}
                      />{" "}
                      
                </div>

          </div>
        </div> }

        <div className="outputArea">

          {/* KITCHEN */}
            {room === "kitchen" && <div className='processedOutput'>
                <div className='processedOutputItem'>
                        <span>
                          mp baza :<h6>*metri patrati structura baza</h6>
                        </span>
                        {outputValues.mpBaza}
                </div>
                <div className='processedOutputItem'>
                        <span>
                          mp suspendat :<h6>*metri patrati structura suspendat</h6>
                        </span>
                        {outputValues.mpSuspendat}
                </div>
                <div className='processedOutputItem'>
                        <span>
                          mp soldat :<h6>*metri patrati structura soldat</h6>
                        </span>
                        {outputValues.mpSoldat}
                </div>
                <div className='processedOutputItem'>
                        <span>
                          Total :<h6>*metri patrati structura</h6>
                        </span>
                        {totalValues.mpTotal}
                </div>
                <div className='processedOutputItem'>
                        <span>
                          Fronturi :<h6>*metri patrati fronturi</h6>
                        </span>
                        {totalValues.mpFronturi}
                </div>
            </div>}

            {/* BEDROOM */}
            {room === "bedroom" && <div className='processedOutput'>
                <div className='processedOutputItem'>
                        <span>
                          mp baza :<h6>*metri patrati structura baza</h6>
                        </span>
                        {outputValuesBedroom.mpCarcasa}
                </div>
                <div className='processedOutputItem'>
                        <span>
                          mp fronturi :<h6>*metri patrati fronturi baza</h6>
                        </span>
                        {outputValuesBedroom.mpFronturi}
                </div>
              </div>}
        </div>
    </div>
  )
}
