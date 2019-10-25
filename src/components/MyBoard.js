import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import DeleteArticle from "./DeleteArticle";
const StyledMyBoard = styled.div`
.outer{
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 2%;
    background-color: rgba(58, 68, 84, .9);

    border-bottom-left-radius:15%;
    border-bottom-right-radius:15%;
    border-bottom: 3px solid rgba(107, 78, 113, 1);
    top: 0%;
    max-height: 19vh;
    @media(max-width: 500px){font-size: 0.5rem; display:flex; flex-direction: column;}
    @media(max-width: 820px){font-size: 1rem;}
    };
    
    
    div{
        width:49%;
        text-align: center;
       
        h1{
            color:rgba(245, 221, 221, 1);
            font-size: 3rem;
            margin-bottom:5px;
            @media(max-width: 500px){font-size: 0.5rem; display: flex; flex-direction:column;}
            @media(max-width: 820px){font-size: 1rem;}
        }
        h2{
            color:rgba(245, 221, 221, 1);
            margin-bottom:60px;
            line-height:1;
            font-size: 1.6rem;
            @media(max-width: 500px){font-size: 0.5rem; display: flex; flex-direction: column;}
            @media(max-width:820px){font-size: 1rem;}
        } 
    }
    
    nav{
        display: flex;
        justify-content: space-around;
        align-items: center;        
        width:49%; 
    
       a{
            width:20%;
            padding: 2%;
            text-decoration: none;
            color: rgba(194, 178, 180, .7);
            font-size: 1.8vw;
            text-align: center;
            border-bottom: 3px solid rgba(107, 78, 113, 1);
            border-radius: 15%;
            &:hover{
                color: rgba(245, 221, 221, 1);
            }
            @media(max-width: 500px){font-size: 0.5rem; display:flex; flex-direction:column;}
            @media(max-width:825px){font-size: 1rem;}
        } 
    } 
}`;
const StyledMain = styled.div`
  main {
    margin-top: 26vh;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    div {
      padding: 2%;
      width: 28%;
      background-color: rgba(58, 68, 84, 1);
      margin: 10px;
      h1 {
        color: rgba(245, 221, 221, 1);
        font-size: 1rem;
      }
      @media (max-width: 500px) {
        font-size: 0.5rem;
        display: flex;
        flex-direction: column;
      }
      @media (max-width: 820px) {
        font-size: 1rem;
      }

      p {
        color: rgba(245, 221, 221, 1);
      }
      @media (max-width: 500px) {
        font-size: 0.5rem;
        display: flex;
        flex-direction: column;
      }
      @media (max-width: 820px) {
        font-size: 1rem;
      }
    }
  }`;

const MyBoard = props => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/articles")
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }, []);

  return (
    <div className="my-board">
      <header>
        <StyledMyBoard>
          <div className="outer">
            {/* <Logo>Pintreach</Logo> */}
            <div>
              <h1>Pintereach</h1>
              <h2>Your References Consolidated</h2>
            </div>
            <nav>
              <a
                href="https://marketing-for-pintereach.tlbdev.now.sh/"
                target="_blank" rel="noopener noreferrer"
                alt="Click to visit the homepage."
              >
                Home
              </a>
              <Link to="/add-article">Add Article</Link>
              <Link to="/community">Community</Link>
              <Link to="/login">Log Out</Link>
            </nav>
          </div>
        </StyledMyBoard>
      </header>

      <StyledMain>
        <main>
          {article &&
            article.map(article => {
              return (
                <div key={article.id} article={article}>
                  <h1>Title:{article.title}</h1>
                  <p className="article-link">
                    Link: <strong>{article.link}</strong>
                  </p>
                  <DeleteArticle article={article} />
                </div>
              );
            })}
        </main>
      </StyledMain>
    </div>
  );
};

export default MyBoard;
