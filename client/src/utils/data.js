import nasimImg from "../images/nasim.jpg";
import sabbirImg from "../images/sabbir.jpg";
import tuhinImg from "../images/tuhin.jpg";
import hasanImg from "../images/hasan.jpg";

export const messages = [
  {
    id: 1,
    sender: "sabbir",
    receiver: "emon",
    message: "Hello Emon . How are you?",
  },
  {
    id: 2,
    sender: "emon",
    receiver: "sabbir",
    message: "Hi sabbir.I am fine.what about you?",
  },
  {
    id: 3,
    sender: "sabbir",
    receiver: "emon",
    message: "Ajke bikal e khelbi?",
  },
  {
    id: 4,
    sender: "emon",
    receiver: "sabbir",
    message: "Ki khela?Free fire, naki cricket?",
  },
  {
    id: 5,
    sender: "sabbir",
    receiver: "emon",
    message: "Aree cricket.",
  },
  {
    id: 6,
    sender: "emon",
    receiver: "sabbir",
    message: "Ooh. Khelbo. ay somir k niya asis.",
  },
  {
    id: 7,
    sender: "sabbir",
    receiver: "emon",
    message: "ok.",
  },
  {
    id: 8,
    sender: "emon",
    receiver: "sabbir",
    message: "Ooh. Khelo. ay somir k niya asis.",
  },
  {
    id: 9,
    sender: "sabbir",
    receiver: "emon",
    message: "ok.",
  },
  {
    id: 10,
    sender: "emon",
    receiver: "sabbir",
    message: "Ooh. Khelo. ay somir k niya asis.",
  },
  {
    id: 11,
    sender: "sabbir",
    receiver: "emon",
    message: "ok.",
  },
  {
    id: 12,
    sender: "sabbir",
    receiver: "emon",
    message: "ok.",
  },
  {
    id: 13,
    sender: "emon",
    receiver: "sabbir",
    message: "Ooh. Khelo. ay somir k niya asis.",
  },
  {
    id: 14,
    sender: "sabbir",
    receiver: "emon",
    message: "ok.",
  },
  {
    id: 15,
    sender: "emon",
    receiver: "sabbir",
    message: "Aj to kew barite nai, kivabe khelbi?",
  },
  {
    id: 16,
    sender: "sabbir",
    receiver: "emon",
    message: "sobay koi geche?",
  },
];

{
  /* <div className="single-contact w-full h-[70px]  flex items-center justify-around p-1 bg-slate-200">
  <div className="avatar w-[50px] h-[50px]  rounded-full flex-shrink-0 relative">
    <img src={sabbirImg} alt="" className="rounded-full" />
    <div className="online-logo w-[15px] h-[15px] bg-green-500 rounded-full absolute bottom-[2px] right-[2px] border-2 border-white"></div>
  </div>
  <div className="name ml-[-20px] ">
    <h1>Sabbir</h1>
    <p className="overflow-hidden ">
      you: <span className="">hi sabbir.</span>
    </p>
  </div>
  <p className="mt-[25px] mr-[20px]">Fri</p>
  <div className="flex flex-col items-center justify-center gap-2">
    <div>12:44</div>
    <div className="w-[20px] h-[20px]">
      <TikIcon />
    </div>
  </div>
</div>; */
}

export const singleContact = [
  {
    name: "Sabbir",
    image: sabbirImg,
    status: "online",
    lastMessage: {
      sender: "you",
      text: "Hi Sabbir",
      messageStatus: "delevered",
      sentOnTime: "12:50",
      sentOnDay: "Fri",
    },
  },
  {
    name: "Nasim",
    image: nasimImg,
    status: "offline",
    lastMessage: {
      sender: "other",
      text: "Kemon asos",
      messageStatus: "sent",
      sentOnTime: "3:20",
      sentOnDay: "Sat",
    },
  },
  {
    name: "Tuhin",
    image: sabbirImg,
    status: "online",
    lastMessage: {
      sender: "you",
      text: "skhelbi?",
      messageStatus: "seen",
      sentOnTime: "4:20",
      sentOnDay: "sun",
    },
  },
  {
    name: "Hasan",
    image: hasanImg,
    status: "online",
    lastMessage: {
      sender: "other",
      text: "gelam ree",
      messageStatus: "sent",
      sentOnTime: "4:00",
      sentOnDay: "wed",
    },
  },
];
