export const data = [
  {
    name: "Week1",
    openTasks: 14,
    closedTasks: 12,
    amt: 2400,
  },
  {
    name: "Week2",
    openTasks: 12,
    closedTasks: 6,
    amt: 2210,
  },
  {
    name: "Week3",
    openTasks: 5,
    closedTasks: 7,
    amt: 2290,
  },
  {
    name: "Week4",
    openTasks: 8,
    closedTasks: 14,
    amt: 2000,
  },
  {
    name: "Week5",
    openTasks: 16,
    closedTasks: 12,
    amt: 2181,
  },
  {
    name: "Week6",
    openTasks: 13,
    closedTasks: 8,
    amt: 2500,
  },
  {
    name: "Week7",
    openTasks: 10,
    closedTasks: 4,
    amt: 2100,
  },
];

export const dataP = [
  {
    name: "Jan",
    projectsSigned: 2,
    projectsCompleted: 1,
    amt: 2400,
  },
  {
    name: "Feb",
    projectsSigned: 1,
    projectsCompleted: 0,
    amt: 2400,
  },
  {
    name: "Mar",
    projectsSigned: 1,
    projectsCompleted: 1,
    amt: 2400,
  },
  {
    name: "Apr",
    projectsSigned: 2,
    projectsCompleted: 1,
    amt: 2400,
  },
  {
    name: "May",
    projectsSigned: 2,
    projectsCompleted: 2,
    amt: 2400,
  },
  {
    name: "Jun",
    projectsSigned: 1,
    projectsCompleted: 1,
    amt: 2400,
  },
  {
    name: "Jul",
    projectsSigned: 1,
    projectsCompleted: 0,
    amt: 2400,
  },
  {
    name: "Aug",
    projectsSigned: 0,
    projectsCompleted: 1,
    amt: 2400,
  },
  {
    name: "Sep",
    projectsSigned: 0,
    projectsCompleted: 0,
    amt: 2400,
  },
  {
    name: "Oct",
    projectsSigned: 1,
    projectsCompleted: 2,
    amt: 2400,
  },
  {
    name: "Nov",
    projectsSigned: 4,
    projectsCompleted: 2,
    amt: 2400,
  },
  {
    name: "Dec",
    projectsSigned: 5,
    projectsCompleted: 2,
    amt: 2400,
  },
];

