import React, { useState } from 'react';
import ChatHeadings from './chatbots';
import Questionnare from './questionnare';
import { Outlet } from 'react-router-dom';

type ButtonProps = {
  name: string;
  page: number;
  tabChange: (page: number) => void;
  currPage: number,
};

const styles = {
  navbar: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-evenly',
    position: 'relative' as const,
    alignItems: 'center',
    padding: '10px 0',
    gap: '10px',
    left: '0',
  },
  tabButton: {
    backgroundColor: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4A90E2',
    transition: 'background 0.3s',
  },
  tabButtonActive: {
    backgroundColor: '#336699',
    color: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#e0eeff',
  },
  title: {
    color: 'black',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'space-around',
    height: '100%',
    borderRadius: '10px',
  },
};

const Profile = () => <h2>This is the Profile Page</h2>;

const Tab = ({ name, page, tabChange, currPage }: ButtonProps) => {
  return (
    <button
      style={{
        ...styles.tabButton,
        ...(page===currPage ? styles.tabButtonActive: {}),
      }}
      onClick={() => tabChange(page)}
    >
      {name}
    </button>
  );
};

const Tabs = ({ name, page, tabChange, currPage }: ButtonProps) => {
  return (
    <div style={styles.navbar}>
      <Tab name='Chatbot' page={0} tabChange={tabChange} currPage={currPage} />
      <Tab name='Questionnaire' page={1} tabChange={tabChange} currPage={currPage} />
      <Tab name='Summary' page={2} tabChange={tabChange} currPage={currPage} />
    </div>
  );
};

const Content = () => {
  const [onPage, isOnPage] = useState<number>(0);
  const handleTabChange = (page: number) => {
    isOnPage(page);
  };

  const renderBody = () => {
    switch (onPage) {
      case 1:
        return <Questionnare />;
      case 2:
        return <Profile />;
      default:
        return <ChatHeadings />;
    }
  };

  return (
    <div style={styles.contentContainer}>
      <Tabs name='Chatbot' tabChange={handleTabChange} page={onPage} currPage={onPage} />
      {renderBody()}
    </div>
  );
};

const Homepage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AP Physics</h1>
      <Outlet />
    </div>
  );
};

export default Homepage;
