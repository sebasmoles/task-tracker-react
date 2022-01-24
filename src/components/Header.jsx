import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
 
const Header = ({ title, showAdd, toggleAddTask }) => {
    return (
        <header className='header'>
            <h1>{ title }</h1>
            <Button color={showAdd ? 'black' : 'blue'} text={showAdd ? 'Close' : 'Add Task'} onClick={toggleAddTask} />
        </header>
    );
};

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}
 
export default Header;
