import React from "react";
import "./priceGenerator.scss";
import {
  Kitchen,
  Chair,
  Bathtub,
  KingBed,
  Desk,
  MeetingRoom,
  CheckBox,
} from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { Checkbox } from "@mui/material";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import GenerateMaterials from "../../components/generateMaterials/GenerateMaterials";

export default function PriceGenerator() {
  const PROCENT_CANT = 18 / 100;
  const PROCENT_PIERDERI_DEBITARE = 12 / 100;
  const PROCENT_PROIECTARE = 15 / 100;
  const PROCENT_MASTERMOB = 25 / 100;
  const VOPSIT_BASIC = 110;
  const VOPSIT_MEDIUM = 135;
  const VOPSIT_HIGH = 160;
  const CURS_EUR = 5;
  const MULTIPLICATOR_CARCASE = 2.6;
  const MULTIPLICATOR_FRONTURI = 2.6;
  const PRET_MDF_BRUT_VOPSIT = 400;

  const accesoriiArray = ["balamale", "picioare", "sertare", "blat", "picurator", "jolly", "prinderi", "led", "manere", "extra"]

  const [selectedRoom, setSelectedRoom] = useState("");
  const [inputPrice, setInputPrice] = useState({ mp_carcasa: "" });
  const [inputPriceAccesorii, setInputPriceAccesorii] = useState({});
  const [totalAccesorii, setTotalAccesorii] = useState("0");
  const [processedInputInfo, setProcessedInputInfo] = useState({});
  const [processedInfo, setProcessedInfo] = useState({});
  const [processedInputInfo2, setProcessedInputInfo2] = useState({});
  const [processedInputInfo3, setProcessedInputInfo3] = useState({});
  const [processedInputInfo4, setProcessedInputInfo4] = useState({});
  const [processedInputInfo5, setProcessedInputInfo5] = useState({});
  const [processedInputInfo6, setProcessedInputInfo6] = useState({});
  const [processedInputInfo7, setProcessedInputInfo7] = useState({});
  //verifica daca este selectata utilizarea procentajului pentru cant
  const [cantChecked, setCantChecked] = useState(false);
  const [cantFronturiChecked, setCantFronturiChecked] = useState(false);
  const [accesoriiChecked, setAccesoriiChecked] = useState(false);
  //verifica ce tip de front e selectat
  const [tipFront, setTipFront] = useState("");
  const [tipVopsit, setTipVopsit] = useState("");
  const [update, setUpdate] = useState(false);

  //seteaza verificarea cantului
  const handleCantCheckBox = () => {
    setCantChecked(!cantChecked);
  };
  const handleCantFronturiCheckBox = () => {
    setCantFronturiChecked(!cantFronturiChecked);
  };
  const handleAccesoriiChecked = () => {
    setAccesoriiChecked(!accesoriiChecked);
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  //seteaza verificarea frontului
  const handleCheckFront = (e) => {
    setTipFront(e.target.value);
  };

  const handleTipVopsit = (e) => {
    setTipVopsit(e.target.value);
  };

  const handleSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleInput = (e) => {
    setInputPrice({ ...inputPrice, [e.target.name]: e.target.value });
  };

  const handleInputAccesorii = (e) => {
    e.preventDefault();
    setInputPriceAccesorii({
      ...inputPriceAccesorii,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(inputPriceAccesorii);
    const values = Object.values(inputPriceAccesorii)
    const sum = values.reduce((total, value) => {
      return parseInt(total) + parseInt(value)
    },0)
    setTotalAccesorii(sum)
    
  }, [inputPriceAccesorii]);

  useEffect(() => {
    setInputPrice({...inputPrice, accesorii: totalAccesorii });
  }, [totalAccesorii]);

  const handleCalculStructura = () => {
    const mp_carcasa =
      parseInt(inputPrice.mp_carcasa) * (1 + PROCENT_PIERDERI_DEBITARE);
    const pret_placa = parseInt(inputPrice.pret_placa);
    const mp_placa_carcasa = parseFloat(inputPrice.mp_placa_carcasa);
    const nr_placi =
      mp_carcasa % mp_placa_carcasa === 0
        ? Math.floor(mp_carcasa / mp_placa_carcasa)
        : Math.floor(mp_carcasa / mp_placa_carcasa) + 1;
    const pret_cant = cantChecked
      ? nr_placi * pret_placa * PROCENT_CANT
      : parseInt(inputPrice.pret_cant);

    const pret_carcase = pret_placa * nr_placi + pret_cant;

    return pret_carcase;
  };

  const handleCalculFitinguri = () => {
    return (
      Math.round(
        (processedInputInfo.costuri_structura_carcase +
          parseInt(inputPrice.accesorii)) *
          0.05 *
          100
      ) / 100
    );
  };

  const handleCostAccesorii = () => {
    return (
      Math.round(
        parseInt(inputPrice.accesorii) *
          (1 + parseInt(inputPrice.proc_accesorii) / 100) *
          100
      ) / 100
    );
  };

  const handleNrPlaci = () => {
    const mp_carcasa =
      parseFloat(inputPrice.mp_carcasa) * (1 + PROCENT_PIERDERI_DEBITARE);
    const mp_placa_carcasa = parseFloat(inputPrice.mp_placa_carcasa);
    const nr_placi =
      mp_carcasa % mp_placa_carcasa === 0
        ? Math.floor(mp_carcasa / mp_placa_carcasa)
        : Math.floor(mp_carcasa / mp_placa_carcasa) + 1;

    return nr_placi;
  };

  const handleCalculCarcase = () => {
    return (
      Math.round(
        (processedInputInfo.costuri_structura_carcase +
          processedInputInfo2.fitinguri) *
          MULTIPLICATOR_CARCASE *
          100
      ) / 100
    );
  };

  const handleCalculFronturi = () => {
    let pret_front = 0;
    if (tipFront === "vopsit") {
      switch (tipVopsit) {
        case "basic":
          return (pret_front =
            (Math.round(parseFloat(inputPrice.mp_front) * VOPSIT_BASIC * 100) /
              100) *
            CURS_EUR);
        case "medium":
          return (pret_front =
            (Math.round(parseFloat(inputPrice.mp_front) * VOPSIT_MEDIUM * 100) /
              100) *
            CURS_EUR);
        case "high":
          return (pret_front =
            (Math.round(parseFloat(inputPrice.mp_front) * VOPSIT_HIGH * 100) /
              100) *
            CURS_EUR);
          break;
      }
    } else if (tipFront === "pal/mdf") {
      const nr_placi = handleNrPlaciFront();
      const pret_placa = parseFloat(inputPrice.pret_placa_front);
      const cost_cant = cantFronturiChecked
        ? nr_placi * pret_placa * PROCENT_CANT
        : parseFloat(inputPrice.pret_cant_fronturi);
      pret_front = (nr_placi * pret_placa + cost_cant) * MULTIPLICATOR_FRONTURI;

      return Math.round(pret_front * 100) / 100;
    }
  };

  const handleCalculMontaj = () => {
    return (
      Math.round(
        processedInputInfo4.total *
          (parseInt(inputPrice.procent_montaj) / 100) *
          100
      ) / 100
    );
  };

  const handleNrPlaciFront = () => {
    const mp_front =
      parseFloat(inputPrice.mp_front) * (1 + PROCENT_PIERDERI_DEBITARE);
    const mp_placa_front = parseFloat(inputPrice.mp_placa_front);
    const nr_placi =
      mp_front % mp_placa_front === 0
        ? Math.floor(mp_front / mp_placa_front)
        : Math.floor(mp_front / mp_placa_front) + 1;

    return nr_placi;
  };

  const handleCostProiectare = () => {
    return (
      Math.round(
        (processedInputInfo.costuri_structura_carcase +
          parseFloat(inputPrice.accesorii) +
          processedInputInfo2.fitinguri) *
          PROCENT_PROIECTARE *
          100
      ) / 100
    );
  };

  const handleCalculMastermob = () => {
    return (
      Math.round(
        (processedInputInfo.costuri_structura_carcase +
          processedInputInfo2.fitinguri +
          processedInputInfo.costuri_fronturi) *
          PROCENT_MASTERMOB *
          100
      ) / 100
    );
  };

  const handleCalculTotal = () => {
    return (
      Math.round(
        (processedInputInfo3.carcase +
          processedInputInfo.fronturi +
          processedInputInfo.accesorii +
          processedInputInfo3.proiectare +
          parseFloat(inputPrice.extra) +
          processedInputInfo3.proc_mastermob) *
          100
      ) / 100
    );
  };

  const handleCalculCosturiFronturi = () => {
    const nr_placi =
      Math.floor(
        (parseFloat(inputPrice.mp_front) * (1 + PROCENT_PIERDERI_DEBITARE)) /
          5.8
      ) + 1;

    switch (tipFront) {
      case "vopsit":
        return nr_placi * PRET_MDF_BRUT_VOPSIT + parseFloat(inputPrice.vopsea);

      case "pal/mdf":
        return handleCalculFronturi() / MULTIPLICATOR_FRONTURI;
        break;
    }
  };

  const handleCalculCosturi = () => {
    return (
      Math.round(
        (processedInputInfo.costuri_structura_carcase +
          processedInputInfo.costuri_fronturi +
          parseFloat(inputPrice.accesorii) +
          processedInputInfo2.fitinguri +
          processedInputInfo3.proc_mastermob +
          parseFloat(inputPrice.extra) / MULTIPLICATOR_CARCASE +
          processedInputInfo6.proc_partener) *
          100
      ) / 100
    );
  };

  const handleCalculTaxe = () => {
    const pret_final = processedInputInfo4.total + processedInputInfo5.montaj;
    return (
      Math.round(
        (pret_final * 0.03 + (pret_final - pret_final * 0.03) * 0.05) * 100
      ) / 100
    );
  };

  const handleCalculRamasi = () => {
    const total_costuri =
      processedInputInfo.costuri_structura_carcase +
      processedInputInfo.costuri_fronturi +
      parseFloat(inputPrice.accesorii) +
      processedInputInfo2.fitinguri +
      processedInputInfo3.proc_mastermob +
      parseFloat(inputPrice.extra) / MULTIPLICATOR_CARCASE +
      processedInputInfo6.proc_partener;
    return (
      Math.round((processedInputInfo6.pret_final - total_costuri) * 100) / 100
    );
  };

  const handleCalculProcentPartener = () => {
    return (
      Math.round(
        (processedInputInfo4.total + processedInputInfo5.montaj) *
          (parseInt(inputPrice.procent) / 100) *
          100
      ) / 100
    );
  };

  const handleCalculPretFinal = () => {
    return (
      Math.round(
        (processedInputInfo4.total + processedInputInfo5.montaj) * 100
      ) / 100
    );
  };

  const handleCalculProfit = () => {
    const bani_ramasi = handleCalculRamasi();
    return Math.round((bani_ramasi - processedInputInfo6.taxe) * 100) / 100;
  };

  const handleCalculProcentProfit = () => {
    const profit = handleCalculProfit();
    return (
      Math.round(((profit * 100) / processedInputInfo6.pret_final) * 100) / 100
    );
  };

  //Process initial info from inputPrice
  useEffect(() => {
    setProcessedInputInfo({
      ...processedInputInfo,
      //calcul pret carcasa
      costuri_structura_carcase: handleCalculStructura(),
      //Calcul accesorii
      accesorii: handleCostAccesorii(),
      //Calcul nr placi carcase
      nr_placi: handleNrPlaci(),
      //Calcul pret fronturi
      fronturi: handleCalculFronturi(),
      // Calcul costuri fronturi
      costuri_fronturi: handleCalculCosturiFronturi(),
      //Calcul nr placi front
      nr_placi_front: handleNrPlaciFront(),
    });
  }, [update, inputPrice, cantChecked, cantFronturiChecked, accesoriiChecked, tipVopsit]);

  //Update fitings in real time based on prior processedInfo, processed info stage 2 - fitinguri
  useEffect(() => {
    setProcessedInputInfo2({
      ...processedInputInfo2,
      fitinguri: handleCalculFitinguri(),
    });
  }, [update, processedInputInfo]);

  //Processed info stage 3 - calcul carcase, cost proiectare, calcul mastermob

  useEffect(() => {
    setProcessedInputInfo3({
      ...processedInputInfo3,
      //Calcul carcase
      carcase: handleCalculCarcase(),
      //Calcul proiectare
      proiectare: handleCostProiectare(),
      //Calcul 15%
      proc_mastermob: handleCalculMastermob(),
    });
  }, [update, processedInputInfo2]);

  //calculate total
  useEffect(() => {
    setProcessedInputInfo4({
      ...processedInputInfo4,
      //Calcul total
      total: handleCalculTotal(),
    });
  }, [update, processedInputInfo3]);

  //calcul montaj
  useEffect(() => {
    setProcessedInputInfo5({
      ...processedInputInfo5,
      //Calcul montaj
      montaj: handleCalculMontaj(),
    });
  }, [update, processedInputInfo4]);

  //calcul pret final, taxe, procent partener
  useEffect(() => {
    setProcessedInputInfo6({
      ...processedInputInfo6,
      //Calcul pret final
      pret_final: handleCalculPretFinal(),
      //Calcul procent partener
      proc_partener: handleCalculProcentPartener(),
      //Calcul taxe
      taxe: handleCalculTaxe(),
    });
  }, [update, processedInputInfo5]);

  //calcul total costuri & bani ramasi
  useEffect(() => {
    setProcessedInputInfo7({
      ...processedInputInfo7,
      //Calcul costuri
      costuri: handleCalculCosturi(),
      //Calcul bani ramasi
      bani_ramasi: handleCalculRamasi(),
      //Calcul profit
      profit: handleCalculProfit(),
      //Calcult procent profit
      proc_profit: handleCalculProcentProfit(),
    });
  }, [update, processedInputInfo6]);

  return (
    <div className="priceGenerator">
      <div className="priceGeneratorWrapper">
        <h4>Price Generator</h4>

        <div className="priceGeneratorContent">
          <div className="priceGeneratorItemsLeft">
            <div className="selectRoomType">
              <ul>
                <li
                  className={`itemCard ${
                    selectedRoom === "kitchen" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("kitchen")}
                >
                  <Kitchen /> Kitchen
                </li>
                <li
                  className={`itemCard ${
                    selectedRoom === "living" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("living")}
                >
                  <Chair /> Living
                </li>
                <li
                  className={`itemCard ${
                    selectedRoom === "bathroom" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("bathroom")}
                >
                  <Bathtub />
                  Bathroom
                </li>
                <li
                  className={`itemCard ${
                    selectedRoom === "bedroom" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("bedroom")}
                >
                  <KingBed /> Bedroom
                </li>
                <li
                  className={`itemCard ${
                    selectedRoom === "office" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("office")}
                >
                  <Desk /> Office
                </li>
                <li
                  className={`itemCard ${
                    selectedRoom === "hallway" ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("hallway")}
                >
                  <MeetingRoom /> Hallway
                </li>
              </ul>

              {selectedRoom && (
                <div className="generateMaterials">
                  <GenerateMaterials room={selectedRoom} />
                </div>
              )}
            </div>

            <div className="priceInputArea">
              <div className="priceInputAreaLeft">
                <div className="inputItem">
                  <ul className="inputItemWrapper">
                    <h4>Carcase:</h4>
                    <li className="inputItemSubitem">
                      <span>mp:</span>{" "}
                      <input
                        name="mp_carcasa"
                        type="text"
                        value={inputPrice.mp_carcasa}
                        onChange={handleInput}
                      />{" "}
                      <h4>placi: {processedInputInfo.nr_placi}</h4>
                    </li>
                    <li className="inputItemSubitem">
                      <span>mp/placa:</span>{" "}
                      <input
                        name="mp_placa_carcasa"
                        type="text"
                        value={inputPrice.mp_placa_carcasa}
                        onChange={handleInput}
                      />
                    </li>
                    <li className="inputItemSubitem">
                      <span>pret placa:</span>{" "}
                      <input
                        name="pret_placa"
                        type="text"
                        value={inputPrice.pret_placa}
                        onChange={handleInput}
                      />
                    </li>
                    <li className="inputItemSubitem">
                      <span>pret cant:</span>{" "}
                      <input
                        name="pret_cant"
                        type="text"
                        value={inputPrice.pret_cant}
                        onChange={handleInput}
                      />{" "}
                      <Checkbox
                        checked={cantChecked}
                        onClick={handleCantCheckBox}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      />
                      use %{" "}
                    </li>
                  </ul>
                </div>
                <div className="inputItem">
                  <ul className="inputItemWrapper">
                    <div className="accesoriiHeader">
                      <h4>Accesorii:</h4>
                      <div>
                        <Checkbox
                          checked={accesoriiChecked}
                          onClick={handleAccesoriiChecked}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                        />{" "}
                        adauga manual{" "}
                      </div>
                    </div>
                    {accesoriiChecked && (
                      <>

                        {accesoriiArray.map((item, index) => (
                          <li className="inputItemSubitem" key={index}>
                          <span>{item}:</span>{" "}
                          <input
                            name={item}
                            type="text"
                            value={inputPrice.item}
                            onChange={handleInputAccesorii}
                          />
                        </li>
                        ))}
                        
                      

                        <li className="inputItemSubitem" style={{marginTop: "25px"}}>
                          <span>cost total:</span>{" "}
                          <input
                            name="accesorii"
                            type="text"
                            value={inputPrice.accesorii}
                            onChange={handleInputAccesorii}
                          />
                        </li>
                      </>
                    )}

                    {!accesoriiChecked && (
                      <li className="inputItemSubitem">
                        <span>cost total:</span>{" "}
                        <input
                          name="accesorii"
                          type="text"
                          value={inputPrice.accesorii}
                          onChange={handleInput}
                        />
                      </li>
                    )}

                    <li className="inputItemSubitem">
                      <span>procent: </span>{" "}
                      <input
                        name="proc_accesorii"
                        type="text"
                        value={inputPrice.proc_accesorii}
                        onChange={handleInput}
                      />
                    </li>
                  </ul>
                </div>
                <div className="inputItem">
                  <ul className="inputItemWrapper">
                    <h4>Extra:</h4>
                    <li className="inputItemSubitem">
                      <span>costuri:</span>{" "}
                      <input
                        name="extra"
                        type="text"
                        value={inputPrice.extra}
                        onChange={handleInput}
                      />
                    </li>
                    <li className="inputItemSubitem"></li>
                    <li className="inputItemSubitem">
                      <span>% partener:</span>{" "}
                      <input
                        name="procent"
                        type="text"
                        value={inputPrice.procent}
                        onChange={handleInput}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="priceInputAreaRight">
                <div className="inputItem">
                  <ul className="inputItemWrapper">
                    <h4>Fronturi:</h4>
                    <li className="inputItemSubitem">
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">tip</InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={tipFront}
                          label="Front"
                          onChange={handleCheckFront}
                        >
                          <MenuItem value={"vopsit"}>vopsit</MenuItem>
                          <MenuItem value={"pal/mdf"}>pal/mdf</MenuItem>
                        </Select>
                      </FormControl>
                    </li>
                    {tipFront === "vopsit" && (
                      <li className="inputItemSubitem">
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            tip vopsit
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={tipVopsit}
                            onChange={handleTipVopsit}
                          >
                            <FormControlLabel
                              value="basic"
                              control={<Radio size="small" />}
                              label="basic"
                            />
                            <FormControlLabel
                              value="medium"
                              control={<Radio size="small" />}
                              label="medium"
                            />
                            <FormControlLabel
                              value="high"
                              control={<Radio size="small" />}
                              label="high"
                            />
                          </RadioGroup>
                        </FormControl>
                      </li>
                    )}
                    <li className="inputItemSubitem">
                      <span>mp:</span>{" "}
                      <input
                        name="mp_front"
                        type="text"
                        value={inputPrice.mp_front}
                        onChange={handleInput}
                      />
                    </li>
                    {tipFront === "pal/mdf" && (
                      <>
                        <li className="inputItemSubitem">
                          <span>mp/placa:</span>{" "}
                          <input
                            name="mp_placa_front"
                            type="text"
                            value={inputPrice.mp_placa_front}
                            onChange={handleInput}
                          />{" "}
                          <h4>placi: {processedInputInfo.nr_placi_front}</h4>
                        </li>
                        <li className="inputItemSubitem">
                          <span>pret placa:</span>{" "}
                          <input
                            name="pret_placa_front"
                            type="text"
                            value={inputPrice.pret_placa_front}
                            onChange={handleInput}
                          />
                        </li>
                        <li className="inputItemSubitem">
                          <span>pret cant:</span>{" "}
                          <input
                            name="pret_cant_fronturi"
                            type="text"
                            value={inputPrice.pret_cant_fronturi}
                            onChange={handleInput}
                          />{" "}
                          <Checkbox
                            checked={cantFronturiChecked}
                            onClick={handleCantFronturiCheckBox}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                          />
                          use %{" "}
                        </li>
                      </>
                    )}
                    {tipFront === "vopsit" && (
                      <li className="inputItemSubitem">
                        <span>cost vopsea</span>{" "}
                        <input
                          name="vopsea"
                          type="text"
                          value={inputPrice.vopsea}
                          onChange={handleInput}
                        />
                      </li>
                    )}
                  </ul>
                </div>
                <div className="inputItem">
                  <ul className="inputItemWrapper">
                    <h4>Montaj & transport:</h4>
                    <li className="inputItemSubitem">
                      <span>% montaj:</span>{" "}
                      <input
                        name="procent_montaj"
                        type="text"
                        value={inputPrice.procent_montaj}
                        onChange={handleInput}
                      />
                    </li>
                    <li className="inputItemSubitem">
                      <span>transport:</span>{" "}
                      <input
                        name="cost_transport"
                        type="text"
                        value={inputPrice.cost_transport}
                        onChange={handleInput}
                      />
                    </li>
                  </ul>
                </div>
                <div className="update">
                  <button onClick={handleUpdate}>Update</button>
                </div>
              </div>
            </div>
          </div>
          <div className="priceGeneratorItemsRight">
            <div className="priceProcessedArea">
              <ul className="processedCard">
                <div className="processedCardLeft">
                  <li className="processedCardItem">
                    <ul className="processedCardItemRows">
                      <h4>Calcule materiale si accesorii:</h4>
                      <li>
                        <span>
                          Fitinguri:<h6>*5% din carcase + accesorii</h6>
                        </span>
                        {processedInputInfo2.fitinguri}{" "}
                      </li>

                      <li>
                        <span>
                          Accesorii:<h6>cost accesorii + 30%</h6>
                        </span>
                        {processedInputInfo.accesorii}
                      </li>

                      <li>
                        <span>
                          Proiectare:
                          <h6>(carcase + cost accesorii + fitinguri) * 15%</h6>
                        </span>
                        {processedInputInfo3.proiectare}{" "}
                      </li>
                      <li>
                        <span>
                          Carcase:<h6>pret final carcase + fitinguri</h6>
                        </span>
                        {processedInputInfo3.carcase}{" "}
                      </li>
                      <li>
                        <span>
                          Fronturi:
                          <h6>2.5 x cost pal/mdf sau cost final vopsire</h6>
                        </span>
                        {processedInputInfo.fronturi}{" "}
                      </li>
                    </ul>
                  </li>
                  <li className="processedCardItem">
                    <ul className="processedCardItemRows">
                      <h4>Totaluri:</h4>
                      <li>
                        <span>
                          Total: <h6>materiale + manopera</h6>{" "}
                        </span>
                        {processedInputInfo4.total}{" "}
                      </li>
                      <li>
                        <span>
                          Montaj: <h6>calculat ca % din cost total</h6>{" "}
                        </span>
                        {processedInputInfo5.montaj}
                      </li>
                      <li>
                        <span>
                          Pret final:{" "}
                          <h6>pret total + montaj, fara transport</h6>{" "}
                        </span>
                        {Math.round(
                          processedInputInfo6.pret_final +
                            processedInputInfo6.proc_partener
                        )}{" "}
                      </li>
                    </ul>
                  </li>
                </div>
                <div className="processedCardRight">
                  <li className="processedCardItem profit">
                    <ul className="processedCardItemRows">
                      <h4>Profit:</h4>
                      <li>
                        <span>
                          Ramasi: <h6>pret final - costuri</h6>{" "}
                        </span>
                        {processedInputInfo7.bani_ramasi}
                      </li>
                      <li>
                        <span>
                          Taxe: <h6>impozit 3%, dividente 5%</h6>{" "}
                        </span>
                        {processedInputInfo6.taxe}
                      </li>
                      <li>
                        <span>
                          Profit: <h6>profitul net</h6>{" "}
                        </span>
                        {processedInputInfo7.profit}
                      </li>
                      <li>
                        <span>
                          Procent profit: <h6>% profit din pretul final</h6>{" "}
                        </span>
                        {processedInputInfo7.proc_profit}
                      </li>
                    </ul>
                  </li>
                  <li className="processedCardItem costuri">
                    <ul className="processedCardItemRows">
                      <h4>Costuri:</h4>

                      <li>
                        <span>
                          PAL/MDF carcase:<h6>placi pal/mdf + cant</h6>
                        </span>
                        {processedInputInfo.costuri_structura_carcase}
                      </li>
                      <li>
                        <span>
                          Fronturi:<h6>cost pal/mdf + cant sau mdf + vopsea</h6>
                        </span>
                        {Math.round(processedInputInfo.costuri_fronturi*100)/100}
                      </li>
                      <li>
                        <span>
                          Accesorii:<h6>cost achizitie accesorii</h6>
                        </span>
                        {parseInt(inputPrice.accesorii)}
                      </li>
                      <li>
                        <span>
                          20% Mastermob:
                          <h6>(carcase + fronturi + fitinguri) * 20%</h6>
                        </span>
                        {processedInputInfo3.proc_mastermob}{" "}
                      </li>
                      <li>
                        <span>
                          Procent partener:
                          <h6>suma datorata partenerului de proiect</h6>
                        </span>
                        {processedInputInfo6.proc_partener}
                      </li>
                      <li>
                        <span>
                          Extra:<h6>orice nu intra la celelalte categorii</h6>
                        </span>
                        {parseFloat(inputPrice.extra) / MULTIPLICATOR_CARCASE}
                      </li>
                      <li>
                        <span>
                          Cost transport:<h6>suma datorata pentru transport</h6>
                        </span>
                        {parseFloat(inputPrice.cost_transport)}
                      </li>
                      <li>
                        <span>
                          Cost total:<h6>cost productie + comisioane</h6>
                        </span>
                        {processedInputInfo7.costuri}
                      </li>
                    </ul>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
