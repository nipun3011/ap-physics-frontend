import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import QuizIcon from '@mui/icons-material/Quiz';
import SummarizeIcon from '@mui/icons-material/Summarize';
import '../index.css';
import Navbar from '../components/Navbar';

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
          <ForumIcon fontSize='large' />
        );
      case "Questionnaire":
        return (<QuizIcon fontSize='large' />);
      default:
        return (<SummarizeIcon fontSize='large' />);
    }
  };
  return (
    <NavLink
      className={({ isActive }) => { return isActive ? "tabButtonActive" : "tabButton" }}
      to={`/${name.toLowerCase()}`}
    >
      {renderBody()}
    </NavLink>
  );
};

const Tabs = ({ name, page, currPage }: ButtonProps) => {
  return (
    <div className='tabs'>
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
    <div className="mainContainer">
      <Navbar />
      <div className='contentContainer'>
        <Tabs name='Chatbot' page={onPage} currPage={onPage} />
        <div className="blueBox">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
