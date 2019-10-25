import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from 'styled-components';

const StyledMyBoard = styled.div`
  .outer {
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 2%;
    background-color: rgba(58, 68, 84, 0.9);
    border-bottom-left-radius: 15%;
    border-bottom-right-radius: 15%;
    border-bottom: 3px solid rgba(107, 78, 113, 1);
    top: 0%;
    max-height: 19vh;
  }

  div {
    width: 49%;
    text-align: center;
    h1 {
      color: rgba(245, 221, 221, 1);
      font-size: 3rem;
    }
    h2 {
      color: rgba(245, 221, 221, 1);
      font-size: 2rem;
    }
  }

  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 49%;

    a {
      width: 20%;
      padding: 2%;
      text-decoration: none;
      color: rgba(194, 178, 180, 0.7);
      font-size: 1.8vw;
      text-align: center;
      border-bottom: 3px solid rgba(107, 78, 113, 1);
      border-radius: 15%;
      &:hover {
        color: rgba(245, 221, 221, 1);
      }
    }
  }
`;
const StyledMain = styled.div`
  main {
    margin-top: 26vh;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    color: white;
    div {
      padding: 2%;
      width: 28%;
      background-color: rgba(58, 68, 84, 1);
      h1 {
        color: rgba(245, 221, 221, 1);
      }
      p {
        color: rgba(245, 221, 221, 1);
      }
    }

    button{
      margin-top:10px;
      padding:5px;
      border-radius:10px;
      color: darksteelgray;
    }

    #label{
      padding:10px;
    }

    #title, #link{
      margin-bottom:10px;
    }
  }
`;

const AddArticle = props => {
  const [article, setArticle] = useState({
    title: "",
    link: ""
  });

  const handleChange = event => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value
    });
  };

  const submitForm = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/users/articles", article)

      .then(res => {
        console.log("is posting");
        setArticle({
          ...article,
          title: "",
          link: ""
        });
        props.history.push("/myboard");
      })
      .catch(err => console.log("it did not work", err.response));
  };

  return (
    <div>
    <header>
        <StyledMyBoard>
          <div className="outer">
            <div>
              <h1>Pintereach</h1>
              <h2>Your References Consolidated</h2>
            </div>
            <nav>
            <a href='https://marketing-for-pintereach.tlbdev.now.sh/' target="_blank" rel="noopener noreferrer" alt='Click to visit the homepage.'>Home</a>
              <Link to='/myboard'>My Board</Link>
              <Link to="/community">Community</Link>
              <Link to="/login">Log Out</Link>
            </nav>
          </div>
        </StyledMyBoard>
      </header>
      <StyledMain>
      <main>
        <div>
          <form onSubmit={submitForm}>
            <label id='label' htmlFor="title">Title:</label>
            <input id='title'
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={article.title}
            /><br />

            <label id='label' htmlFor="link">Link:</label>
            <input id='link'
              type="text"
              placeholder="www.link.com"
              name="link"
              onChange={handleChange}
              value={article.link}
            /><br />
            <button type="submit" className="add-button">
              Add Article
            </button>
          </form>
        </div>
      </main>
      </StyledMain>
      </div>
  );
};
export default AddArticle;
