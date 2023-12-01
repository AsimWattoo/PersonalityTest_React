import React from 'react';

function Header() {
    return (
      <header style={styles.header}>
        <h1 style={styles.title}>Personality Test</h1>
        <input
          type="text"
          placeholder="Search"
          style={styles.searchInput}
        />
      </header>
    );
  }

const styles ={
    header: {
        width: "100%",
        height: "78px",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        padding: "20px 100px",
        borderBottom: "1px solid #dcdcdc",
        marginBottom: "20px",
        backgroundColor: "#fff",
    
      },
      title: {
        fontSize: "24px", // Assuming the title font size
        color: "#333",
      },
      searchInput: {
        padding: '0.5rem',
        width:'60%',
        fontSize: '1rem',
        borderRadius: '10px',
        border: '1px solid #ccc',
        marginLeft:'200px',
        color:'#000',
      },
}


  export default Header;