export const dataRadar = [
  {
    subject: "Design",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Proiectare",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Debitare",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Cantuire",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Gaurire",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Montaj",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export const dataRadarProjects = [
  {
    subject: "Bucatarie",
    A: 12,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Living",
    A: 8,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Dormitor",
    A: 16,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Birou",
    A: 15,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Hol",
    A: 2,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Baie",
    A: 7,
    B: 85,
    fullMark: 150,
  },
];

export const tasksRows = [
  {
    id: 1,
    project: "KRBS0001",
    task: "Debitare furnir riflaj living",
    assignedTo: "George Petre",
    startedAt: "22/10/2022",
    deadline: "29/10/2022",
    progress: 43,
    status: "ontrack",
  },
  {
    id: 2,
    project: "KRBS0001",
    task: "Cantuire furnir riflaj living",
    assignedTo: "Banila Claudiu",
    startedAt: "22/10/2022",
    deadline: "29/10/2022",
    progress: 0,
    status: "delayed",
  },
];

export const projectsRows = [
  {
    id: 1,
    project: "KRBS0001",
    summary: "Riflaje 90mp tavan living",
    priority: "normal",
    startedAt: "22/10/2022",
    deadline: "22/11/2022",
    progress: 43,
    stage: "cantuire",
    status: "ontrack",
    step: "open",
  },
  {
    id: 2,
    project: "KRBS0002",
    summary: "Dulapuri hol & corp sertare",
    priority: "normal",
    startedAt: "22/10/2022",
    deadline: "22/11/2022",
    progress: 20,
    stage: "debitare",
    status: "ontrack",
    step: "completed",
  },
  {
    id: 3,
    project: "KRBS0003",
    summary: "Anvelopa bucatarie furnir",
    priority: "normal",
    startedAt: "22/09/2022",
    deadline: "22/10/2022",
    progress: 80,
    stage: "vopsire",
    status: "delayed",
    step: "completed",
  },
  {
    id: 4,
    project: "KRBS0004",
    summary: "Fronturi furnir insula bucatarie",
    priority: "normal",
    startedAt: "12/09/2022",
    deadline: "12/10/2022",
    progress: 90,
    stage: "vopsire",
    status: "breached",
    step: "open",
  },
];

export const tasks = [
  {
    id: 1,
    summary: "Vopsitorie - baituire",
    department: "vopsitorie",
    asignee: "pgeorge",
    duedate: "Nov 22",
    priority: "normal",
    stage: "todo",
  },
  {
    id: 2,
    summary: "Vopsitorie - lacuire",
    department: "vopsitorie",
    asignee: "pgeorge",
    duedate: "Nov 22",
    priority: "normal",
    stage: "todo",
  },
  {
    id: 3,
    summary: "Vopsitorie - slefuire",
    department: "vopsitorie",
    asignee: "pgeorge",
    duedate: "Nov 21",
    priority: "normal",
    stage: "inprogress",
  },
  {
    id: 4,
    summary: "Debitare ",
    department: "debitare",
    asignee: "bmihai",
    duedate: "Nov 20",
    priority: "normal",
    stage: "completed",
  },
  {
    id: 5,
    summary: "Cantuire ",
    department: "cantuire",
    asignee: "bmihai",
    duedate: "Nov 20",
    priority: "normal",
    stage: "completed",
  },
  {
    id: 6,
    summary: "Gaurire dulapuri hol + bucatarie",
    department: "gaurire",
    asignee: "pgeorge",
    duedate: "Oct 31",
    priority: "normal",
    stage: "completed",
  },
  {
    id: 7,
    summary: "Debitare dulapuri hol + bucatarie",
    department: "debitare",
    asignee: "pgeorge",
    duedate: "Oct 31",
    priority: "normal",
    stage: "completed",
  },
];

export const activities = [
  {
    id: 1,
    summary: "Comanda PAL Egger Bardolino",
    asignee: "MB",
    priority: "high",
    stage: "in progress",
    attach: "true",
    comment: "true",
  },
  {
    id: 2,
    summary: "Proiectare KRBS0003",
    asignee: "MB",
    priority: "high",
    stage: "in progress",
    attach: "false",
    comment: "true",
  },
  {
    id: 3,
    summary: "Comanda vopsea proiect KRBS0003",
    asignee: "GP",
    priority: "medium",
    stage: "completed",
    attach: "true",
    comment: "false",
  },
  {
    id: 4,
    summary: "Montare burghiu 6mm CNC",
    asignee: "MB",
    priority: "medium",
    stage: "in progress",
    attach: "false",
    comment: "false",
  },
  {
    id: 5,
    summary: "Facem si noi biroul ala?",
    asignee: ["GP", "MB"],
    priority: "high",
    stage: "overdue",
    attach: "true",
    comment: "false",
  },
  {
    id: 6,
    summary: "Implementare adaugare activitati automat",
    asignee: "GP",
    priority: "low",
    stage: "assigned",
    attach: "false",
    comment: "false",
  },
];

export const progress = [
  { id: 1, stage: "Open", date: "04/06/2022", status: "passed" },
  { id: 2, stage: "Ofertare", date: "14/06/2022", status: "passed" },
  { id: 3, stage: "Acceptare", date: "20/06/2022", status: "passed" },
  { id: 4, stage: "Avans achitat", date: "04/07/2022", status: "passed" },
  { id: 5, stage: "Proiectare", date: "24/07/2022", status: "current" },
  { id: 6, stage: "Comanda materiale", date: "01/08/2022", status: "waiting" },
  { id: 7, stage: "Productie", date: "14/08/2022", status: "waiting" },
  { id: 8, stage: "Livrare", date: "14/09/2022", status: "waiting" },
  { id: 9, stage: "Montaj", date: "14/10/2022", status: "waiting" },
  { id: 10, stage: "Closed", date: "", status: "waiting" },
];

export const tasksList = [
  {
    id: 1,
    summary: "Gaurire dulapuri hol + bucatarie",
    duedate: "31/10/2022",
    asignee: "pgeorge",
  },
  {
    id: 2,
    summary: "Debitare dulapuri hol + bucatarie",
    duedate: "23/10/2022",
    asignee: "pgeorge",
  },
];

export const offerItems = [
  {
    id: 1,
    title: "Bucatarie U + hol MDF furniruit",
    details: [
      "Fronturi MDF vopsit RAL7022/RAL9016",
      "Cadre din MDF standard",
      "Balamale soft close reglabile SAMET",
      "Butoni Zara Home",
      "Sertare Blum Tandembox Antaro",
      "Corp colt ikea UTRUSTA 128cm",
      "Picurator 900mm 2 niveluri HAFELE",
      "Jolly corp inalt 7 cosuri",
      "Picioare bucatarie HAFELE",
      "Jolly corp baza HAFELE",
    ],
    pending: [
      "tip MDF cadre",
      "alegere feronerie",
      "alegere jolly cuptor",
      "amplasare intrerupatoare LED",
      "accesoriu colt IKEA sau alt producator",
      "directie fibra placaj bar",
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668350470/kribstudio/Ofertari/TRS%20/bucatarie1_sxr8rq.png",
    remarks: [
      "Blatul nu este inclus",
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
    ],
    price: "45674",
  },
  {
    id: 2,
    title: "Biblioteca 1 Gri",
    details: [
      "Fronturi MDF vopsit RAL7022 umbra grey",
      "Structura MDF vopsit RAL7022",
    ],
    pending: [
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668354419/kribstudio/Ofertari/TRS%20/biblioteca_1_spnfo8.png",
    remarks: [
      "Mutarea prizelor inclusa in pret",
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "8665",
  },
  {
    id: 3,
    title: "Biblioteca 2 arcade",
    details: [
      "Fronturi MDF vopsit RAL9016 traffic white",
      "Structura PAL EGGER W1100 ST9",
      "Balamale SAMET soft close reglabile",
      "Butoni Zara Home"
    ],
    pending: [
      "amplasare intrerupatoare LED",
      "optiune balamale HAFELE/BLUM",
      
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668354977/kribstudio/Ofertari/TRS%20/Biblioteca_2_-_cu_arcade_bx4xj1.png",
    remarks: [
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "9380",
  },
  {
    id: 5,
    title: "Dulap dormitor",
    details: [
      "Fronturi MDF vopsit RAL9016 traffic white",
      "Structura PAL EGGER W1100 ST9",
      "Balamale SAMET soft close reglabile",
      "Butoni Zara Home",
      "Sertare Blum soft close"
    ],
    pending: [
      "optiune balamale HAFELE/BLUM",
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668355279/kribstudio/Ofertari/TRS%20/dulap_dormitor_oak0a7.png",
    remarks: [
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "15345",
  },
  {
    id: 6,
    title: "Masca distribuitor",
    details: [
      "Fronturi MDF vopsit RAL9016 traffic white",
      "Structura PAL EGGER W1100 ST9",
      "Balamale SAMET soft close reglabile",
      "Butoni Zara Home",
      "Sertare Blum soft close"
    ],
    pending: [
      "optiune balamale HAFELE/BLUM",
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668354977/kribstudio/Ofertari/TRS%20/Biblioteca_2_-_cu_arcade_bx4xj1.png",
    remarks: [
      "Blatul nu este inclus in pret",
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "1645",
  },
  {
    id: 7,
    title: "Dulap hol fronturi riflate",
    details: [
      "Fronturi MDF vopsit RAL9016 traffic white",
      "Structura PAL EGGER W1100 ST9",
      "Balamale SAMET soft close reglabile",
      "Butoni Zara Home",
    ],
    pending: [
      "optiune benzi metalice cu efect de oglinda",
      "optiune balamale HAFELE/BLUM",
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668355942/kribstudio/Ofertari/TRS%20/dulap_hol_wxhfhd.png",
    remarks: [
      "efectul de oglinda nu este inclus in pret",
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "15700",
  },
  {
    id: 8,
    title: "Masuta machiaj dormitor",
    details: [
      "Fronturi HPL imitatie marmura",
      "Structura PAL EGGER W1100 ST9",
      "Sertare Blum soft close"
    ],
    pending: [
      "optiune balamale HAFELE/BLUM",
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668357159/kribstudio/Ofertari/TRS%20/masuta_machiar_xlhv6l.png",
    remarks: [
      "picioarele nu sunt incluse in pret - se poate obtine oferta",
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "5660",
  },
  {
    id: 9,
    title: "Oglinda dormitor",
    details: [
      "Suport MDF",
      "Rama MDF vopsit auriu",
    ],
    pending: [
      "acord solutie productie",
      "optiune rama metalica vopsita metalic"
      
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668357159/kribstudio/Ofertari/TRS%20/masuta_machiar_xlhv6l.png",
    remarks: [
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "4230",
  },
  {
    id: 10,
    title: "Placare perete TV",
    details: [
      "placare MDF cu aspect si finisaj metalic",
     
    ],
    pending: [
      "acord solutie productie",
      "nu se poate pune o placa intreaga la dimensiunea de 346cm, lungimea maxima este de 2785mm"
      
    ],
    picture:
      "https://res.cloudinary.com/dydivylgi/image/upload/v1668357481/kribstudio/Ofertari/TRS%20/placare_tv_jorkom.png",
    remarks: [
      "pretul unei placi este foarte ridicat deoarece este laminata cu metal in culoare aurie",
      "exista si variante mai ieftine, pot fi explorate diferite optiuni",
      "Transportul se calculeaza pentru toate obiectele",
      "Montajul este inclus in pret",
      
    ],
    price: "7180",
  },


  
];
