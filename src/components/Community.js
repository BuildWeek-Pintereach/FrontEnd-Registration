import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 14.5vw;
  background: rgba(83, 104, 126, 1);
  @media (max-width: 820px) {
    padding-top: 19vw;
  }
  @media (max-width: 500px) {
    padding-top: 30vw;
  }
  h1 {
    color: rgba(245, 221, 221, 1);
    font-size: 3.5vw;
  }
`;

const Search = styled.div`
  width: 100%;
  input {
    width: 70%;
    border-radius: 5px;
    text-align: center;
    font-size: 2vw;
    @media (max-width: 500px) {
      width: 40%;
    }
    @media (max-width: 820px) {
      width: 40%;
    }
  }
`;

const Articles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 90%;
`;

const ArticleCat = styled.h2`
  background: rgba(58, 68, 84, 0.9);
  border-radius: 10px;
  font-size: 3vw;
  padding: 2%;
  color: rgba(245, 221, 221, 1);
  width: 90%;
  max-width: 90%;
`;

const FriendsandArticles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center
  max-width: 100%;
  margin-bottom: 40px;
`;

const LinkDiv = styled.div`
  width: 80%;
  max-width: 80%;
  padding: 2%;
  background-color: rgba(58, 68, 84, 0.9);
  border-radius: 7px;
  margin-bottom: 2%;
  color: rgba(194, 178, 180, 0.7);
  a {
    text-align: center;
    color: rgba(194, 178, 180, 0.7);
    &:hover {
      color: rgba(245, 221, 221, 1);
    }
    text-decoration: none;
    word-wrap: break-word;
    width: 100%;
    font-size: 1.8vw;
    @media (max-width: 500px) {
      font-size: 3vw;
    }
  }
`;

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
    max-height: 15vh;
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
    }
  }
  div {
    width: 49%;
    text-align: center;
    h1 {
      color: rgba(245, 221, 221, 1);
      font-size: 4.3vw;
      margin: 2% 0 0 0;
      @media (max-width: 500px) {
        font-size: 9.5vw;
      }
    }
    h2 {
      color: rgba(245, 221, 221, 1);
      font-size: 2.5vw;
      padding-bottom: 10px;
      @media (max-width: 500px) {
        font-size: 3.2vw;
        padding: 0;
      }
    }
  }
  nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 49%;
    @media (max-width: 500px) {
      width: 80%;
    }
    a {
      width: 20%;
      padding: 2%;
      text-decoration: none;
      font-size: 1.8vw;
      text-align: center;
      border-bottom: 3px solid rgba(107, 78, 113, 1);
      border-radius: 15%;
      color: rgba(194, 178, 180, 0.7);
      &:hover {
        color: rgba(245, 221, 221, 1);
      }
      @media (max-width: 500px) {
        font-size: 3.1vw;
        margin-bottom: 4%;
      }
      @media (max-width: 820px) {
        font-size: 2.4vw;
      }
    }
  }
`;

const Community = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /////////////////Grab Users

  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [articles, searchTerm]);

  useEffect(() => {
    axios
      .get(`https://bw-backend.herokuapp.com/articles/`)
      .then(response => {
        console.log("This is users", response);
        setArticles(response.data);
        setSearchResults(response.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  ////////////////////Search Form

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <Body>
      <header>
        <StyledMyBoard>
          <div className="outer">
            {/* <Logo>Pintreach</Logo> */}
            <div>
              <h1>Pintereach</h1>
              <h2>Your References Consolidated</h2>
            </div>
            <nav>
            <a href='https://marketing-for-pintereach.tlbdev.now.sh/' target="_blank" rel="noopener noreferrer" alt='Click to visit the homepage.'>Home</a>
              <Link to="/add-article">Add Article</Link>
              <Link to="/myboard">My Board</Link>
              <Link to="/login">Log Out</Link>
            </nav>
          </div>
        </StyledMyBoard>
      </header>
      <div className="body">
        <h1>See What Others Are Looking Into!</h1>
        <FriendsandArticles>
          <Articles>
            <Search>
              <input
                type="text"
                placeholder="Search titles..."
                value={searchTerm}
                onChange={handleChange}
              />
            </Search>
            <ArticleCat>Community Articles</ArticleCat>
            {searchResults.map(item => {
              return (
                <LinkDiv key={item.id}>
                  <h3>{item.title}</h3>
                  <a href={item.link}>{item.link}</a>
                </LinkDiv>
              );
            })}
           
          </Articles>
        </FriendsandArticles>
      </div>
    </Body>
  );
};

export default Community;