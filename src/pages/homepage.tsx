import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { TbCardsFilled } from "react-icons/tb";
import { RiRobot3Fill,RiQuestionnaireFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import '../index.css';

type ButtonProps = {
  name: string;
  page: number;
  currPage: number,
};


const Tab = ({ name, page, currPage }: ButtonProps) => {
  const renderBody = () => {
    switch (name) {
      case "Chats":
        return (
          <IconContext.Provider value={{size: "2.3em" }}>
            <RiRobot3Fill className='icons'/>
          </IconContext.Provider>
        );
      case "Questionnaire":
        return(<IconContext.Provider value={{size: "2.5em" }}>
          <RiQuestionnaireFill className='icons'/>
        </IconContext.Provider>) ;
      default:
        return(<IconContext.Provider value={{size: "2.5em" }}>
          <TbCardsFilled className='icons'/>
        </IconContext.Provider>);
    }
  };
  return (
    <NavLink
      className={({isActive})=>{return isActive? "tabButtonActive" : "tabButton"}}
      to={`/${name.toLowerCase()}`}
    >
      {renderBody()}
    </NavLink>
  );
};

const Tabs = ({ name, page, currPage }: ButtonProps) => {
  return (
    <div className='navbar'>
      <Tab name='Chats' page={0} currPage={currPage} />
      <Tab name='Questionnaire' page={1} currPage={currPage} />
      <Tab name='Summary' page={2} currPage={currPage} />
    </div>
  );
};

const Homepage = () => {
  const [onPage, isOnPage] = useState<number>(0);
  const handleTabChange = (page: number) => {
    isOnPage(page);
  };

  

  return (
    <div className="contentContainer">
      <Tabs name='Chatbot' page={onPage} currPage={onPage} />
      <div className="blueBox">
        <Outlet/>
      </div>
    </div>
  );
};

export default Homepage;
